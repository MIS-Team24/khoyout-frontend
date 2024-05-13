import NavigatablePageWrapper from "@/components/custom/NavigatablePageWrapper";
import {
  ProfileDetails,
  AboutDesigner,
} from "@/components/views/designerProfile";
import { Inspiration } from "@/components/views/home";

export default function DesignerProfile() {
  return (
    <NavigatablePageWrapper>
      {/* TODO: Make it dynamic */}
      <ProfileDetails wishlisted={false} />
      <AboutDesigner />
      <Inspiration title="Images" />
    </NavigatablePageWrapper>
  );
}
