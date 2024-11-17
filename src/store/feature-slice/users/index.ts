// import { CustomerT } from '../../../types/users-types';
// import { createEntityAdapter } from '@reduxjs/toolkit';
import { mainAPISlice, adapter } from '../../RTK';

const initialState = adapter.getInitialState()

export const userExtendsmainAPISlice = mainAPISlice.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query({
      query: () => '/src/core/fake-db/database.json',
      transformResponse: (responseData: any) => {
        console.log('initialState from CustomerAPI: ', initialState, responseData);
        return adapter.setAll(initialState, responseData.users);
      },
    })
  })
})

export const { useGetUsersQuery } = userExtendsmainAPISlice

// export const selectUsersResult = userExtendsmainAPISlice.endpoints.getUsers.select()
