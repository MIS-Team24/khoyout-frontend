import client from "@/API/client";

export function getCurrentActiveUser()
{
    return client.get("/local/auth/get-user", {
        withCredentials: true
    });
}