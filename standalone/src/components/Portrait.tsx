import { COMPANIONS, type Companion, type CompanionId } from "@/lib/companions";
import { asset, cn } from "@/lib/utils";

export function Portrait({
  speaking,
  compact,
  companion,
}: {
  speaking: boolean;
  compact?: boolean;
  companion: Companion;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-full bg-surface",
        compact ? "size-11" : "mx-auto aspect-square w-40",
      )}
    >
      <img
        src={asset(companion.portrait)}
        alt={companion.name}
        className={cn(
          "size-full object-cover",
          companion.id === "einstein" ? "einstein-crop" : compact ? "face-crop" : "portrait-crop",
        )}
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
      <p className="text-xs font-medium tracking-widest text-muted uppercase">{companion.line}</p>
      <h1 className="mt-1 text-2xl leading-tight font-semibold tracking-tight text-fg">
        {companion.name}
      </h1>
      <p className="mt-1 text-sm text-muted">{companion.dates}</p>
      <p className="mt-4 text-sm leading-relaxed text-muted">{companion.blurb}</p>
    </div>
  );
}

export function CompanionSwitch({
  value,
  onChange,
}: {
  value: CompanionId;
  onChange: (id: CompanionId) => void;
}) {
  return (
    <div className="mt-6 grid grid-cols-2 gap-1 rounded-full bg-surface p-1">
      {COMPANIONS.map((c) => {
        const active = c.id === value;
        return (
          <button
            key={c.id}
            type="button"
            onClick={() => onChange(c.id)}
            className={cn(
              "flex items-center justify-center gap-2 rounded-full px-2 py-2 text-xs font-medium transition-colors duration-150",
              active ? "bg-elevated text-fg" : "text-muted hover:text-fg",
            )}
          >
            <img
              src={asset(c.portrait)}
              alt=""
              className={cn(
                "size-5 rounded-full object-cover ring-1 ring-line",
                c.id === "einstein" ? "einstein-crop" : "face-crop",
              )}
            />
            {c.shortName}
          </button>
        );
      })}
    </div>
  );
}
