import Subscription from "@/views/subscription/Subscription";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/subscription/")({
  component: Subscription,
});
