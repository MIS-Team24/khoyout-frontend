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
  service: string,
  //   img: string,
) {
  return client.post(
    `/appointments/${id}/requests`,
    {
      availableTimeId,
      requestDescription,
      date,
      serviceId: service
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

export function writeReviewForAppointment(access_token: string, designerId: string, appointmentId: number, comment: string, rate: number)
{
  return client.post(`/appointments/${designerId}/${appointmentId}/reviews`, {
    rate: rate,
    comment: comment
  }, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  })
}