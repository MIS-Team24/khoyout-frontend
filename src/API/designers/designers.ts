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

export function createNewService(access_token: string, serviceTitle: string, serviceDescription: string, servicePrice: number)
{
  return client.post("/designer/services", {
    title: serviceTitle,
    description: serviceDescription,
    price: servicePrice
  }, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  })
}

export function modifyExistingService(access_token: string, serviecId: string, serviceTitle: string, serviceDescription: string, servicePrice: number)
{
  return client.patch(`/designer/services/${serviecId}`, {
    title: serviceTitle,
    description: serviceDescription,
    price: servicePrice
  }, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  })
}