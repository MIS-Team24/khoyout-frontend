import { NavigatablePageWrapper } from "@/components/custom";
import { MyProfilePage } from "@/components/views/myProfile";
import ClientProfile from "../clientProfile/ClientProfile";
import useAuth from "@/hooks/useAuth";

function MyProfile() {
  const data = useAuth();
  const isDesigner = data.auth.user?.user.type === "designer";

  return (
    <main>
      <NavigatablePageWrapper>
        {isDesigner ? <MyProfilePage /> : <ClientProfile />}
      </NavigatablePageWrapper>
    </main>
  );
}

export default MyProfile;
