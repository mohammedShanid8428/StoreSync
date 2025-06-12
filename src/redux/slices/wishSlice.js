import { createSlice } from "@reduxjs/toolkit";

const wishSlice = createSlice({
    name: "wishlist",
    initialState: {
        wishlist : []
    },
    reducers : {
        addToWishlist(state,action) {
            const existing = state.wishlist.find(item => item.id === action.payload.id);
            if( existing ) {
                alert('item Already Wishlisted !');
            } else {
                state.wishlist.push(action.payload);
                alert('Item added to wishlist');
            }
        },
        removeFromWishlist(state,action) {
            state.wishlist = state.wishlist.filter(item => item.id !== action.payload);
            alert("Item Removed from Wishlist")
        }
    }
})

export const {addToWishlist,removeFromWishlist} = wishSlice.actions
export default wishSlice.reducer
