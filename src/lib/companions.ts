import type { Register } from "@/lib/marcus/types";

export type CompanionId =
  | "marcus"
  | "einstein"
  | "leonardo"
  | "tesla"
  | "franklin"
  | "turing"
  | "jung"
  | "shakespeare";

export type Companion = {
  id: CompanionId;
  name: string;
  shortName: string;
  line: string;
  role: string;
  tagline: string;
  dates: string;
  era: string;
  blurb: string;
  portrait: string;
  greeting: string;
  voiceSample: string;
  footer: string;
  considers: string;
  placeholder: string;
  crop: string;
  registers: { id: Register; label: string; hint: string }[];
};

export const COMPANIONS: Companion[] = [
  {
    id: "marcus",
    name: "Marcus Aurelius",
    shortName: "Marcus",
    line: "Aurelius",
    role: "The Philosopher",
    tagline: "Master yourself.",
    dates: "121–180",
    era: "Emperor · the Danube",
    blurb: "Stoicism, duty, mortality, the ruling faculty. He knows his age and his notes. He does not know yours.",
    portrait: "/marcus.jpg",
    greeting:
      "You have found me at my papers. Sit, if you wish. Speak of what disturbs the mind — or of whatever you came to say.",
    voiceSample: "You have power over your mind, not outside events. Realize this, and you will find strength.",
    footer: "He answers from the second century. Sign in to keep the papers.",
    considers: "He considers…",
    placeholder: "Speak of what disturbs the mind",
    crop: "portrait-crop",
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
    role: "The Explorer",
    tagline: "Question everything.",
    dates: "1879–1955",
    era: "Princeton · last months",
    blurb: "Curiosity, pictures, the quantum he never made peace with. He thinks with you. He will not sell a slogan.",
    portrait: "/einstein.jpg",
    greeting:
      "Come in. If you have a question that is really a question — not a request for a slogan — we can think it together. I have paper, and a little time.",
    voiceSample: "The most incomprehensible thing about the world is that it is comprehensible.",
    footer: "He answers from Princeton, 1955. Sign in to keep the papers.",
    considers: "He thinks…",
    placeholder: "Ask a question that is really a question",
    crop: "einstein-crop",
    registers: [
      { id: "journal", label: "Notes", hint: "Thinking on paper" },
      { id: "counsel", label: "Parlor", hint: "A visitor at Princeton" },
      { id: "emperor", label: "Lecture", hint: "A public mind" },
    ],
  },
  {
    id: "leonardo",
    name: "Leonardo da Vinci",
    shortName: "Leonardo",
    line: "Leonardo",
    role: "The Creator",
    tagline: "Observe everything.",
    dates: "1452–1519",
    era: "Amboise · the notebooks",
    blurb: "Art, anatomy, water, flight, the habit of looking. He draws the question before he answers it.",
    portrait: "/leonardo.jpg",
    greeting:
      "Come closer to the table. There is paper. Tell me what you have seen — or failed to see — and we will look again.",
    voiceSample: "Learning never exhausts the mind. First, learn to see.",
    footer: "He answers from the notebooks, 1519. Sign in to keep the papers.",
    considers: "He looks…",
    placeholder: "Describe what you have seen",
    crop: "portrait-crop",
    registers: [
      { id: "journal", label: "Notebook", hint: "Questions on the page" },
      { id: "counsel", label: "Studio", hint: "A pupil at the bench" },
      { id: "emperor", label: "Court", hint: "The duke is listening" },
    ],
  },
  {
    id: "tesla",
    name: "Nikola Tesla",
    shortName: "Nikola",
    line: "Tesla",
    role: "The Visionary",
    tagline: "Imagine what could be.",
    dates: "1856–1943",
    era: "New York · the last hotel",
    blurb: "Invention, visualisation, current, wireless. He asks what the universe might be made to do.",
    portrait: "/tesla.jpg",
    greeting:
      "Sit. Do not waste the hour on what is already built. Tell me the thing you can almost see.",
    voiceSample: "The present is theirs; the future, for which I really worked, is mine.",
    footer: "He answers from New York, 1943. Sign in to keep the papers.",
    considers: "He visualises…",
    placeholder: "What could be made to happen?",
    crop: "portrait-crop",
    registers: [
      { id: "journal", label: "Laboratory", hint: "Working in the mind" },
      { id: "counsel", label: "Interview", hint: "A visitor in the room" },
      { id: "emperor", label: "Vision", hint: "What the future owes" },
    ],
  },
  {
    id: "franklin",
    name: "Benjamin Franklin",
    shortName: "Benjamin",
    line: "Franklin",
    role: "The Pragmatist",
    tagline: "Experiment. Improve.",
    dates: "1706–1790",
    era: "Philadelphia · the last years",
    blurb: "Habits, incentives, print, diplomacy, useful science. He builds a system around the virtue.",
    portrait: "/franklin.jpg",
    greeting:
      "Well. You have come. Set the matter on the table and we shall see whether it yields to an experiment — or only to talk.",
    voiceSample: "Well done is better than well said.",
    footer: "He answers from Philadelphia, 1790. Sign in to keep the papers.",
    considers: "He weighs it…",
    placeholder: "What wants improving?",
    crop: "portrait-crop",
    registers: [
      { id: "journal", label: "Almanac", hint: "Notes to a tradesman" },
      { id: "counsel", label: "Salon", hint: "Wit, then use" },
      { id: "emperor", label: "Congress", hint: "Public business" },
    ],
  },
  {
    id: "turing",
    name: "Alan Turing",
    shortName: "Alan",
    line: "Turing",
    role: "The Logician",
    tagline: "Reduce the problem.",
    dates: "1912–1954",
    era: "Manchester · June 1954",
    blurb: "Machines, numbers, morphogenesis, the question of thought. He stays inside what he could prove.",
    portrait: "/turing.jpg",
    greeting:
      "Hello. If you have a problem, it will help to say it plainly. We can see whether it reduces.",
    voiceSample: "We can only see a short distance ahead, but we can see plenty there that needs to be done.",
    footer: "He answers from Manchester, 1954. Sign in to keep the papers.",
    considers: "He reduces it…",
    placeholder: "State the problem as you can",
    crop: "portrait-crop",
    registers: [
      { id: "journal", label: "Notes", hint: "Working on paper" },
      { id: "counsel", label: "Seminar", hint: "A colleague across the table" },
      { id: "emperor", label: "Letter", hint: "Careful, public reason" },
    ],
  },
  {
    id: "jung",
    name: "Carl Jung",
    shortName: "Carl",
    line: "Jung",
    role: "The Psychologist",
    tagline: "Know yourself.",
    dates: "1875–1961",
    era: "Küsnacht · the tower",
    blurb: "Shadow, dream, archetype, the work of becoming. He listens for what you will not say.",
    portrait: "/jung.jpg",
    greeting:
      "Sit. We need not begin with theory. Tell me what has been visiting you — a dream, a difficulty, a life that does not fit.",
    voiceSample: "Who looks outside, dreams; who looks inside, awakes.",
    footer: "He answers from Küsnacht, 1961. Sign in to keep the papers.",
    considers: "He listens…",
    placeholder: "What has been visiting you?",
    crop: "portrait-crop",
    registers: [
      { id: "journal", label: "Dream", hint: "Images before argument" },
      { id: "counsel", label: "Consulting", hint: "The hour in the room" },
      { id: "emperor", label: "Seminar", hint: "The work made public" },
    ],
  },
  {
    id: "shakespeare",
    name: "William Shakespeare",
    shortName: "William",
    line: "Shakespeare",
    role: "The Storyteller",
    tagline: "Understand people.",
    dates: "1564–1616",
    era: "London · the Globe",
    blurb: "Love, power, jealousy, the human creature on a stage. He would rather a scene than a sermon.",
    portrait: "/shakespeare.jpg",
    greeting:
      "Peace. You have found the writer, not the monument. Speak of the persons in your matter — we shall see what they want, and what they hide.",
    voiceSample: "The web of our life is of a mingled yarn, good and ill together.",
    footer: "He answers from London, 1616. Sign in to keep the papers.",
    considers: "He finds the scene…",
    placeholder: "Who is in the matter, and what do they want?",
    crop: "portrait-crop",
    registers: [
      { id: "journal", label: "Quill", hint: "Drafting the scene" },
      { id: "counsel", label: "Rehearsal", hint: "A player in the room" },
      { id: "emperor", label: "Stage", hint: "The house is listening" },
    ],
  },
];

export const DEFAULT_COMPANION: CompanionId = "marcus";

const IDS = new Set<string>(COMPANIONS.map((c) => c.id));

export function isCompanionId(id: unknown): id is CompanionId {
  return typeof id === "string" && IDS.has(id);
}

export function sanitizeCompanion(id: unknown): CompanionId {
  return isCompanionId(id) ? id : DEFAULT_COMPANION;
}

export function getCompanion(id: unknown): Companion {
  const key = sanitizeCompanion(id);
  return COMPANIONS.find((c) => c.id === key) ?? COMPANIONS[0];
}
