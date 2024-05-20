import client from "@/API/client";

type API_LoginBody = {
    email: string;
    password: string;
    rememberMe: boolean;
};

export function login(data: API_LoginBody) {
    return client.post("/auth/login", {
        data,
    });
}