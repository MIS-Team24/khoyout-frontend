import client from "@/API/client";

export function getCurrentActiveUser(access_token: string) {
  return client.get("/local/auth/get-user", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}
