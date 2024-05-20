import client from "@/API/client";

type API_ResetPasswordBody = {
    password: string;
    confirmPassword: string;
};

export function resetPassword(data: API_ResetPasswordBody) {
    return client.post("/auth/reset-password", {
        data,
    });
}