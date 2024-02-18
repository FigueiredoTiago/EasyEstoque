// store.js
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from './reducers/login';
import productsReducer from './reducers/products';
import search from './reducers/search';



// Corrija aqui para usar o nome correto do reducer
const reducer = combineReducers({
    auth: authReducer, // use 'auth' como a chave do seu reducer
    products: productsReducer,
    search: search,
});

const store = configureStore({ reducer });

export default store;
