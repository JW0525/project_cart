import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteAllProduct, deleteProduct, initialize } from "./cartSlice";

export interface ProductState {
  detail_image_url: string,
  item_name: string,
  item_no: number,
  price: number,
  score: number,
  isSellYn: boolean
  count?: number,
  availableCoupon?: boolean
}

export interface ProductListState {
  productList: ProductState[];
}

const initialState: ProductListState = {
  productList: []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    synchronize: (state, action: PayloadAction<any>) => {
      state.productList = action.payload;
    },
    addCartProducts: (state, action) => {
      const { productList } = state;
      const { item_no, product } = action.payload;

      // list 에 상품이 없을 시 추가하고, 있다면 제거한다.
      if (productList.every(product => product.item_no !== item_no)) {
        if (productList.length < 3) {
          state.productList.push(product);
        } else {
          alert('상품은 3개까지만 담을 수 있습니다.')
        }
      } else {
        state.productList = state.productList.filter(product =>
          product.item_no !== item_no
        )
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(initialize, (state, action) => {
        state.productList = [];
      })
      .addCase(deleteAllProduct, (state, action) => {
        state.productList = [];
      })
      .addCase(deleteProduct, (state, action) => {
        const cartProductList = action.payload;

        state.productList = cartProductList.filter((product: ProductState) => {
          return !product.isSellYn;
        });
      })
      .addDefaultCase((state, action) => {
        // console.log(action);
      });
  }
})

const { reducer, actions } = cartSlice;
export default reducer;

export const {
  synchronize,
  addCartProducts
} = actions;