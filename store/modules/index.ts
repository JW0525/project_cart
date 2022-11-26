import {combineReducers, createStore} from "redux";
import productsSlice from "../productsSlice";
import cartSlice from "../cartSlice";
import {configureStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  cartSlice,
  productsSlice
});

export const store = configureStore({
  reducer: rootReducer
})

export type RootState = ReturnType<typeof rootReducer>;