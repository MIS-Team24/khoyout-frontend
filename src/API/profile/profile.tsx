import { userUpdateBasicInfoBody } from "@/components/views/myProfile/PersonalInformationForm";
import client from "../client";
import { AvailableTimeBody } from "../types/appointments/appointments";
import { bodyMeasurementsType } from "@/components/views/clientProfile/BodyMeasurmentform";
import { userClientBasicInfoBody } from "@/components/views/clientProfile/PersonalInfoForm";

export function getUserFullProfile(access_token: string) {
  return client.get("/user/read-user-profile-data", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export function updateUserPersonalInfoAPI(
  access_token: string,
  body: userUpdateBasicInfoBody,
) {
  return client.patch("/user/update-designer-basic", body, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export function deleteAvailableTimeAPI(access_token: string, id: number) {
  return client.delete(`/appointments/available-times/${id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export function updateUserClientPersonalInfoAPi(
  access_token: string,
  body: userClientBasicInfoBody,
) {
  return client.patch("/user/update-user-basic", body, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export function createAvailableTime(
  access_token: string,
  time: Omit<AvailableTimeBody, "id">,
) {
  return client.post(
    `/appointments/available-times`,
    {
      ...time,
      day: time.dayOfWeek,
    },
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  );
}

export function updateProfilePicture(access_token: string, file: File) {
  const formData = new FormData();
  formData.append("file", file);
  return client.post("/user/upload-update-avatar", formData, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "multipart/formdata",
    },
  });
}

export function updateBodyMeasurementsAPI(
  access_token: string,
  body: bodyMeasurementsType,
) {
  return client.patch("/user/body-measurement-update-data", body, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}
