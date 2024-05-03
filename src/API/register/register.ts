import client from "@/API/client";

type API_RegisterBody = {
  email: string;
  fullName: string;
  password: string;
  repeatPassword: string;
};

export default function register(data: API_RegisterBody) {
  return client.post("/auth/register", {
    data,
  });
}
