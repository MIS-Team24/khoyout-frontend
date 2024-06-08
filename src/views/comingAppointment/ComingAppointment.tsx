import ComingAppointmentPage from "@/components/views/comingAppointment/ComingAppointmentPage.tsx";
import {NavigatablePageWrapper} from "@/components/custom";

export default function comingAppointment() {
    return (
        <main>
            <NavigatablePageWrapper>
                <ComingAppointmentPage/>
            </NavigatablePageWrapper>
        </main>
    );
}