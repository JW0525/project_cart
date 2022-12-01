import { combineReducers } from "redux";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {AsyncThunkAction, configureStore} from "@reduxjs/toolkit";
import cartSlice from "../cartSlice";
import productsSlice from "../productsSlice";

const rootReducer = combineReducers({
  cartSlice,
  productsSlice
});

export default rootReducer;

export const store = configureStore({
  reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = (fetchCost: AsyncThunkAction<unknown, void, {}>) => useDispatch<AppDispatch>();