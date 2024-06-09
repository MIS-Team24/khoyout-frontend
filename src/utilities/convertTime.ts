/* eslint-disable prefer-const */
export function convertTo12HourFormat(time24: string): string {
  const [hours, minutes] = time24.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const hours12 = hours % 12 === 0 ? 12 : hours % 12;
  const time12 = `${hours12.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")} ${period}`;
  return time12;
}

export function convertTo24HourFormat(time12: string): string {
  const [time, period] = time12.split(" ");
  let [hours, minutes] = time.split(":").map(Number);
  if (period === "PM" && hours !== 12) {
    hours += 12;
  } else if (period === "AM" && hours === 12) {
    hours = 0;
  }
  const hours24 = hours.toString().padStart(2, "0");
  const minutes24 = minutes.toString().padStart(2, "0");

  return `${hours24}:${minutes24}:00`;
}

export function convertToUTC(time12: string): string {
  const time24 = convertTo24HourFormat(time12);
  const date = new Date();
  const [hours, minutes, seconds] = time24.split(":").map(Number);
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(seconds);
  return date.toISOString();
}
