import { configureStore, combineSlices } from '@reduxjs/toolkit';
import { slices } from './feature-slice/utils';
import { productSlice } from './feature-slice/products/product-api';
import { mainAPISlice } from './RTK';

const rootReducer = combineSlices(mainAPISlice, slices, productSlice);

export const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(mainAPISlice.middleware);
  },
});

// console.log('store: ', store.getState());

// export type RootState = ReturnType<typeof store.getState>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
