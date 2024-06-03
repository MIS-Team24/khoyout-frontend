import client from "@/API/client";

export function getNotifications(access_token: string) {
  return client.get("/notifications/list", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export function markNotificationsAsRead(access_token: string, ids: number[]) {
  return client.post("/notifications/mark-as-read", {
    ids: ids
  }, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
}