import { createLazyFileRoute } from "@tanstack/react-router";
import DesignerProfile from "@/views/designerProfile/DesignerProfile";

export const Route = createLazyFileRoute("/$designerId/designer")({
  component: DesignerProfile,
});
