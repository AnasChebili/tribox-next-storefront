import { createSlice } from "@reduxjs/toolkit";

export type selectedTags = string[];

const initialState: selectedTags = [];

const selectedTagsSlice = createSlice({
  name: "selectedTags",
  initialState,
  reducers: {
    pushToSelectedTags: (state, action) => {
      state.push(action.payload);
    },
    removeFromSelectedTags: (state, action) => {
      state = state.filter((item) => item === action.payload);
    },
    setSelectedTags: (state, action) => {
      console.log(state);
      console.log(action.payload);

      state = action.payload;
    },
  },
});

export const { pushToSelectedTags, removeFromSelectedTags, setSelectedTags } =
  selectedTagsSlice.actions;
export default selectedTagsSlice.reducer;
