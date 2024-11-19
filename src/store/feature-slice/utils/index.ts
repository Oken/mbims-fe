import { createSlice } from '@reduxjs/toolkit';
// import fakeData from '../../../core/fake-db/fake_db.json';

export interface StateT {
  showHeader: boolean;
}

const initialState: StateT = {
  showHeader: false,
};

export const slices = createSlice({
  name: 'slices',
  initialState,
  reducers: {
    toggleShowHeader: (state) => {
      state.showHeader = !state.showHeader;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleShowHeader } = slices.actions;

export default slices.reducer;
