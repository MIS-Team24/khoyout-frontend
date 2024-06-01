import client from "@/API/client";

export type API_LoginBody = {
  email: string;
  password: string;
  rememberMe: boolean | undefined;
};

export function login(data: API_LoginBody) {
  return client.post("/local/auth/login", {
    email: data.email,
    password: data.password,
  });
}
