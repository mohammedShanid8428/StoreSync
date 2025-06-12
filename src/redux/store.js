import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slices/productslice"
import wishSlice from "./slices/wishSlice"
import cartSlice from "./slices/cartSlice"

const store = configureStore({
  reducer: {
    productSlice,
    wishSlice,
    cartSlice
  }
});

export default store;