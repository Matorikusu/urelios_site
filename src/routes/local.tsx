import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/shell";

export const Route = createFileRoute("/local")({
  component: LocalGuide,
  head: () => ({
    meta: [{ title: "A program, later — Urelios" }],
  }),
});

function LocalGuide() {
  return (
    <SiteShell>
      <main className="mx-auto max-w-xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="text-[11px] font-medium tracking-[0.22em] text-muted uppercase">Later</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">A program you can keep</h1>
        <p className="mt-4 text-base leading-relaxed text-muted">
          Urelios lives at the table in the browser first. A standalone program — something you
          can run on your own machine, without an account — will come. Not yet.
        </p>
        <p className="mt-4 text-base leading-relaxed text-muted">
          Until then, sit with the eight minds here. Sign in if you want the papers kept.
        </p>
        <Link
          to="/app"
          className="mt-10 inline-flex h-12 items-center rounded-full bg-accent px-5 text-sm font-medium text-bg"
        >
          Enter the table
        </Link>
      </main>
    </SiteShell>
  );
}
