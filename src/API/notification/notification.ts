import client from "@/API/client";

export function getNotifications(access_token: string) {
  return client.get("/notifications/list", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}
