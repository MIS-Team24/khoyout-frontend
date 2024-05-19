import {createFileRoute} from '@tanstack/react-router'
import {ResetPassword} from "../views";

export const Route = createFileRoute('/reset-password')({
    component: () => <ResetPassword/>
})