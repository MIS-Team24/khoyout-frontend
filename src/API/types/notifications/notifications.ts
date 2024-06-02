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
