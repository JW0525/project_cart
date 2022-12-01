import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import productsSlice, {addCartProducts, synchronize } from "./productsSlice";
import {getProductList} from "./productsSelector";

export interface ProductState {
  detail_image_url: string,
  item_name: string,
  item_no: number,
  price: number,
  score: number,
  isSellYn: boolean,
  availableCoupon?: boolean,
  count?: number
}

export interface CartState {
  productList: ProductState[],
  totalAmounts: number
  coupon?: any
}

const initialState: CartState = {
  productList: [],
  totalAmounts: 0,
  coupon: {}
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    initialize: (state) => {
      state.productList = [];
      state.totalAmounts = 0;
      state.coupon = {};
    },
    setProductList: (state, action: PayloadAction<any>) => { // 현재는 장바구니 담는 즉시 추가.
      const productList = action.payload;

      const newProductList = [];

      for (let i in productList) {
        newProductList.push({
          count: 1,
          isSellYn: true,
          ...productList[i]
        })
      }

      state.productList = newProductList;
    },
    setCoupon: (state, action) => {
      if (action.payload) {
        state.coupon = action.payload;
        return;
      }

      state.coupon = {};
    },
    setTotalAmounts: (state, action) => {
      state.totalAmounts = action.payload;
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

    deleteProduct: (state, action) => {
      const { productList } = state;

      state.productList = productList.filter(product => {
        return !product.isSellYn
      });

      if (state.productList.length === 0) state.coupon = {};
    },

    deleteAllProduct: (state) => {
      state.productList = [];
      state.coupon = {}; // 전체 상품 삭제시 쿠폰 초기화.
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
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCartProducts, (state, action) => {

        }








      )
      .addDefaultCase((state, action) => {
        // console.log(action);
      });
  }
})

const { reducer, actions } = cartSlice;
export default reducer;

export const {
  initialize,
  setProductList,
  setCoupon,
  setTotalAmounts,
  setProductSellYn,
  setAllProductSellYn,
  deleteProduct,
  deleteAllProduct,
  addProductCount
} = actions;