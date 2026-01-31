import { authApi } from '@/features/api/authApi';
import authReducer from '../features/authSlice';
import { combineReducers } from '@reduxjs/toolkit';
import { courseApi } from '@/features/api/courseApi';
import { purchaseApi } from '@/features/api/purchaseApi';
import { courseLearnApi } from '@/features/api/courseLearnApi';

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [courseApi.reducerPath]: courseApi.reducer,
  [purchaseApi.reducerPath]: purchaseApi.reducer,
  [courseLearnApi.reducerPath]: courseLearnApi.reducer,
  auth: authReducer,
});

export default rootReducer;