import client from "@/API/client";

type API_RegisterBody = {
  email: string;
  fullName: string;
  password: string;
  confirmPassword: string;
};

export function register(data: API_RegisterBody) {
  return client.post("/auth/register", {
    ...data,
    repeatPassword: data.confirmPassword,
  });
}

type API_VerifyEmailBody = {
  email: string;
  keyVal: string;
  code: string;
};

export function verifyEmail(data: API_VerifyEmailBody) {
  return client.post("/auth/verify-email", data);
}
