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

export function logout(access_token: string) {
  return client.delete("/local/auth/logout", {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  })
}