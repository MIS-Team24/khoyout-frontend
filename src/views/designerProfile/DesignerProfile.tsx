import { NavigatablePageWrapper } from "@/components/custom";
import { Designer } from "@/components/views/designerProfile";

export default function DesignerProfile() {
  return (
    <NavigatablePageWrapper>
      {/* TODO: Make it dynamic */}
      <Designer />
    </NavigatablePageWrapper>
  );
}
