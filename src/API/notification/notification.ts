import client from "@/API/client";

export type API_Notification = {
  id: number;
  read: boolean;
  type: string;
  time: string;
  sender: {
    id: number | null;
  };
  details: string | null;
};

export type API_NotificationResponse = {
  data: API_Notification[];
};

export function getNotifications(access_token: string) {
  return client.get("/notifications/list", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}
