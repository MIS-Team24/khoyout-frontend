import client from "../client";

export function initiateCheckout(access_token: string, plan: "Premium" | "Standard")
{
    return client.post("/payment/initiate-checkout-session", {
        plan: plan
    }, {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    })
}