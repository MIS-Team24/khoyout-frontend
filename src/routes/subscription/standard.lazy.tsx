import Standard from "@/views/subscription/Standard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/subscription/standard")({
  component: Standard,
});
