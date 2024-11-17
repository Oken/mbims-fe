// import { createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';
// import { ExpiredProductT, ProductCategoryT, ProductT } from '../../../types/product-types';
// import fakeData from '../../../core/fake-db/fake_db.json';

// export interface StateT {
//   allData: ProductT[];
//   product: ProductT | null;
//   productCategories: ProductCategoryT[];
//   productCategory: ProductCategoryT | null;
//   expiredProducts: ExpiredProductT[];
// }

// const initialState: StateT = {
//   allData: fakeData.product,
//   product: null,
//   productCategories: fakeData.product_category,
//   productCategory: null,
//   expiredProducts: fakeData.expired_product,
// };

// export const productSlice = createSlice({
//   name: 'products',
//   initialState,
//   reducers: {
//     fetchProducts: (state) => {
//       state.allData;
//     },
//     fetchProduct: (state, action: PayloadAction<number>) => {
//       console.log(action.payload);
//       state.product = state.allData.find((product) => product.id === action.payload) ?? null;
//     },
//     deleteProduct: (state, action: PayloadAction<number>) => {
//       state.allData.filter((product) => product.id !== action.payload);
//     },
//     fetchProductCategories: (state) => {
//       state.productCategories;
//     },
//     fetchProductCategory: (state, action: PayloadAction<number>) => {
//       state.productCategory = state.productCategories.find((category) => category.id === action.payload) ?? null;
//     },
//     fetchExpiredProduct: (state) => {
//       state.expiredProducts;
//     },
//   },
// });

// // Action creators are generated for each case reducer function
// export const { fetchProduct, fetchProducts, deleteProduct } = productSlice.actions;

// export default productSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ExpiredProduct, Product, ProductCategory } from '../../../types/product-types';
import fakeData from '../../../core/fake-db/fake_db.json';

export interface StateT {
  allData: Product[];
  product: Product | null;
  productCategories: ProductCategory[];
  productCategory: ProductCategory | null;
  expiredProducts: ExpiredProduct[];
}

const initialState: StateT = {
  allData: fakeData.product,
  product: null,
  productCategories: fakeData.product_category,
  productCategory: null,
  expiredProducts: fakeData.expired_product,
};

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchProducts: (state) => {
      state.allData;
    },
    fetchProduct: (state, action: PayloadAction<number>) => {
      state.product = state.allData.find((product) => product.id === action.payload) ?? null;
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.allData = state.allData.filter((product) => product.id !== action.payload);
    },
    fetchProductCategories: (state) => {
      state.productCategories;
    },
    fetchProductCategory: (state, action: PayloadAction<number>) => {
      state.productCategory = state.productCategories.find((category) => category.id === action.payload) ?? null;
    },
    fetchExpiredProduct: (state) => {
      state.expiredProducts;
    },
  },
});

export const { fetchProduct, fetchProducts, deleteProduct, fetchProductCategories, fetchProductCategory, fetchExpiredProduct } = productSlice.actions;

export default productSlice.reducer;
