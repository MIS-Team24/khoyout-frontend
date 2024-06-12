import { API_Pagination } from "../general/pagination";

export type API_Designer = {
  baseAccountId: string;
  ordersFinished: number;
  address: string;
  yearsExperience: number;
  rating: number;
  avatarUrl: string;
  gender: string;
  name: string;
  openNow: boolean;
  openUntil: string;
  reviewCount: number;
};

export type API_DesignersResponse = {
  designers: API_Designer[];
  pagination: API_Pagination;
};
