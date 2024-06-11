import ComingAppointmentPage from "@/components/views/comingAppointment/ComingAppointmentPage.tsx";
import DesignerAppointmentsPage from "@/components/views/designerAppointment/DesignerAppointmentsPage.tsx";
import { NavigatablePageWrapper } from "@/components/custom";
import useAuth from "@/hooks/useAuth";

export default function ComingAppointment() {
  const data = useAuth();
  const isDesigner = data.auth.user?.user.type === "designer";

  return (
    <main>
      <NavigatablePageWrapper>
        {isDesigner ? <DesignerAppointmentsPage /> : <ComingAppointmentPage />}
      </NavigatablePageWrapper>
    </main>
  );
}
