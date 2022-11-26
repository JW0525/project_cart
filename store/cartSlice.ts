import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductState } from "./productsSlice";

export interface CartState {
  products: ProductState[],
  totalAmounts: number
  coupon?: string
}


const initialState: CartState = {
  products: [],
  totalAmounts: 0,
  coupon: ''
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartProducts: (state, action) => {
      const { product, item_no } = action.payload;

      if (state.products.every(product => product.item_no !== item_no)) {
        state.products.push({
          count: 0,
          ...product
        });
      }
    },

    subtractCartProducts: (state, action) => {
      const { item_no } = action.payload;

      state.products = state.products.filter(product => {
        return product.item_no !== item_no
      })
    },
  }
})

const { reducer, actions } = cartSlice;
export default reducer;

export const {
  addCartProducts,
  subtractCartProducts
} = actions;