import client from "../client";

export function getDesigner(id: string) {
  return client.get(`/designer/${id}`);
}
