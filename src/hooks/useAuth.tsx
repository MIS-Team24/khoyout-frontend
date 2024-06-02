import { RootState } from "@/store";
import { useSelector } from "react-redux";

export default function useAuth() {
  const auth = useSelector((x: RootState) => x.user);

  function getAccessToken(): string | undefined {
    // preprocessing if needed.
    return auth.user?.access_token;
  }

  return {
    auth: auth,
    access_token: getAccessToken,
  };
}
