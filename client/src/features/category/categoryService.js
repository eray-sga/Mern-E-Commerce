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
  endpoints: (builder) => ({ // Open parentheses for endpoints object
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
  }), // Close parentheses for endpoints object
});

export const { useCreateMutation, useGetQuery, useFetchCategoryQuery } = categoryService;
export default categoryService;



// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const categoryService = createApi({
//     reducerPath: 'category',
//     tagTypes: 'categories',
//     baseQuery: fetchBaseQuery({
//         baseUrl: 'http://localhost:8080/api/',
//         prepareHeaders: (headers, state) => {
//             console.log(state.getState());
//             const reducers = state.getState();
//             const token = reducers?.authReducer?.adminToken;
//             headers.set('authorization', token ? `Bearer ${token}` : '');
//             return headers;
//         }
//     }),
//     endpoints: (builder) => {
//         return {
//             create: builder.mutation({
//                 query: (name) => {
//                     return {
//                         url: 'create-category', // /backend/routes/categoryRoute.js
//                         method: 'POST',
//                         body: name
//                     }
//                 },
//                 invalidatesTags: ['categories']
//             }),
//             get: builder.query({
//                 query: (page) => {
//                     return {
//                         url: `categories/${page}`,
//                         method: 'GET'
//                     }
//                 },
//                 providesTags: ['categories']
//             }),
//             update: builder.mutation({
//                 query: (name) => {
//                     return {
//                         url: 'update-category',
//                         method: 'POST',
//                         body: name
//                     }
//                 },
//                 invalidatesTags: ['categories']
//             })
//         }
//     }
// });

// export const {useCreateMutation, useGetQuery} = categoryService;
// export default categoryService;

// // // authService.js : 
// // import axios from 'axios';
// // import { API_URL } from '../../constants';

// // const registerUrl = `${API_URL}api/users/`;
// // const loginUrl = `${API_URL}api/users/login`;

// // const register = async (userData) => {
// //     const response = await axios.post(registerUrl, userData);

// //     if(response.data) {
// //         localStorage.setItem('user', JSON.stringify(response.data));
// //     }

// //     return response.data
// // }

// // const logout = () => {
// //     localStorage.removeItem('user');
// // }

// // const login = async (userData) => {
    
// //     const response = await axios.post(loginUrl,userData);

// //     if(response.data) {
// //         localStorage.setItem('user', JSON.stringify(response.data));
// //     }

// //     return response.data;
// // }

// // const authService = {
// //     register,
// //     logout,
// //     login
// // }

// // export default authService

// // authSlice.js : 

// // import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// // import authService from './authService';

// // const user = JSON.parse(localStorage.getItem('user'));

// // const initialState = {
// //     user: user ? user : null,
// //     isError: false,
// //     isSuccess: false,
// //     isLoading: false,
// //     message: ''
// // };

// // export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
// //     try {
// //         return await authService.register(user);
// //     } catch (error) {
// //         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

// //         return thunkAPI.rejectWithValue(message);
// //     }
// // });


// // export const logout = createAsyncThunk('auth/logout', async () => {
// //     await authService.logout();
// // });

// // export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
// //     try {
// //         return await authService.login(user);
// //     } catch (error) {
// //         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
// //         return thunkAPI.rejectWithValue(message);
// //     }
// // });

// // export const authSlice = createSlice({
// //     name: 'auth',
// //     initialState,
// //     reducers: {
// //         reset: (state) => {
// //             state.isError = false
// //             state.isSuccess = false
// //             state.isLoading = false
// //             state.message = ''
// //         },
// //     },

// //     extraReducers: (builder) => {
// //         builder
// //             .addCase(register.pending, (state) => {
// //                 state.isLoading = true
// //             })
// //             .addCase(register.fulfilled, (state, action) => {
// //                 state.isLoading = false
// //                 state.isSuccess = true
// //                 state.user = action.payload
// //             })
// //             .addCase(register.rejected, (state, action) => {
// //                 state.isLoading = false
// //                 state.isError = true
// //                 state.message = action.payload
// //                 state.user = null
// //             })
// //             .addCase(login.pending, (state) => {
// //                 state.isLoading = true
// //             })
// //             .addCase(login.fulfilled, (state, action) => {
// //                 state.isLoading = false
// //                 state.isSuccess = true
// //                 state.user = action.payload
// //             })
// //             .addCase(login.rejected, (state, action) => {
// //                 state.isLoading = false
// //                 state.isError = true
// //                 state.message = action.payload
// //                 state.user = null
// //             })
// //             .addCase(logout.fulfilled, (state) => {
// //                 state.user = null
// //             })
// //     }
// // })

// // export const { reset } = authSlice.actions
// // export default authSlice.reducer