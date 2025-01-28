import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productCounts: {},
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state, action) => {
      const productId = action.payload;
      state.productCounts[productId] =
        (state.productCounts[productId] || 0) + 1;
    },
    decrement: (state, action) => {
      const productId = action.payload;
      if (state.productCounts[productId]) {
        state.productCounts[productId] = Math.max(
          state.productCounts[productId] - 1,
          0
        );
      }
    },
  },
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
