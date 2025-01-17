import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const categoryService = createApi({
  reducerPath: 'category',
  tagTypes: ['categories'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api/',
    prepareHeaders: (headers, { getState }) => {
      const { authReducer } = getState();
      const token = authReducer?.adminToken;
      headers.set('authorization', token ? `Bearer ${token}` : '');
      return headers;
    }
  }),
  endpoints: (builder) => ({
    create: builder.mutation({
      query: (name) => {
        return {
          url: 'create-category',
          method: 'POST',
          body: { name }, // Wrap the name inside an object as a JSON body
        };
      },
      invalidatesTags: ['categories'],
    }),

    get: builder.query({
      query: (page) => {
        return {
          url: `categories/${page}`,
          method: 'GET',
        };
      },
      providesTags: ['categories'],
    }),

    fetchCategory: builder.query({
      query: (id) => {
        return {
          url: `fetch-category/${id}`,
          method: 'GET',
        };
      },
    }),
  }), // Close parenthese for endpoints object
});

export const { useCreateMutation, useGetQuery, useFetchCategoryQuery } = categoryService;
export default categoryService;