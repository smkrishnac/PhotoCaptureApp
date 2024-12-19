import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PhotoType } from '../navigation/types';

interface PhotosState {
  photos: PhotoType[];
}

const initialState: PhotosState = {
  photos: [],
};

const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    addPhoto: (state, action: PayloadAction<PhotoType>) => {
      state.photos.push(action.payload);
    },
  },
});

export const { addPhoto } = photosSlice.actions;
export default photosSlice.reducer;
