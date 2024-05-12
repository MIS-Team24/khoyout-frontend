import NavigatablePageWrapper from "@/components/custom/NavigatablePageWrapper";
import {
  ProfileDetails,
  AboutDesigner,
} from "@/components/views/designerProfile";

export default function DesignerProfile() {
  return (
    <NavigatablePageWrapper>
      {/* TODO: Make it dynamic */}
      <ProfileDetails wishlisted={false} />
      <AboutDesigner />
    </NavigatablePageWrapper>
  );
}
