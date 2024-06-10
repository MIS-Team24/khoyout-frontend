import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '@/store';

export interface WishlistItem {
    id: string;
    name: string;
    ratings: {
        average: number;
        totalCount: number;
    };
    yearsOfExperienceCount: number;
    wishlisted: boolean;
    // address: {
    //   province: string;
    //   city: string;
    // };
    img: string;
    address: string;
    openNow: boolean;
    openUntil: string;
    gender: string;
}

interface WishlistState {
    items: WishlistItem[];
}

const initialState: WishlistState = {
    items: JSON.parse(localStorage.getItem('wishlist') || '[]'),
};

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<WishlistItem>) => {
            state.items.push(action.payload);
            localStorage.setItem('wishlist', JSON.stringify(state.items));
        },
        removeItem: (state, action: PayloadAction<string>) => { // Assuming removal by id
            state.items = state.items.filter(item => item.id !== action.payload);
            localStorage.setItem('wishlist', JSON.stringify(state.items));
        },
    },
});

export const {addItem, removeItem} = wishlistSlice.actions;
export const selectWishlist = (state: RootState) => state.wishlist.items;

export default wishlistSlice.reducer;
