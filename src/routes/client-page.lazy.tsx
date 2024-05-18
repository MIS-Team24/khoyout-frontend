import ClientProfile from "@/views/clientProfile/ClientProfile";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/client-page")({
  component: ClientProfile,
});
