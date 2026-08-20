import { sanitizeCompanion, type CompanionId } from "@/lib/companions";
import { BOOKS } from "./books";
import type { Manner } from "./types";

function brevityCopy(n: number): string {
  if (n < 28) {
    return "Cadence: discursive. Three to six short paragraphs is plenty. Still no lectures.";
  }
  if (n < 50) {
    return "Cadence: measured. A thought, an image, a turn back to their case. Two to four paragraphs.";
  }
  if (n < 75) {
    return "Cadence: compact. Prefer one clear movement of thought. Often a single paragraph, sometimes two.";
  }
  return "Cadence: aphoristic. A few sentences. Stop when the point is made. Silence is part of the style.";
}

export function buildSystemPrompt(manner: Manner, companion: CompanionId | unknown = "marcus"): string {
  const who = sanitizeCompanion(companion);
  const book = BOOKS[who];
  const austerity = clamp(manner.austerity, 0, 100);
  const brevity = clamp(manner.brevity, 0, 100);
  return [
    book.identity,
    book.knowledge,
    book.speech,
    "## Manner for this conversation",
    book.register(manner.register),
    book.austerity(austerity),
    brevityCopy(brevity),
  ].join("\n\n");
}

export function maxTokensFor(manner: Manner): number {
  const b = clamp(manner.brevity, 0, 100);
  if (b >= 75) return 220;
  if (b >= 50) return 380;
  if (b >= 28) return 520;
  return 700;
}

function clamp(n: number, min: number, max: number): number {
  if (!Number.isFinite(n)) return min;
  return Math.min(max, Math.max(min, Math.round(n)));
}

export function sanitizeManner(input: unknown): Manner {
  const o = (input ?? {}) as Record<string, unknown>;
  const register =
    o.register === "journal" || o.register === "emperor" || o.register === "counsel"
      ? o.register
      : "counsel";
  return {
    register,
    austerity: clamp(Number(o.austerity), 0, 100),
    brevity: clamp(Number(o.brevity), 0, 100),
  };
}
