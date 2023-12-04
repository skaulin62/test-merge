import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {getCartFromLS, changeTotalPrice} from "../../utils/cartLocalStorage.ts";
import { stat } from "fs";


export type Item = {
  id: string,
  imageUrl: string,
  title: string,
  type: string,
  size: number,
  price: number,
  category: number,
  rating: number,
  count: number

}

interface IItem {
  totalPrice: number,
  items: Item[],
}

const initialState: IItem = {
  totalPrice: changeTotalPrice(getCartFromLS()),
  items: getCartFromLS()

};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Item>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      state.totalPrice =changeTotalPrice(state.items)
    },

    minusItem(state, action: PayloadAction<Item>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        if(findItem.count > 0)
        findItem.count--;
      }
      state.totalPrice =changeTotalPrice(state.items)
    },
    removeItem(state, action: PayloadAction<Item>) {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      state.totalPrice =changeTotalPrice(state.items)
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice =changeTotalPrice(state.items)
    },
  },
});

export const selectorCart = (state: RootState) => state.cart;
export const selectorFind = (id: string) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id);
export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
