import { createLazyFileRoute } from "@tanstack/react-router";
import { Home } from "../views";

export const Route = createLazyFileRoute("/")({
  component: Home,
});
