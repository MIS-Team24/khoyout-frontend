import {createLazyFileRoute} from '@tanstack/react-router'
import ComingAppointment from "@/views/comingAppointment/ComingAppointment.tsx";

export const Route = createLazyFileRoute("/coming-appointment")({
    component: ComingAppointment,
})