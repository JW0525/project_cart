import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ProductState {
  detail_image_url: string,
  item_name: string,
  item_no: number,
  price: number,
  score: number,
  count?: number,
  isSellYn: boolean
}

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
          count: 1,
          isSellYn: true,
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


    setProductSellYn: (state, action) => {
      const { products } = state;

      for (let i in products) {
        if (products[i].item_no == action.payload) {
          products[i].isSellYn = !products[i].isSellYn;
        }
      }
    },

    setAllProductSellYn: (state) => {
      const { products } = state;

      if (products.every(product => product.isSellYn === true)) {
        for (let i in products) {
          products[i].isSellYn = false;
        }
      } else {
        for (let i in products) {
          products[i].isSellYn = true;
        }
      }
    },

    addProductCount: (state, action) => {
      const { products } = state;
      const { item_no, type } = action.payload;

      const product = products.find(product => {
        return product.item_no === item_no;
      });

      switch (type) {
        case('add'):
          product!.count = product!.count! + 1;
          break;
        case('subtract'):
          if (product!.count! === 1) break;
          product!.count = product!.count! - 1;
          break;
        default:
          break;
      }
    },
  }
})

const { reducer, actions } = cartSlice;
export default reducer;

export const {
  addCartProducts,
  subtractCartProducts,
  setProductSellYn,
  setAllProductSellYn,
  addProductCount
} = actions;