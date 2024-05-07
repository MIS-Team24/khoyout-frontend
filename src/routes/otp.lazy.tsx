import { OTP } from "@/components/views/OTP";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/otp")({
  component: OTP,
});
