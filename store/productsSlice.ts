import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ProductState {
  detail_image_url: string,
  item_name: string,
  item_no: number,
  price: number,
  score: number,
  count?: number
}

const initialState: ProductState = {
  detail_image_url: '',
  item_name: '',
  item_no: 0,
  price: 0,
  score: 0,
  count: 0
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {

  }
})

const { reducer, actions } = productsSlice;
export default reducer;