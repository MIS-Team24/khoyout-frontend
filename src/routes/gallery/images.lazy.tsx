import DesignerImages from "@/views/designerGallery/DesignerImages";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/gallery/images")({
  component: DesignerImages,
});
