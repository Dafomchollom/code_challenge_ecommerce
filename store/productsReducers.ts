import { createSlice } from '@reduxjs/toolkit';
import { ProductPromise } from '../utils/interfaces';
export const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: {} as ProductPromise,
  },
  reducers: {
    populateProductsStore: (state, action) => {
      state.products = action.payload as ProductPromise;
    },
  },
});
export const { populateProductsStore } = productSlice.actions;

export default productSlice.reducer;
