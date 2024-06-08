type BaseAccount = {
  avatarUrl: string;
  gender: string;
  name: string;
};

type LocationDetails = {
  latitude: string;
  longitude: string;
  address: string;
};

type Review = {
  rating: number;
  comment: string;
  postedOn: string;
  avatarUrl: string;
  user: {
    baseAccountId: string;
  };
};

type Service = {
  title: string;
  description: string;
  price: number;
};

type TeamMember = {
  name: string;
  role: string;
  avatarUrl: string;
};

type Category = {
  name: string;
};

type Portfolio = {
  // Assuming portfolios have a certain structure, define it here
};

// Define the main type
export type API_Designer = {
  baseAccountId: string;
  ordersFinished: number;
  yearsExperience: number;
  about: string;
  workingDays: {
    day: string;
    time: string;
  }[];
  rating: number;
  baseAccount: BaseAccount;
  openNow: boolean;
  openUntil: string;
  locationDetails: LocationDetails;
  reviews: Review[];
  services: Service[];
  teamMembers: TeamMember[];
  categories: { Category: Category }[];
  portfolios: Portfolio[];
};
