import client from "@/API/client";

export function getDesigners(
  limit: number = 10,
  page: number = 1,
  name?: string,
  openNow?: boolean,
  sortBy?: string,
  gender?: string,
  yearsOfExperience?: number,
  location?: string,
  mainRating?: number,
) {
  return client.get("/designer", {
    params: {
      limit,
      page,
      name,
      openNow,
      sortBy,
      gender,
      yearsOfExperience,
      location,
      mainRating,
    },
  });
}
