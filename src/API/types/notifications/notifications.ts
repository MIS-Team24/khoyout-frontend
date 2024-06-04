import { notificationType } from "@/API/response_enums";

export type API_Notification = {
  id: number;
  read: boolean;
  type: string;
  time: string;
  sender: {
    id: string;
    name: string;
    avatarURL: string | null;
  } | null;
  details: string | null;
  notifiationType: notificationType;
};

export type API_NotificationResponse = {
  data: API_Notification[];
};
