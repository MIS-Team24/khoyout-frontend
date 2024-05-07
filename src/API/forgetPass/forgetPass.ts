import client from "@/API/client";

type API_ForgetPassBody = {
  email: string;
};

export function forgetPass(data: API_ForgetPassBody) {
  return client.post("auth/otp", data);
}
