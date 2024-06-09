import MyProfile from "@/views/myProfile/MyProfile";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/my-profile")({
  component: MyProfile,
});
