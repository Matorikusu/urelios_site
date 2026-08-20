import { createFileRoute } from "@tanstack/react-router";
import { Chamber } from "@/components/chamber/chamber";
import { isCompanionId, type CompanionId } from "@/lib/companions";

export const Route = createFileRoute("/app")({
  validateSearch: (search: Record<string, unknown>): { mind?: CompanionId } => ({
    mind: isCompanionId(search.mind) ? search.mind : undefined,
  }),
  head: () => ({
    meta: [{ title: "The table — Urelios" }],
  }),
  component: AppPage,
});

function AppPage() {
  const { mind } = Route.useSearch();
  return <Chamber initialMind={mind} />;
}
