import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import selectedTagsReducer from "./selectedTagsSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    selectedTags: selectedTagsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
