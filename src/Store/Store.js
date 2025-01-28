import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './Slice.js';

export const store = configureStore({
  reducer: {
    counter: counterReducer, 
  },
});

export default store;
