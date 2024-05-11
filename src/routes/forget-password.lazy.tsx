import ForgetPass from "@/views/forgetPass/ForgetPass";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/forget-password")({
  component: ForgetPass,
});
