import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type Sort = {
  title: string;
  sort: string
};
type State = {
  filter: number,
  currentPage: number,
  sort: Sort,
  searchValue: string
}

const initialState: State = {
  filter: 0,
  currentPage: 1,
  sort: {
    title: "популярности (asc)",
    sort: "rating",
  },
  searchValue: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<number>) {
      state.filter = action.payload;
    },
    setSortObj(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setParams(state, action: PayloadAction<State>) {
      state.currentPage = Number(action.payload.currentPage);
      state.filter = Number(action.payload.filter);
      state.sort = action.payload.sort;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
  },
});
export const selectorFilter = (state: RootState) => state.filter;

export const { setCategory, setSortObj, setPage, setParams, setSearchValue } =
  filterSlice.actions;
export default filterSlice.reducer;
