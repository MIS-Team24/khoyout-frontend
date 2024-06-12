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
  Friday = "FRIDAY",
}

export type API_AvailableTimes = {
  data: AvailableTimeBody[];
};

type BaseAccount = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  emailActivated: boolean;
  password: string;
  phone: string | null;
  gender: string | null;
  createdAt: string;
  updatedAt: string;
  avatarUrl: string | null;
  BirthDate: string | null;
};

type Designer = {
  baseAccount: BaseAccount;
};

type User = {
  baseAccount: BaseAccount;
};

export type API_AppointmentBody = {
  id: number;
  designerId: string;
  designer: Designer;
  userId: string;
  user: User;
  startTime: string;
  endTime: string;
  description: string;
  status: string;
};

export type API_AppointmentsResponse = {
  data: API_AppointmentBody[];
};
