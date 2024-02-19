// store.js
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/login";
import productsReducer from "./reducers/products";

// Corrija aqui para usar o nome correto do reducer
const reducer = combineReducers({
  auth: authReducer, // use 'auth' como a chave do seu reducer
  products: productsReducer,
});

const store = configureStore({ reducer });

export default store;
