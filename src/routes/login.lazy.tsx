import {createLazyFileRoute} from '@tanstack/react-router'
import {LoginPage} from "../views";

export const Route = createLazyFileRoute('/login')({
    component: () => <LoginPage/>
})