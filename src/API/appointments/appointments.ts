import client from "../client";

export function getAvailableTimes(
  access_token: string,
  id: string,
  timeZone: string,
) {
  return client.get(`/appointments/${id}/available-times`, {
    params: {
      "time zone": timeZone,
    },
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export function bookAppointment(
  access_token: string,
  id: string,
  availableTimeId: number,
  requestDescription: string,
  date: string,
  //   service: string,
  //   img: string,
) {
  return client.post(
    `/appointments/${id}/requests`,
    {
      availableTimeId,
      requestDescription,
      date,
      //   service,
      // img,
    },
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  );
}

export function getAppointments(access_token: string) {
  return client.get("/appointments", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}
