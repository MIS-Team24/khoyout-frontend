import ComingAppointmentPage from "@/components/views/comingAppointment/ComingAppointmentPage.tsx";
import DesignerAppointmentsPage from "@/components/views/designerAppointment/DesignerAppointmentsPage.tsx";
import {NavigatablePageWrapper} from "@/components/custom";

export default function comingAppointment() {
    return (
        <main>
            <NavigatablePageWrapper>
                <ComingAppointmentPage/>
                <DesignerAppointmentsPage/>
            </NavigatablePageWrapper>
        </main>
    );
}