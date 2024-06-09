export function convertTo12HourFormat(time24: string): string {
  const [hours, minutes, seconds] = time24.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const hours12 = hours % 12 === 0 ? 12 : hours % 12;
  const time12 = `${hours12.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")} ${period}`;
  return time12;
}

export function convertTo24HourFormat(time12: string): string {
  const [time, period] = time12.split(" ");
  const [hours12, minutes, seconds] = time.split(":").map(Number);
  const hours24 = period === "AM" ? hours12 % 12 : (hours12 % 12) + 12;
  const time24 = `${hours24.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  return time24;
}
