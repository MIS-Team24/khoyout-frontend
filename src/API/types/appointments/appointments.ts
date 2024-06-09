export type AvailableTimeBody = {
  id: number;
  startTime: string;
  endTime: string;
  dayOfWeek: string;
};

export type API_AvailableTimes = {
  data: AvailableTimeBody[];
};
