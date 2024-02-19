// productsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: {
      results: [],
    },
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    addProduct: (state, action) => {
      state.products.results.push(action.payload);
    },
    editProduct: (state, action) => {
      const { id, updatedProduct } = action.payload;
      const index = state.products.results.findIndex((product) => product._id === id);
      if (index !== -1) {
        state.products.results[index] = updatedProduct;
      }
    },
    deleteProduct: (state, action) => {
      const id = action.payload;
      state.products.results = state.products.results.filter(
        (product) => product._id !== id
      );
    },
    searchByName: (state, action) => {
      const searchResults = action.payload;
      state.products.results = searchResults;
    },
  },
});

export const { setProducts, addProduct, editProduct, deleteProduct, searchByName } =
  productsSlice.actions;

export default productsSlice.reducer;
