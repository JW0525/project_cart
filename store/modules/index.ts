import {combineReducers, createStore} from "redux";
import cartSlice from "../cartSlice";
import {configureStore} from "@reduxjs/toolkit";
import productsSlice from "../productsSlice";

const rootReducer = combineReducers({
  cartSlice,
  productsSlice
});

export default rootReducer;

export const store = configureStore({
  reducer: rootReducer
})

export type RootState = ReturnType<typeof rootReducer>;