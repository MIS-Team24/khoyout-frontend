export type AvailableTimeBody = {
  id: number;
  startTime: string;
  endTime: string;
  dayOfWeek: string;
};

export enum dayOfWeekEnum {
  Saturday = "SATURDAY",
  Sunday = "SUNDAY",
  Monday = "MONDAY",
  Tuesday = "TUESDAY",
  Wednesday = "WEDNESDAY",
  Thursday = "THURSDAY",
  Friday = "FRIDAY"
}

export type API_AvailableTimes = {
  data: AvailableTimeBody[];
};
