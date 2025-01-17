import { configureStore } from '@reduxjs/toolkit';
import authService from '../features/auth/authService';
import authReducer from './reducers/authReducer';
import categoryService from '../features/category/categoryService';
import globalReducer from './reducers/globalReducer';

export const store = configureStore({
  reducer: {
    [authService.reducerPath]: authService.reducer,
    [categoryService.reducerPath]: categoryService.reducer,
    authReducer: authReducer, // hap info: no need to put this in brackets as it's a string identifier
    globalReducer: globalReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(authService.middleware)
    .concat(categoryService.middleware),
});
