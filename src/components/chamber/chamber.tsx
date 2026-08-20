import { Drawer } from "vaul";
import { History, SlidersHorizontal, Trash2, Plus } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { AuthChip } from "@/components/chamber/auth-chip";
import { Composer } from "@/components/chamber/composer";
import { Gallery } from "@/components/chamber/gallery";
import { IdentityBlock, MindGrid, Portrait } from "@/components/chamber/portrait-rail";
import { Thread } from "@/components/chamber/thread";
import { VoiceManner } from "@/components/chamber/voice-manner";
import { Button } from "@/components/ui/button";
import { playBlob, speakBrowser, stopAudio } from "@/lib/audio";
import { useCurrentUser } from "@/lib/auth/use-current-user";
import {
  deleteConversation,
  listConversations,
  loadConversation,
  loadPrefs,
  savePrefs,
  saveTurn,
  type ConversationSummary,
} from "@/lib/conversations";
import { getCompanion, type CompanionId } from "@/lib/companions";
import { speakText, streamCounsel, transcribeAudio } from "@/lib/marcus/client";
import type { ChatMessage } from "@/lib/marcus/types";
import { usePrefs } from "@/lib/prefs-store";
import { uid } from "@/lib/utils";

export function Chamber() {
  const user = useCurrentUser();
  const manner = usePrefs((s) => s.manner);
  const voiceId = usePrefs((s) => s.voiceId);
  const autoSpeak = usePrefs((s) => s.autoSpeak);
  const companionId = usePrefs((s) => s.companionId);
  const setCompanion = usePrefs((s) => s.setCompanion);
  const hydrate = usePrefs((s) => s.hydrate);
  const companion = getCompanion(companionId);

  const [conversationId, setConversationId] = useState(() => uid());
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [previewingId, setPreviewingId] = useState<string | null>(null);
  const [recording, setRecording] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [history, setHistory] = useState<ConversationSummary[]>([]);
  const [stage, setStage] = useState<"gallery" | "talk">("gallery");

  const abortRef = useRef<AbortController | null>(null);
  const recRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const prefsLoaded = useRef(false);

  const scrollToEnd = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, []);

  useEffect(() => {
    scrollToEnd();
  }, [messages, streaming, scrollToEnd]);

  useEffect(() => {
    if (!user || prefsLoaded.current) return;
    prefsLoaded.current = true;
    void loadPrefs()
      .then((p) => {
        if (p) hydrate(p);
      })
      .catch(() => {
        /* guest or unauthorized */
      });
    void listConversations()
      .then(setHistory)
      .catch(() => setHistory([]));
  }, [user, hydrate]);

  useEffect(() => {
    if (!user) return;
    const t = window.setTimeout(() => {
      void savePrefs({ data: { companionId, voiceId, manner, autoSpeak } }).catch(() => {});
    }, 900);
    return () => window.clearTimeout(t);
  }, [user, companionId, voiceId, manner, autoSpeak]);

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
      stopAudio();
      recRef.current?.stop();
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const speak = useCallback(
    async (id: string, text: string, voice = voiceId) => {
      if (!text.trim()) return;
      stopAudio();
      setSpeakingId(id);
      try {
        try {
          const blob = await speakText(text, voice);
          await playBlob(blob);
        } catch {
          await speakBrowser(text, voice);
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : "The voice faltered.";
        if (!/abort/i.test(msg)) toast.error(msg);
      } finally {
        setSpeakingId((cur) => (cur === id ? null : cur));
      }
    },
    [voiceId],
  );

  const stopSpeak = useCallback(() => {
    stopAudio();
    setSpeakingId(null);
    setPreviewingId(null);
  }, []);

  const previewVoice = useCallback(async (id: string) => {
    const sample = companion.voiceSample;
    stopAudio();
    setPreviewingId(id);
    setSpeakingId("preview");
    try {
      try {
        const blob = await speakText(sample, id);
        await playBlob(blob);
      } catch {
        await speakBrowser(sample, id);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "The voice faltered.");
    } finally {
      setPreviewingId(null);
      setSpeakingId((cur) => (cur === "preview" ? null : cur));
    }
  }, [companion.voiceSample]);

  const send = useCallback(
    async (text: string) => {
      const content = text.replace(/\s+/g, " ").trim();
      if (!content || streaming) return;
      stopSpeak();
      setDraft("");
      const userMsg: ChatMessage = { id: uid(), role: "user", content };
      const assistantMsg: ChatMessage = { id: uid(), role: "assistant", content: "" };
      const prior = messages;
      setMessages([...prior, userMsg, assistantMsg]);
      setStreaming(true);
      const ac = new AbortController();
      abortRef.current = ac;
      try {
        const full = await streamCounsel({
          messages: [...prior, userMsg],
          manner,
          companion: companionId,
          signal: ac.signal,
          onDelta: (delta) => {
            setMessages((cur) =>
              cur.map((m) => (m.id === assistantMsg.id ? { ...m, content: m.content + delta } : m)),
            );
          },
        });
        const finalText = full.trim();
        setMessages((cur) =>
          cur.map((m) => (m.id === assistantMsg.id ? { ...m, content: finalText || m.content } : m)),
        );
        if (user) {
          void saveTurn({
            data: {
              conversationId,
              titleSource: userMsg.content,
              companionId,
              manner,
              voiceId,
              userMessage: userMsg,
              assistantMessage: { ...assistantMsg, content: finalText },
            },
          })
            .then(() => listConversations().then(setHistory).catch(() => {}))
            .catch(() => {});
        }
        if (autoSpeak && finalText) {
          void speak(assistantMsg.id, finalText);
        }
      } catch (err) {
        if ((err as { name?: string }).name === "AbortError") return;
        const msg = err instanceof Error ? err.message : "He could not be reached.";
        toast.error(msg);
        setMessages((cur) =>
          cur.map((m) =>
            m.id === assistantMsg.id && !m.content
              ? { ...m, content: `I am silent a moment. ${msg}` }
              : m,
          ),
        );
      } finally {
        setStreaming(false);
        abortRef.current = null;
      }
    },
    [streaming, messages, manner, companionId, user, conversationId, voiceId, autoSpeak, speak, stopSpeak],
  );

  function newConversation() {
    abortRef.current?.abort();
    stopSpeak();
    setConversationId(uid());
    setMessages([]);
    setDraft("");
    setStreaming(false);
    setHistoryOpen(false);
  }

  function selectCompanion(id: CompanionId) {
    abortRef.current?.abort();
    stopSpeak();
    setCompanion(id);
    setConversationId(uid());
    setMessages([]);
    setDraft("");
    setStreaming(false);
    setSettingsOpen(false);
    setStage("talk");
  }

  async function openConversation(id: string) {
    try {
      const loaded = await loadConversation({ data: id });
      if (!loaded) return;
      abortRef.current?.abort();
      stopSpeak();
      setConversationId(loaded.id);
      setMessages(loaded.messages);
      hydrate({
        companionId: loaded.companionId,
        voiceId: loaded.voiceId,
        manner: loaded.manner,
        autoSpeak,
      });
      setHistoryOpen(false);
      setStage("talk");
    } catch {
      toast.error("That conversation could not be opened.");
    }
  }

  async function removeConversation(id: string) {
    try {
      await deleteConversation({ data: id });
      setHistory((h) => h.filter((c) => c.id !== id));
      if (id === conversationId) newConversation();
    } catch {
      toast.error("Could not put that paper away.");
    }
  }

  async function toggleMic() {
    if (recording) {
      recRef.current?.stop();
      return;
    }
    if (!navigator.mediaDevices?.getUserMedia) {
      toast.error("This device cannot hear you here.");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const rec = new MediaRecorder(stream);
      chunksRef.current = [];
      rec.ondataavailable = (e) => {
        if (e.data.size) chunksRef.current.push(e.data);
      };
      rec.onstop = () => {
        setRecording(false);
        stream.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
        recRef.current = null;
        const blob = new Blob(chunksRef.current, { type: rec.mimeType || "audio/webm" });
        chunksRef.current = [];
        if (blob.size < 400) return;
        void transcribeAudio(blob)
          .then((text) => {
            if (text) setDraft((d) => (d ? `${d} ${text}` : text));
            else toast.message("I heard nothing I could write.");
          })
          .catch((err: unknown) => {
            toast.error(err instanceof Error ? err.message : "I could not hear that.");
          });
      };
      recRef.current = rec;
      rec.start();
      setRecording(true);
    } catch {
      toast.error("The microphone was refused.");
    }
  }

  const speaking = speakingId !== null;

  if (stage === "gallery") {
    return <Gallery onChoose={selectCompanion} />;
  }

  return (
    <div className="relative min-h-dvh bg-bg text-fg">
      <div className="relative mx-auto flex min-h-dvh max-w-6xl">
        <aside className="hidden w-80 shrink-0 flex-col border-r border-line lg:flex">
          <div className="p-8">
            <Portrait speaking={speaking} companion={companion} />
            <IdentityBlock companion={companion} />
            <MindGrid value={companionId} onChange={selectCompanion} />
            <button
              type="button"
              onClick={() => setStage("gallery")}
              className="mt-5 w-full text-center text-[10px] font-medium tracking-[0.22em] text-muted uppercase hover:text-fg"
            >
              All minds
            </button>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-8">
            <VoiceManner onPreviewVoice={(id) => void previewVoice(id)} previewingId={previewingId} />
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center gap-3 px-4 py-3 lg:px-6">
            <div className="lg:hidden">
              <Portrait speaking={speaking} compact companion={companion} />
            </div>
            <button
              type="button"
              className="min-w-0 flex-1 text-left lg:hidden"
              onClick={() => setStage("gallery")}
            >
              <p className="text-[10px] font-medium tracking-[0.22em] text-muted uppercase">
                {companion.role}
              </p>
              <p className="truncate text-sm font-medium text-fg">{companion.name}</p>
            </button>
            <div className="hidden flex-1 lg:block">
              <button
                type="button"
                onClick={() => setStage("gallery")}
                className="text-[11px] font-medium tracking-[0.28em] text-muted uppercase hover:text-fg"
              >
                Urelios
              </button>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label="New conversation"
              onClick={newConversation}
            >
              <Plus className="size-4" />
            </Button>
            {user ? (
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label="Past conversations"
                onClick={() => setHistoryOpen(true)}
              >
                <History className="size-4" />
              </Button>
            ) : null}
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="lg:hidden"
              aria-label="Voice and manner"
              onClick={() => setSettingsOpen(true)}
            >
              <SlidersHorizontal className="size-4" />
            </Button>
            <AuthChip />
          </header>

          <div ref={scrollerRef} className="min-h-0 flex-1 overflow-y-auto px-4 py-4 pb-8 lg:px-10 lg:py-6">
            <div className="mx-auto max-w-2xl">
              <Thread
                companion={companion}
                messages={messages}
                streaming={streaming}
                speakingId={speakingId}
                onSpeak={(id, text) => void speak(id, text)}
                onStopSpeak={stopSpeak}
              />
            </div>
          </div>

          <div className="border-t border-line bg-bg/80 px-4 py-3 backdrop-blur-sm lg:px-10">
            <div className="mx-auto max-w-2xl">
              <Composer
                value={draft}
                onChange={setDraft}
                onSend={() => void send(draft)}
                onMicToggle={() => void toggleMic()}
                recording={recording}
                busy={streaming}
                placeholder={companion.placeholder}
              />
              <p className="mt-2 text-center text-xs text-muted">{companion.footer}</p>
            </div>
          </div>
        </div>
      </div>

      <Drawer.Root open={settingsOpen} onOpenChange={setSettingsOpen}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 z-40 bg-bg/70" />
          <Drawer.Content className="fixed inset-x-0 bottom-0 z-50 flex max-h-[86dvh] flex-col rounded-t-3xl bg-surface">
            <div className="mx-auto mt-3 h-1 w-10 rounded-full bg-elevated" />
            <Drawer.Title className="px-5 pt-4 text-sm font-medium tracking-widest text-muted uppercase">
              Voice & manner
            </Drawer.Title>
            <Drawer.Description className="sr-only">
              Choose a companion, how he speaks, and which voice he uses.
            </Drawer.Description>
            <div className="overflow-y-auto px-5 pt-4 pb-10">
              <MindGrid value={companionId} onChange={selectCompanion} />
              <button
                type="button"
                onClick={() => {
                  setSettingsOpen(false);
                  setStage("gallery");
                }}
                className="mt-5 w-full text-center text-[10px] font-medium tracking-[0.22em] text-muted uppercase hover:text-fg"
              >
                All minds
              </button>
              <div className="mt-8">
                <VoiceManner onPreviewVoice={(id) => void previewVoice(id)} previewingId={previewingId} />
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>

      <Drawer.Root open={historyOpen} onOpenChange={setHistoryOpen}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 z-40 bg-bg/70" />
          <Drawer.Content className="fixed inset-x-0 bottom-0 z-50 flex max-h-[80dvh] flex-col rounded-t-3xl bg-surface lg:inset-y-0 lg:right-0 lg:left-auto lg:h-full lg:w-96 lg:rounded-none lg:rounded-l-3xl">
            <div className="mx-auto mt-3 h-1 w-10 rounded-full bg-elevated lg:hidden" />
            <Drawer.Title className="px-5 pt-4 text-sm font-medium tracking-widest text-muted uppercase">
              Papers
            </Drawer.Title>
            <Drawer.Description className="sr-only">Saved conversations.</Drawer.Description>
            <ul className="overflow-y-auto px-3 py-3">
              {history.length === 0 ? (
                <li className="px-2 py-6 text-center text-sm text-muted">No conversations kept yet.</li>
              ) : (
                history.map((c) => (
                  <li key={c.id} className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => void openConversation(c.id)}
                      className="min-w-0 flex-1 rounded-xl px-3 py-2.5 text-left hover:bg-elevated"
                    >
                      <span className="block text-[10px] font-medium tracking-widest text-muted uppercase">
                        {getCompanion(c.companionId).shortName}
                      </span>
                      <span className="block truncate text-sm text-fg">{c.title}</span>
                    </button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      aria-label="Delete conversation"
                      onClick={() => void removeConversation(c.id)}
                    >
                      <Trash2 className="size-3.5 text-muted" />
                    </Button>
                  </li>
                ))
              )}
            </ul>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
}
