import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ProductState {
  detail_image_url: string,
  item_name: string,
  item_no: number,
  price: number,
  score: number,
  isSellYn: boolean,
  count?: number
}

export interface CartState {
  productList: ProductState[],
  totalAmounts: number
  coupon?: string
}

const initialState: CartState = {
  productList: [],
  totalAmounts: 0,
  coupon: ''
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    initialize: (state, action: PayloadAction<any>) => {
      const { productList } = action.payload;

      const newProductList = [];

      for (let i in productList) {
        newProductList.push({
          count: 0,
          ...productList[i]
        })
      }

      state.productList = newProductList;
    },
    setProductSellYn: (state, action) => {
      const { productList } = state;

      for (let i in productList) {
        if (productList[i].item_no == action.payload) {
          productList[i].isSellYn = !productList[i].isSellYn;
        }
      }
    },

    setAllProductSellYn: (state) => {
      const { productList } = state;

      if (productList.every(product => product.isSellYn === true)) {
        for (let i in productList) {
          productList[i].isSellYn = false;
        }
      } else {
        for (let i in productList) {
          productList[i].isSellYn = true;
        }
      }
    },

    addProductCount: (state, action) => {
      const { productList } = state;
      const { item_no, type } = action.payload;

      const product = productList.find(product => {
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
  initialize,
  setProductSellYn,
  setAllProductSellYn,
  addProductCount
} = actions;