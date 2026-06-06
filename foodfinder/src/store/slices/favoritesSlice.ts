import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Favorite = {
    id: string;
    name: string;
    category: string;
    location: string;
    price: string;
    rating: number;
    image: any;
};

type FavoritesState = {
    items: Favorite[];
};

const initialState: FavoritesState = {
    items: [],
};

const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        toggleFavorite: (state, action: PayloadAction<Favorite>) => {
            const exists = state.items.find(item => item.id === action.payload.id);
            if (exists) {
                state.items = state.items.filter(item => item.id !== action.payload.id);
            } else {
                state.items.push(action.payload);
            }
        },
    },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;