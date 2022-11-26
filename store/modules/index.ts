import {combineReducers, createStore} from "redux";
import cartSlice from "../cartSlice";
import {configureStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  cartSlice,
});

export const store = configureStore({
  reducer: rootReducer
})

export type RootState = ReturnType<typeof rootReducer>;