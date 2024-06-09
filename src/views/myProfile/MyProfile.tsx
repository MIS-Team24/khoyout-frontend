import { NavigatablePageWrapper } from "@/components/custom";
import { MyProfilePage } from "@/components/views/myProfile";

function MyProfile() {
  return (
    <main>
      <NavigatablePageWrapper>
        <MyProfilePage />
      </NavigatablePageWrapper>
    </main>
  );
}

export default MyProfile;
