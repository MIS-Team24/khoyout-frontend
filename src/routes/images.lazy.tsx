import ImagePagination from "@/views/imagesPagination/ImagePagination";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/images")({
  component: ImagePagination,
});
