import { createSlice } from '@reduxjs/toolkit';
import { ProductInterface } from '../utils/interfaces';
export const cartSlice = createSlice({
  name: 'product',
  initialState: {
    cart: [] as ProductInterface[],
  },
  reducers: {
    populateCartStore: (state, { payload }) => {
      state.cart.push(payload);
    },
    clearStore: (state) => {
      state.cart = [] as ProductInterface[];
    },
    removeItem: (state, { payload }) => {
      state.cart = state.cart.filter((item) => item.id !== payload);
    },
  },
});
export const { populateCartStore, clearStore, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
