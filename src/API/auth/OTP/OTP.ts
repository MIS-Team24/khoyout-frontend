import client from "../../client";

export const sendOTP = async (email: string) => {
  return client.post("/auth/send-otp", { email });
};

type API_ValidateOTP = {
  email: string;
  keyVal: string;
  code: string;
};

export function validateOTP(data: API_ValidateOTP) {
  return client.post("/auth/validate-otp", data);
}
