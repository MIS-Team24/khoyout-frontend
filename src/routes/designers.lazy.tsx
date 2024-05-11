import Designers from "@/views/Designers";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/designers")({
  component: Designers,
});
