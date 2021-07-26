import { configureStore } from '@reduxjs/toolkit';
import Products from './productsReducers';
import Cart from './cartReducer';

export default configureStore({
  reducer: {
    productsList: Products,
    cart: Cart,
  },
});
