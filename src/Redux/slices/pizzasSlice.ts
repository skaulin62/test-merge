import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import PizzaService from "../../API/PizzaService.ts";
import { RootState } from "../store";


export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

export type Item = {
  id: string,
  imageUrl: string,
  title: string,
  types: number[],
  sizes: number[],
  price: number,
  category: number,
  rating: number,

}

interface IItem {
  items: Item[],
  status: Status
}

const initialState: IItem = {
  items: [],
  status: Status.LOADING,
};

export const fetchPizzas = createAsyncThunk(
  "pizza/getAll",
  async (currentPage: number) => {
    const response = await PizzaService.getAll(String(currentPage));

    return response.data as Item[];
  }
);

const pizzaSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
        state.items = [];
        state.status = Status.LOADING;
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<Item[]>)=> {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.items = [];
      state.status = Status.ERROR;
    });
    
  },

});

export const selectorPizzas = (state: RootState) => state.pizzas;
export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
