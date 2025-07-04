import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  arr: []
};

export const selectedSlice = createSlice({
  name: "Selecteds",
  initialState,
  reducers: {
    addSelected: (state, action: PayloadAction<Array<any>>) => {
      state.arr = action.payload;
    },
    removeSelected: (state, action: PayloadAction<string | number>) => {
      state.arr = state.arr.filter((item: any) => item.key !== action.payload);
    }
  }
});

export const { addSelected, removeSelected } = selectedSlice.actions;
