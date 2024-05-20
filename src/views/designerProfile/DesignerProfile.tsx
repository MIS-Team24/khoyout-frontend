import { NavigatablePageWrapper } from "@/components/custom";
import {
  ProfileDetails,
  AboutDesigner,
  DesignerVideos,
  Service,
} from "@/components/views/designerProfile";
import { Inspiration } from "@/components/views/home";

export default function DesignerProfile() {
  return (
    <NavigatablePageWrapper>
      {/* TODO: Make it dynamic */}
      <ProfileDetails wishlisted={false} />
      <AboutDesigner />
      <Inspiration title="Photos" />
      <DesignerVideos />
      <Service />
    </NavigatablePageWrapper>
  );
}
