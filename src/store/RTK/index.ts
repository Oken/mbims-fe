/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const mainAPISlice = createApi({
  reducerPath: 'main',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://mbims.org.ng/api/v1',
    // baseUrl: 'http://146.190.45.42:8080/api/v1',
    // baseUrl: 'https://ims-demo.onrender.com/api/v1',
    // baseUrl: 'http://192.168.43.112:9100/api/v1',
    // baseUrl: 'http://localhost:9100/api/v1',
  }),
  tagTypes: [
    'product',
    'User',
    'productCategory',
    'subcategory',
    'discount',
    'store',
    'tax',
    'variantAttribute',
    'outlet',
    'supplier',
    'brand',
  ],
  endpoints: (builder) => ({
    fetchData: builder.query({
      query() {
        return '/fake';
      },
    }),
  }),
});
