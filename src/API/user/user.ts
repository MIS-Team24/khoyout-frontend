import client from "@/API/client";
import { UserDeleteAccountReason } from "../types/user/user";

export function getCurrentActiveUser(access_token: string) {
  return client.get("/local/auth/get-user", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export function deleteUserAccount(access_token: string, reason: UserDeleteAccountReason, otherReason?: string) {
  return client.post("/user/delete-account", {
    reason: reason,
    otherReason: otherReason
  }, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  })
}