import { UserType } from "@/API/response_enums";

export type API_LOGGED_IN_USER = {
  email: string;
  firstName: string;
  lastName: string;
  emailActivated: boolean;
  avatarURL: string | null;
  type: UserType;
};
