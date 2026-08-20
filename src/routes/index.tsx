import { createFileRoute, Link } from "@tanstack/react-router";
import { COMPANIONS } from "@/lib/companions";
import { SiteShell } from "@/components/site/shell";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Urelios" },
      {
        name: "description",
        content:
          "Urelios is a table of eight minds — Marcus Aurelius, Einstein, Leonardo, Tesla, Franklin, Turing, Jung, Shakespeare. Not chatbots. Lenses.",
      },
    ],
  }),
});

function Home() {
  return (
    <SiteShell>
      <main>
        <section className="mx-auto max-w-3xl px-5 pt-20 pb-16 text-center sm:px-8 sm:pt-28 sm:pb-24">
          <p className="text-[11px] font-medium tracking-[0.32em] text-muted uppercase">Urelios</p>
          <h1 className="mt-5 text-4xl leading-[1.1] font-semibold tracking-tight sm:text-6xl">
            Eight minds.
            <br />
            One table.
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
            You do not pick a chatbot. You sit across from a way of thinking — limited to that
            man's time, his writings, his logic.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg">
              <Link to="/app">Enter the table</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#minds">Meet the eight</a>
            </Button>
          </div>
        </section>

        <section className="border-t border-line">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="text-[11px] font-medium tracking-[0.22em] text-muted uppercase">Origin</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                It began with Marcus.
              </h2>
            </div>
            <div className="space-y-5 text-base leading-relaxed text-muted">
              <p>
                Urelios started as a conversation with Marcus Aurelius — not a costume, not a
                quotation engine. The emperor of the notes. His age. His limits. His manner.
              </p>
              <p>
                Then came Einstein, to prove the idea was not only philosophy. Then we asked who
                else we would want across the table — not the eight most famous names, but eight
                fundamentally different ways of thinking.
              </p>
              <p className="text-fg">That is the whole of it. We stop at eight.</p>
            </div>
          </div>
        </section>

        <section id="minds" className="scroll-mt-20 border-t border-line">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
            <p className="text-[11px] font-medium tracking-[0.22em] text-muted uppercase">
              The founding eight
            </p>
            <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
              Each one a lens. None of them Wikipedia.
            </h2>
            <ul className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {COMPANIONS.map((c) => (
                <li key={c.id}>
                  <Link
                    to="/app"
                    search={{ mind: c.id }}
                    className={cn(
                      "group flex h-full flex-col items-center rounded-3xl bg-surface px-5 py-7 text-center",
                      "ring-1 ring-transparent transition-colors duration-200 hover:bg-elevated hover:ring-line",
                    )}
                  >
                    <img
                      src={c.portrait}
                      alt=""
                      className={cn("size-24 rounded-full object-cover ring-1 ring-line", c.crop)}
                    />
                    <p className="mt-5 text-[10px] font-medium tracking-[0.22em] text-muted uppercase">
                      {c.role}
                    </p>
                    <p className="mt-1 text-base font-semibold tracking-tight text-fg">{c.name}</p>
                    <p className="mt-2 text-sm text-fg/80">{c.tagline}</p>
                    <p className="mt-3 text-xs leading-relaxed text-muted">{c.blurb}</p>
                    <p className="mt-4 text-[11px] tracking-widest text-muted uppercase group-hover:text-fg">
                      Sit with him
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="how" className="scroll-mt-20 border-t border-line">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
            <p className="text-[11px] font-medium tracking-[0.22em] text-muted uppercase">
              How a mind works
            </p>
            <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
              He knows what he knew. He reasons from that.
            </h2>
            <div className="mt-12 grid gap-8 sm:grid-cols-3">
              <article className="rounded-3xl bg-surface px-6 py-8">
                <p className="text-[10px] font-medium tracking-[0.22em] text-muted uppercase">Time</p>
                <h3 className="mt-3 text-lg font-semibold tracking-tight">His century, not yours</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Marcus ends in 180. Einstein in the spring of 1955. Turing in June 1954. If you
                  speak of what came after, he will say so — then think with the tools he actually
                  had.
                </p>
              </article>
              <article className="rounded-3xl bg-surface px-6 py-8">
                <p className="text-[10px] font-medium tracking-[0.22em] text-muted uppercase">
                  Writings
                </p>
                <h3 className="mt-3 text-lg font-semibold tracking-tight">The grain of the page</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Notes to himself. Thought experiments. Notebooks. Poor Richard. A 1950 paper in
                  Mind. Dreams. Scenes. Not a costume. Not a recitation of famous lines.
                </p>
              </article>
              <article className="rounded-3xl bg-surface px-6 py-8">
                <p className="text-[10px] font-medium tracking-[0.22em] text-muted uppercase">
                  Reason
                </p>
                <h3 className="mt-3 text-lg font-semibold tracking-tight">Logic, not trivia</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  He is not a library. When he does not know, he says so. Then he works the present
                  case — judgment, a picture, an experiment, a reduced problem, a shadow, a motive.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="border-t border-line">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
            <p className="text-[11px] font-medium tracking-[0.22em] text-muted uppercase">
              What Urelios is not
            </p>
            <ul className="mt-8 grid gap-6 text-sm leading-relaxed text-muted sm:grid-cols-2">
              <li>
                <span className="text-fg">Not eight chatbots.</span> The world is Urelios. The minds
                are windows into it.
              </li>
              <li>
                <span className="text-fg">Not deepfakes.</span> Portraits are treated as intellectual
                artefacts — museum-still, black and white.
              </li>
              <li>
                <span className="text-fg">Not all of history.</span> Socrates, Churchill, Jobs do not
                earn a chair by fame. The test is: what way of thinking is missing?
              </li>
              <li>
                <span className="text-fg">Not a download. Yet.</span> Sit at the table in the
                browser. A program you can keep on your machine will come later.
              </li>
            </ul>
          </div>
        </section>

        <section id="voices" className="scroll-mt-20 border-t border-line">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-2">
            <div>
              <p className="text-[11px] font-medium tracking-[0.22em] text-muted uppercase">
                Voice and manner
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">The instrument is not the man.</h2>
              <p className="mt-4 text-base leading-relaxed text-muted">
                Lux, Orion, Altair, Perseus — four voices you may give him. Manner is his: journal
                or lecture, parlor or laboratory, dream or stage. Speak replies if you wish. Hear
                him when a line lands.
              </p>
            </div>
            <div>
              <p className="text-[11px] font-medium tracking-[0.22em] text-muted uppercase">Papers</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">Guest, or keep them.</h2>
              <p className="mt-4 text-base leading-relaxed text-muted">
                You may sit without an account. Sign in if you want the conversations kept. Nothing
                here is sold as therapy, counsel of record, or the man himself returned.
              </p>
              <Button asChild size="md" variant="outline" className="mt-6">
                <Link to="/privacy">How we keep papers</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="border-t border-line">
          <div className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8 sm:py-28">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">The table is set.</h2>
            <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted">
              Choose a mind. Ask a question that is really a question.
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link to="/app">Enter the table</Link>
            </Button>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
