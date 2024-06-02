import { createLazyFileRoute } from "@tanstack/react-router";
import Home from "@/views/Home";

export const Route = createLazyFileRoute("/home")({
  component: Home,
});
