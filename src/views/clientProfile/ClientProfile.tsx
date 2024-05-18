import NavigatablePageWrapper from "@/components/custom/NavigatablePageWrapper";
import { ClientProfilePage } from "@/components/views/clientProfile";

export default function ClientProfile() {
  return (
    <main>
      <NavigatablePageWrapper>
        <ClientProfilePage />
      </NavigatablePageWrapper>
    </main>
  );
}
