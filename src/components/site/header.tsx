import { Link } from "@tanstack/react-router";
import { AuthChip } from "@/components/chamber/auth-chip";
import { Button } from "@/components/ui/button";

const NAV = [
  { to: "/", hash: "minds", label: "The minds" },
  { to: "/", hash: "how", label: "How it works" },
  { to: "/about", label: "About" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-line/60 bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-5 sm:h-16 sm:px-8">
        <Link
          to="/"
          className="text-[11px] font-medium tracking-[0.28em] text-fg uppercase"
        >
          Urelios
        </Link>
        <nav className="ml-auto hidden items-center gap-6 md:flex">
          {NAV.map((item) =>
            "hash" in item ? (
              <a
                key={item.label}
                href={`${item.to}#${item.hash}`}
                className="text-sm text-muted hover:text-fg"
              >
                {item.label}
              </a>
            ) : (
              <Link key={item.label} to={item.to} className="text-sm text-muted hover:text-fg">
                {item.label}
              </Link>
            ),
          )}
        </nav>
        <div className="ml-auto flex items-center gap-2 md:ml-6">
          <Button asChild size="sm" variant="outline">
            <Link to="/app">Enter</Link>
          </Button>
          <AuthChip />
        </div>
      </div>
    </header>
  );
}
