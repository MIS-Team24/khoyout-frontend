import client from "@/API/client";

export type FilterType = {
  location: string;
  gender: string;
  yearsOfExperience: number;
  minRating: number;
  openNow: boolean;
  name: string;
  sortBy: string;
};

export function getDesigners(
  limit: number = 10,
  page: number = 1,
  filterType: FilterType,
) {
  return client.get("/designer", {
    params: {
      limit,
      page,
      ...filterType,
    },
  });
}
