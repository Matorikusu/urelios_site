import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-bg">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 sm:px-8 sm:py-16">
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <p className="text-[11px] font-medium tracking-[0.28em] text-fg uppercase">Urelios</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
              Eight minds. One table. It began with a conversation with Marcus Aurelius.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            <Link to="/app" className="hover:text-fg">
              Enter the table
            </Link>
            <Link to="/about" className="hover:text-fg">
              About
            </Link>
            <Link to="/privacy" className="hover:text-fg">
              Privacy
            </Link>
            <Link to="/login" className="hover:text-fg">
              Sign in
            </Link>
            <Link to="/local" className="hover:text-fg">
              A program, later
            </Link>
          </nav>
        </div>
        <p className="text-xs leading-relaxed text-muted/70">
          Created by S Whorton — Matorikusu 2026 — All rights reserved. The minds are not the dead
          returned. They are ways of thinking, limited to what each man knew.
        </p>
      </div>
    </footer>
  );
}
