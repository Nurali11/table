import { configureStore } from "@reduxjs/toolkit";
import { selectedSlice } from "./selectSlice";

export const store = configureStore({
  reducer: selectedSlice.reducer
});
