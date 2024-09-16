// store/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    totalAmount: 0,
  },
  reducers: {
    setTotalAmount: (state, action) => {
      state.totalAmount = action.payload;
    },
  },
});

export const { setTotalAmount } = cartSlice.actions;
export default cartSlice.reducer;
