import client from "@/API/client";

type API_ResetPasswordBody = {
  email: string;
  password: string;
  repeatPassword: string;
};

export function resetPassword(data: API_ResetPasswordBody) {
  console.log(data);

  return client.put("/auth/reset-password", {
    data,
  });
}
