import { createFileRoute, Link } from "@tanstack/react-router";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  return (
    <main className="relative grid min-h-dvh place-items-center bg-bg px-6 py-10 text-fg">
      <div className="relative w-full max-w-sm text-center">
        <img
          src="/marcus.jpg"
          alt=""
          className="mx-auto size-24 rounded-full object-cover portrait-crop ring-1 ring-line"
        />
        <p className="mt-6 text-[11px] font-medium tracking-[0.28em] text-muted uppercase">Urelios</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-fg">Keep the papers</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Sign in to save conversations with the eight minds. Then return to the table.
        </p>

        <div className="mt-8 flex flex-col gap-3">
          {authEnabled ? (
            GROK_PROVIDERS.map((p) => (
              <Button
                key={p.providerId}
                type="button"
                variant="outline"
                size="lg"
                className="w-full"
                onClick={() => signIn(p.providerId, { callbackURL: "/" })}
              >
                Continue with {p.label}
              </Button>
            ))
          ) : (
            <p className="text-sm text-muted">Sign-in is disabled.</p>
          )}
        </div>

        <Link to="/" className="mt-8 inline-block text-sm text-muted underline-offset-4 hover:text-fg hover:underline">
          Enter as a guest
        </Link>
      </div>
    </main>
  );
}
