import { Toaster } from "react-hot-toast";
import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{
          duration: 5000,
          style: {
            display: "inline-flex",
            padding: "1.5rem 1rem",
            alignItems: "center",
            gap: "0.25rem",
            borderRadius: "1rem",
            backgroundColor: "#F9F4F4",
          },
        }}
      />
    </>
  ),
});
