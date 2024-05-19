import DesignerVideos from "@/views/designerGallery/DesignerVideos";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/gallery/videos")({
  component: DesignerVideos,
});
