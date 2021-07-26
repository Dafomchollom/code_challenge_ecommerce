import { configureStore } from '@reduxjs/toolkit';
import Products from './productsReducers';

export default configureStore({
  reducer: {
    productsList: Products,
  },
});
