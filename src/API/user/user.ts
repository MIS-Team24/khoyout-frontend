import client from "@/API/client";

export function getCurrentActiveUser(access_token: string) {
  return client.get("/local/auth/get-user", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export enum UserType {
  DESIGNER = "Designer",
  USER = "User"
}

export type API_LOGGED_IN_USER = {
  email: string,
  firstName: string,
  lastName: string,
  emailActivated: boolean,
  avatarURL: string | null,
  type: UserType
}