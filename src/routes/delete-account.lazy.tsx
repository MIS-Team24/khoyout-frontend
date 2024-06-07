import DeleteAccount from "@/components/views/deleteAccount/DeleteAccount";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/delete-account")({
  component: () => <DeleteAccount />,
});
