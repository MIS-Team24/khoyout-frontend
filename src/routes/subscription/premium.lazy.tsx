import Premium from "@/views/subscription/Premium";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/subscription/premium")({
  component: Premium,
});
