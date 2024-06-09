import client from "../client";

export function getDesigner(id: string) {
  return client.get(`/designer/${id}`);
}
export function getDesignerPortfolio(id: string) {
  return client.get(`/designer/${id}/portfolio`);
}
