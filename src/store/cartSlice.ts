// store/cartSlice.js
import { RouterOutput } from "@/server";
import { createSlice } from "@reduxjs/toolkit";
import { UUID } from "crypto";

export type CartState = {
  totalAmount: number;
  items: RouterOutput["getProduct"][];
  orderId: null | UUID;
};

const initialState: CartState = {
  totalAmount: 0,
  items: [],
  orderId: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setTotalAmount: (state, action) => {
      state.totalAmount = action.payload;
    },
    addItemToCart: (state, action) => {
      state.items.push(action.payload);
    },
    removeItemFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    addAlltoCart: (state, action) => {
      state.items = action.payload;
    },
    setOrderId: (state, action) => {
      state.orderId = action.payload;
    },
  },
});

export const {
  addAlltoCart,
  addItemToCart,
  removeItemFromCart,
  setTotalAmount,
  setOrderId,
} = cartSlice.actions;
export default cartSlice.reducer;
