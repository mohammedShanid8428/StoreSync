import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProductsThunk = createAsyncThunk("product/fetchProducts", async () => {
  const response = await axios.get('https://dummyjson.com/products');
  return response;
});

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    productDupe: [], // For search reset
    loading: false,
    error: "",
    productsPerPage: 12,
    currentPage: 1,
  },
  reducers: {
    search(state, action) {
      const keyword = action.payload.toLowerCase();
      if (keyword.length > 0) {
        state.products = state.productDupe.filter(item =>
          item.title.toLowerCase().includes(keyword)
        );
      } else {
        state.products = state.productDupe;
      }
    },
    previousPage(state) {
      if (state.currentPage > 1) {
        state.currentPage -= 1;
      }
    },
    nextPage(state) {
      const totalPages = Math.ceil(state.productDupe.length / state.productsPerPage);
      if (state.currentPage < totalPages) {
        state.currentPage += 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsThunk.pending, (state) => {
        state.loading = true;
        state.products = [];
        state.productDupe = [];
        state.error = "";
      })
      .addCase(fetchProductsThunk.fulfilled, (state, action) => {
        state.products = action.payload.data.products;
        state.productDupe = action.payload.data.products;
        state.loading = false;
      })
      .addCase(fetchProductsThunk.rejected, (state) => {
        state.loading = false;
        state.products = [];
        state.productDupe = [];
        state.error = 'Failed to fetch products';
      });
  },
});

export const { search, previousPage, nextPage } = productSlice.actions;
export default productSlice.reducer;
