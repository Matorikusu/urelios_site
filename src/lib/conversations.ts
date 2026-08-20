import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { sanitizeCompanion, type CompanionId } from "@/lib/companions";
import { getSql } from "@/lib/db";
import { DEFAULT_MANNER, type ChatMessage, type Manner, type Register } from "@/lib/marcus/types";
import { sanitizeVoice } from "@/lib/marcus/voices";
import { sanitizeManner } from "@/lib/marcus/prompt";

export type ConversationSummary = {
  id: string;
  title: string;
  companionId: CompanionId;
  updatedAt: string;
};

export type Prefs = {
  companionId: CompanionId;
  voiceId: string;
  manner: Manner;
  autoSpeak: boolean;
};

type ConversationRow = {
  id: string;
  title: string;
  updated_at: string;
  manner_json: string;
  voice_id: string;
  companion_id: string;
};

type MessageRow = {
  id: string;
  role: string;
  content: string;
};

function titleFrom(text: string): string {
  const t = text.replace(/\s+/g, " ").trim();
  if (!t) return "Untitled counsel";
  return t.length > 48 ? `${t.slice(0, 45)}…` : t;
}

export const listConversations = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const rows = await sql<ConversationRow>`
      select id, title, updated_at, manner_json, voice_id, companion_id
      from conversations
      where user_id = ${context.userId}
      order by updated_at desc
      limit 40
    `;
    return rows.map(
      (r): ConversationSummary => ({
        id: r.id,
        title: r.title,
        companionId: sanitizeCompanion(r.companion_id),
        updatedAt: r.updated_at,
      }),
    );
  });

export const loadConversation = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((id: string) => id)
  .handler(async ({ context, data: id }) => {
    const sql = await getSql();
    const conv = await sql<ConversationRow>`
      select id, title, updated_at, manner_json, voice_id, companion_id
      from conversations
      where id = ${id} and user_id = ${context.userId}
      limit 1
    `;
    const row = conv[0];
    if (!row) return null;
    const msgs = await sql<MessageRow>`
      select id, role, content from messages
      where conversation_id = ${id} and user_id = ${context.userId}
      order by created_at asc
    `;
    let manner: Manner = DEFAULT_MANNER;
    try {
      manner = sanitizeManner(JSON.parse(row.manner_json) as unknown);
    } catch {
      manner = DEFAULT_MANNER;
    }
    return {
      id: row.id,
      title: row.title,
      voiceId: sanitizeVoice(row.voice_id),
      companionId: sanitizeCompanion(row.companion_id),
      manner,
      messages: msgs
        .filter((m) => m.role === "user" || m.role === "assistant")
        .map(
          (m): ChatMessage => ({
            id: m.id,
            role: m.role as ChatMessage["role"],
            content: m.content,
          }),
        ),
    };
  });

export const saveTurn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    (input: {
      conversationId: string;
      titleSource: string;
      companionId: CompanionId;
      manner: Manner;
      voiceId: string;
      userMessage: ChatMessage;
      assistantMessage: ChatMessage;
    }) => input,
  )
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const mannerJson = JSON.stringify(sanitizeManner(data.manner));
    const voiceId = sanitizeVoice(data.voiceId);
    const companionId = sanitizeCompanion(data.companionId);
    const title = titleFrom(data.titleSource);
    const existing = await sql<{ id: string }>`
      select id from conversations where id = ${data.conversationId} and user_id = ${context.userId} limit 1
    `;
    if (existing[0]) {
      await sql`
        update conversations
        set updated_at = now(), manner_json = ${mannerJson}, voice_id = ${voiceId}, companion_id = ${companionId}
        where id = ${data.conversationId} and user_id = ${context.userId}
      `;
    } else {
      await sql`
        insert into conversations (id, user_id, title, manner_json, voice_id, companion_id)
        values (${data.conversationId}, ${context.userId}, ${title}, ${mannerJson}, ${voiceId}, ${companionId})
      `;
    }
    await sql`
      insert into messages (id, conversation_id, user_id, role, content)
      values (${data.userMessage.id}, ${data.conversationId}, ${context.userId}, ${data.userMessage.role}, ${data.userMessage.content})
    `;
    await sql`
      insert into messages (id, conversation_id, user_id, role, content)
      values (${data.assistantMessage.id}, ${data.conversationId}, ${context.userId}, ${data.assistantMessage.role}, ${data.assistantMessage.content})
    `;
  });

export const deleteConversation = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((id: string) => id)
  .handler(async ({ context, data: id }) => {
    const sql = await getSql();
    await sql`delete from messages where conversation_id = ${id} and user_id = ${context.userId}`;
    await sql`delete from conversations where id = ${id} and user_id = ${context.userId}`;
  });

export const loadPrefs = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const rows = await sql<{
      voice_id: string;
      register: string;
      austerity: number;
      brevity: number;
      auto_speak: boolean;
      companion_id: string;
    }>`
      select voice_id, register, austerity, brevity, auto_speak, companion_id
      from marcus_prefs where user_id = ${context.userId} limit 1
    `;
    const r = rows[0];
    if (!r) return null;
    const register: Register =
      r.register === "journal" || r.register === "emperor" ? r.register : "counsel";
    return {
      companionId: sanitizeCompanion(r.companion_id),
      voiceId: sanitizeVoice(r.voice_id),
      autoSpeak: Boolean(r.auto_speak),
      manner: sanitizeManner({
        register,
        austerity: r.austerity,
        brevity: r.brevity,
      }),
    } satisfies Prefs;
  });

export const savePrefs = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: Prefs) => input)
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const manner = sanitizeManner(data.manner);
    const voiceId = sanitizeVoice(data.voiceId);
    const companionId = sanitizeCompanion(data.companionId);
    await sql`
      insert into marcus_prefs (user_id, voice_id, register, austerity, brevity, auto_speak, companion_id)
      values (${context.userId}, ${voiceId}, ${manner.register}, ${manner.austerity}, ${manner.brevity}, ${data.autoSpeak}, ${companionId})
      on conflict (user_id) do update set
        voice_id = excluded.voice_id,
        register = excluded.register,
        austerity = excluded.austerity,
        brevity = excluded.brevity,
        auto_speak = excluded.auto_speak,
        companion_id = excluded.companion_id
    `;
  });
