import Notifications from "@/views/notification/Notifications";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/notifications")({
  component: Notifications,
});
