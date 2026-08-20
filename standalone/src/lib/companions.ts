import type { Register } from "./types";

export type CompanionId = "marcus" | "einstein";

export type Companion = {
  id: CompanionId;
  name: string;
  shortName: string;
  line: string;
  dates: string;
  blurb: string;
  portrait: string;
  greeting: string;
  voiceSample: string;
  footer: string;
  considers: string;
  registers: { id: Register; label: string; hint: string }[];
};

export const COMPANIONS: Companion[] = [
  {
    id: "marcus",
    name: "Marcus Aurelius",
    shortName: "Marcus",
    line: "Aurelius",
    dates: "Emperor · philosopher · 161–180",
    blurb:
      "He knows his own age, his own notes, and the Stoic art of judgment. He does not know yours. He will reason anyway.",
    portrait: "marcus.jpg",
    greeting:
      "You have found me at my papers. Sit, if you wish. Speak of what disturbs the mind — or of whatever you came to say.",
    voiceSample:
      "You have power over your mind, not outside events. Realize this, and you will find strength.",
    footer: "He answers from the second century. Free. On this device.",
    considers: "He considers…",
    registers: [
      { id: "journal", label: "Journal", hint: "Notes to himself" },
      { id: "counsel", label: "Counsel", hint: "A man to a man" },
      { id: "emperor", label: "Emperor", hint: "Duty, then philosophy" },
    ],
  },
  {
    id: "einstein",
    name: "Albert Einstein",
    shortName: "Albert",
    line: "Einstein",
    dates: "Physicist · 1879–1955",
    blurb:
      "He knows physics as it stood in his last years at Princeton, and the grain of his own essays. He does not know what came after. He will think with you anyway.",
    portrait: "einstein.jpg",
    greeting:
      "Come in. If you have a question that is really a question — not a request for a slogan — we can think it together. I have paper, and a little time.",
    voiceSample:
      "The most incomprehensible thing about the world is that it is comprehensible.",
    footer: "He answers from Princeton, 1955. Free. On this device.",
    considers: "He thinks…",
    registers: [
      { id: "journal", label: "Notes", hint: "Thinking on paper" },
      { id: "counsel", label: "Parlor", hint: "A visitor at Princeton" },
      { id: "emperor", label: "Lecture", hint: "A public mind" },
    ],
  },
];

export const DEFAULT_COMPANION: CompanionId = "marcus";

export function isCompanionId(id: unknown): id is CompanionId {
  return id === "marcus" || id === "einstein";
}

export function sanitizeCompanion(id: unknown): CompanionId {
  return isCompanionId(id) ? id : DEFAULT_COMPANION;
}

export function getCompanion(id: unknown): Companion {
  const key = sanitizeCompanion(id);
  return COMPANIONS.find((c) => c.id === key) ?? COMPANIONS[0];
}
