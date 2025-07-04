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
    }
  }
});

export const { addSelected } = selectedSlice.actions;
