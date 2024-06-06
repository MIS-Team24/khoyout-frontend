import client from "@/API/client";
import { UserType } from "@/API/response_enums";

type API_RegisterBody = {
  email: string;
  fullName: string;
  password: string;
  confirmPassword: string;
  userType: UserType;
};

export function register(data: API_RegisterBody) {
  return client.post(
    "/auth/register",
    {
      ...data,
      repeatPassword: data.confirmPassword,
    },
    {
      headers: {
        "Account-Type": data.userType ?? UserType.USER,
      },
    },
  );
}

type API_VerifyEmailBody = {
  email: string;
  keyVal: string;
  code: string;
};

export function verifyEmail(data: API_VerifyEmailBody) {
  return client.post("/auth/verify-email", data);
}
