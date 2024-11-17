// import { CustomerT } from '../../../types/users-types';
// import { createEntityAdapter } from '@reduxjs/toolkit';
import { mainAPISlice, adapter } from '../../RTK';

const initialState = adapter.getInitialState()

export const customerExtendsmainAPISlice = mainAPISlice.injectEndpoints({
  endpoints: builder => ({
    getCustomers: builder.query({
      query: () => '/src/core/fake-db/database.json',
      transformResponse: (responseData: any) => {
        console.log('initialState from CustomerAPI: ', initialState, responseData);
        return adapter.setAll(initialState, responseData.customer);
      },
    })
  })
})

export const { useGetCustomersQuery } = customerExtendsmainAPISlice

// export const selectUsersResult = customerExtendsmainAPISlice.endpoints.getCustomers.select()
