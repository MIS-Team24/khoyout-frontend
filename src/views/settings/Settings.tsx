import { NavigatablePageWrapper } from "@/components/custom";
import { SettingsPage } from "@/components/views/settings";

function Settings() {
  return (
    <main>
      <NavigatablePageWrapper>
        <SettingsPage />
      </NavigatablePageWrapper>
    </main>
  );
}

export default Settings;
