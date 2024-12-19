import { configureStore } from '@reduxjs/toolkit';
import photosReducer from './PhotosSlice';

const store = configureStore({
  reducer: {
    photos: photosReducer,
  },
});

export default store;