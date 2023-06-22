import { configureStore } from "@reduxjs/toolkit";
import shopReducer from "../components/shopSlice";

export const store = configureStore({
  reducer: {
    shop: shopReducer,
  },
});
