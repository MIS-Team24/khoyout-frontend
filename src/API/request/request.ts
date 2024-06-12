import client from "../client";

export function getRequests(access_token: string) {
  return client.get("/appointments/requests", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export function confirmRequest(access_token: string, requestId: number) {
  console.log(access_token);
  console.log(requestId);

  return client.post(
    `/appointments/requests/${requestId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  );
}

export function rejectRequest(access_token: string, requestId: number) {
  return client.delete(`/appointments/requests/${requestId}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export enum markType {
  Finished = "Finished",
  OnGoing = "OnGoing",
  Missed = "Missed",
}

export function markAppointmentAs(
  access_token: string,
  appointmentId: number,
  markAs: markType,
) {
  return client.patch(
    `/appointments/appointments/${appointmentId}/mark`,
    {
      markAs,
    },
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  );
}
