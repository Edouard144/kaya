import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/checkout")({
  beforeLoad: () => {
    throw redirect({ to: "/quote" });
  },
});
