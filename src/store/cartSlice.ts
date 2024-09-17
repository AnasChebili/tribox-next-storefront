// store/cartSlice.js
import { RouterOutput } from "@/server";
import { createSlice } from "@reduxjs/toolkit";

export type CartState = {
  totalAmount: number;
  items: RouterOutput["getProduct"][];
};

const initialState: CartState = {
  totalAmount: 0,
  items: [],
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
  },
});

export const {
  addAlltoCart,
  addItemToCart,
  removeItemFromCart,
  setTotalAmount,
} = cartSlice.actions;
export default cartSlice.reducer;
