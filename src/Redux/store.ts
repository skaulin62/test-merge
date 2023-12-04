import { configureStore } from "@reduxjs/toolkit";
import filter from "./slices/filterSlice.ts";
import cart from "./slices/cardSlice.ts";
import pizzas from "./slices/pizzasSlice.ts";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: { filter, cart, pizzas },
});


export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export type RootState = ReturnType<typeof store.getState>;
