import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/shell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About — Urelios" },
      {
        name: "description",
        content: "Urelios began with Marcus Aurelius. Then Einstein. Then six more ways of thinking. Eight minds. We stop there.",
      },
    ],
  }),
});

function About() {
  return (
    <SiteShell>
      <main className="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="text-[11px] font-medium tracking-[0.22em] text-muted uppercase">About</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">A table, not a catalogue.</h1>
        <div className="mt-8 space-y-5 text-base leading-relaxed text-muted">
          <p>
            Urelios is a place to sit with a mind — limited, particular, and unlike the others at
            the table. It is not a historical encyclopedia with voices attached.
          </p>
          <p>
            The first chair was Marcus Aurelius: the notes, the wars, the ruling faculty. Einstein
            proved the form could hold a different operating system — pictures, doubt, the quantum
            he never made peace with.
          </p>
          <p>
            The other six were chosen by a single test:{" "}
            <span className="text-fg">
              what way of thinking does this person bring that nobody currently at the table
              provides?
            </span>
          </p>
          <p>
            Leonardo looks. Tesla asks what the universe might be made to do. Franklin builds a
            system around a virtue. Turing reduces a problem. Jung listens for the part you will
            not say. Shakespeare finds the persons and what they hide.
          </p>
          <p>
            We did not add Socrates because he is famous, or Jobs because he is commercially
            relevant. They might earn a place later. Launch is eight. The world is Urelios. The
            minds are windows into it.
          </p>
          <p>
            Made by S Whorton — Matorikusu, 2026. All rights reserved.
          </p>
        </div>
        <Button asChild size="lg" className="mt-10">
          <Link to="/app">Enter the table</Link>
        </Button>
      </main>
    </SiteShell>
  );
}
