// searchSlice.js
import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchResults: [],
  },
  reducers: {
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
    // Adicionando ação de edição para o estado de pesquisa
    editSearchResult: (state, action) => {
      const { id, updatedProduct } = action.payload;
      const index = state.searchResults.findIndex(
        (product) => product._id === id
      );
      if (index !== -1) {
        state.searchResults[index] = updatedProduct;
      }
    },
    // Adicionando ação de exclusão para o estado de pesquisa
    deleteSearchResult: (state, action) => {
      const id = action.payload;
      state.searchResults = state.searchResults.filter(
        (product) => product._id !== id
      );
    },
  },
});

export const {
  setSearchResults,
  clearSearchResults,
  editSearchResult,
  deleteSearchResult,
} = searchSlice.actions;

export default searchSlice.reducer;
