import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/inspiration")({
  component: () => (
    <div>
      Hello /inspiration!
    </div>
  ),
});
