import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart(state, action) {
      const existing = state.cart.find((item) => item.id === action.payload.id);
      if (existing) {
        state.cart.filter((item) => item.id !== existing.id);
        existing.quantity += 1;
        alert("Item quantity increased in cart");
      } else {
        const newItem = { ...action.payload, quantity: 1 };
        state.cart.push(newItem);
        alert("Item added to cart");
      }
    },
    removefromCart(state, action) {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      alert("Item removed from cart");
    },
    incrementQuantity(state, action) {
      const existing = state.cart.find((item) => item.id === action.payload);
      existing.quantity += 1;
    },
    decrementQuantity(state, action) {
      const existing = state.cart.find((item) => item.id === action.payload);
      if (existing.quantity === 1) {
        state.cart = state.cart.filter((item) => item.id != existing.id);
        alert("Item removed from cart");
      } else {
        existing.quantity -= 1;
      }
    },
    checkout(state) {
        state.cart = []
    },
  },
});

export const {
  addToCart,
  removefromCart,
  incrementQuantity,
  decrementQuantity,
  checkout,
} = cartSlice.actions;
export default cartSlice.reducer;
