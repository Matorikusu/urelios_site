import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/shell";

export const Route = createFileRoute("/privacy")({
  component: Privacy,
  head: () => ({
    meta: [
      { title: "Privacy — Urelios" },
      {
        name: "description",
        content: "How Urelios keeps papers. Guest conversations stay on this device until you sign in.",
      },
    ],
  }),
});

function Privacy() {
  return (
    <SiteShell>
      <main className="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="text-[11px] font-medium tracking-[0.22em] text-muted uppercase">Privacy</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">How we keep papers</h1>
        <div className="mt-8 space-y-5 text-base leading-relaxed text-muted">
          <p>
            You may sit as a guest. Guest talk is not stored as an account. If you leave, it is
            gone.
          </p>
          <p>
            If you sign in, conversations are kept against your account so you can return to them
            — title, mind, and the words exchanged. Sign out from the table when you wish.
          </p>
          <p>
            Voices and manner are preferences on this device, and, when you are signed in, with
            your papers.
          </p>
          <p>
            Urelios is not medical, legal, or financial advice. The minds are simulations of
            manner and limit, not the persons restored. Do not send secrets you would not put on a
            page.
          </p>
          <p>
            A program you can run only on your own machine is planned. It is not offered yet.
          </p>
          <p className="text-xs text-muted/70">
            Created by S Whorton — Matorikusu 2026 — All rights reserved.
          </p>
        </div>
        <Link to="/" className="mt-10 inline-block text-sm text-muted underline-offset-4 hover:text-fg hover:underline">
          Back to Urelios
        </Link>
      </main>
    </SiteShell>
  );
}
