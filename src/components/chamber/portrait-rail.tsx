import { COMPANIONS, type Companion, type CompanionId } from "@/lib/companions";
import { cn } from "@/lib/utils";

type PortraitProps = {
  speaking: boolean;
  compact?: boolean;
  companion: Companion;
};

export function Portrait({ speaking, compact, companion }: PortraitProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-full bg-surface",
        compact ? "size-11" : "mx-auto aspect-square w-40",
      )}
    >
      <img
        src={companion.portrait}
        alt={companion.name}
        className={cn("size-full object-cover", companion.crop)}
      />
      {speaking ? (
        <div className="speak-ring pointer-events-none absolute inset-0 rounded-full" />
      ) : null}
    </div>
  );
}

export function IdentityBlock({ companion }: { companion: Companion }) {
  return (
    <div className="mt-5 text-center">
      <p className="text-[10px] font-medium tracking-[0.22em] text-muted uppercase">{companion.role}</p>
      <h1 className="mt-1 text-2xl leading-tight font-semibold tracking-tight text-fg">
        {companion.name}
      </h1>
      <p className="mt-1 text-sm text-muted">{companion.tagline}</p>
      <p className="mt-4 text-sm leading-relaxed text-muted">{companion.blurb}</p>
    </div>
  );
}

export function MindGrid({
  value,
  onChange,
}: {
  value: CompanionId;
  onChange: (id: CompanionId) => void;
}) {
  return (
    <div className="mt-6 grid grid-cols-4 gap-2">
      {COMPANIONS.map((c) => {
        const active = c.id === value;
        return (
          <button
            key={c.id}
            type="button"
            title={`${c.name} — ${c.tagline}`}
            onClick={() => onChange(c.id)}
            className={cn(
              "rounded-full ring-offset-2 ring-offset-bg transition-opacity duration-150",
              active ? "ring-2 ring-fg" : "opacity-55 hover:opacity-100",
            )}
          >
            <img
              src={c.portrait}
              alt={c.shortName}
              className={cn("aspect-square w-full rounded-full object-cover", c.crop)}
            />
          </button>
        );
      })}
    </div>
  );
}
