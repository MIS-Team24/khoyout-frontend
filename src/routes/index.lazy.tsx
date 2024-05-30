import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import Home from "../views/Home";
import { useEffect } from "react";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate({ from: "/", to: "/home" });
  }, []);

  return <Home />;
}
