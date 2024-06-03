import LoginPage from "@/views/loginPage";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/login")({
  component: LoginPage,
});
