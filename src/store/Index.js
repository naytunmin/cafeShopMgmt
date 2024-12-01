import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './EmployeeSlice';
import cafeShopReducer from './CafeShopSlice';

export const store = configureStore({
  reducer: {
    employee: employeeReducer,
    cafeShop : cafeShopReducer
  },
});
