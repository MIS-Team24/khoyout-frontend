import {createLazyFileRoute} from '@tanstack/react-router';
import Wishlist from "@/views/wishlist/Wishlist";

export const Route = createLazyFileRoute('/wishlist')({
    component: Wishlist,
})