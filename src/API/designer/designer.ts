import client from "../client";

export function getDesigner(id: string) {
  return client.get(`/designer/${id}`);
}
export function getDesignerPortfolio(id: string) {
  return client.get(`/designer/${id}/portfolio`);
}

// getDesigner("108acf50-6e76-4a67-9c99-c8f434e2db96").then((res) => {
//   console.log(res.data);
// });

// getDesignerPortfolio("108acf50-6e76-4a67-9c99-c8f434e2db96").then((res) => {
//   console.log(res.data);
// });