import client from "@/API/client";

export function getDesigners() {
  return client.get("/designer");
}
