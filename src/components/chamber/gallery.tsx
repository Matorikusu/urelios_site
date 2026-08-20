import { AuthChip } from "@/components/chamber/auth-chip";
import { COMPANIONS, type CompanionId } from "@/lib/companions";
import { cn } from "@/lib/utils";

type Props = {
  onChoose: (id: CompanionId) => void;
};

export function Gallery({ onChoose }: Props) {
  return (
    <div className="relative min-h-dvh bg-bg text-fg">
      <div className="absolute top-4 right-4 z-10 sm:top-6 sm:right-6">
        <AuthChip />
      </div>
      <div className="mx-auto max-w-5xl px-5 pt-12 pb-20 sm:px-8 sm:pt-16">
        <header className="mx-auto max-w-xl text-center">
          <p className="text-[11px] font-medium tracking-[0.28em] text-muted uppercase">Urelios</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Choose a mind</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
            Eight ways of thinking. One table. Not chatbots — lenses.
          </p>
        </header>

        <ul className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {COMPANIONS.map((c, i) => (
            <li key={c.id} className="enter" style={{ animationDelay: `${i * 40}ms` }}>
              <button
                type="button"
                onClick={() => onChoose(c.id)}
                className={cn(
                  "group flex h-full w-full flex-col items-center rounded-3xl bg-surface px-5 py-7 text-center",
                  "ring-1 ring-transparent transition-colors duration-200",
                  "hover:bg-elevated hover:ring-line",
                  c.id === "marcus" && "sm:col-span-2 lg:col-span-1",
                )}
              >
                <span className="relative">
                  <img
                    src={c.portrait}
                    alt=""
                    className={cn("size-24 rounded-full object-cover ring-1 ring-line sm:size-28", c.crop)}
                  />
                </span>
                <p className="mt-5 text-[10px] font-medium tracking-[0.22em] text-muted uppercase">
                  {c.role}
                </p>
                <p className="mt-1 text-base font-semibold tracking-tight text-fg">{c.name}</p>
                <p className="mt-2 text-sm text-fg/80">{c.tagline}</p>
                <p className="mt-3 text-xs leading-relaxed text-muted">{c.blurb}</p>
              </button>
            </li>
          ))}
        </ul>

        <p className="mt-14 text-center text-xs leading-relaxed text-muted/70">
          Created by S Whorton — Matorikusu 2026 — All rights reserved.
        </p>
      </div>
    </div>
  );
}
