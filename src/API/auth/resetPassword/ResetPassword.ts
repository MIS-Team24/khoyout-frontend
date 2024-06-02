import client from "@/API/client";

type API_ResetPasswordBody = {
  email: string;
  password: string;
  repeatPassword: string;
};

export function resetPassword(data: API_ResetPasswordBody) {
  return client.post("/auth/reset-password", {
    ...data,
  });
}
