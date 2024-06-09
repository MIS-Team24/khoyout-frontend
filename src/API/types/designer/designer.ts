type BaseAccount = {
  avatarUrl: string;
  gender: string;
  name: string;
};

export type LocationDetails = {
  latitude: string;
  longitude: string;
  address: string;
};

export type Review = {
  rating: number;
  comment: string;
  postedOn: string;
  avatarUrl: string;
  name: string;
};

export type Service = {
  title: string;
  description: string;
  price: number;
};

export type TeamMember = {
  name: string;
  role: string;
  avatarUrl: string;
};

export type WorkingDay = {
  day: string;
  hours: string;
};

type Category = {
  name: string;
};

type Portfolio = {
  url: string;
};

// Define the main type
export type API_Designer = {
  baseAccountId: string;
  ordersFinished: number;
  yearsExperience: number;
  about: string;
  workingDays: WorkingDay[];
  rating: number;
  baseAccount: BaseAccount;
  openNow: boolean;
  openUntil: string;
  locationDetails: LocationDetails;
  reviews: Review[];
  services: Service[];
  teamMembers: TeamMember[];
  categories: { Category: Category }[];
};

export type API_DesignerPortfolios = Portfolio[];
