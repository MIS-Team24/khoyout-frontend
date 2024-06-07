import { UserType } from "@/API/response_enums";

export type API_LOGGED_IN_USER = {
  email: string;
  firstName: string;
  lastName: string;
  emailActivated: boolean;
  avatarURL: string | null;
  type: UserType;
};

export enum UserDeleteAccountReason {
  AccountCreatedByMistake = "ACCOUNT_CREATED_BY_MISTAKE",
  NoLongerUseful = "NO_LONGER_USEFUL",
  CantFindServicesOrDesigners = "CANT_FIND_SERVICES_OR_DESIGNERS",
  Other = "OTHER"
}