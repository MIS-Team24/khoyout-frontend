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
