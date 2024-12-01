import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rowData: [],
  currentCafeFilter: '',
  cafeShopOptions: [],
  currentEmployee: JSON.parse(sessionStorage.getItem('currentEmployee')) || null,
};

const EmployeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    setRowData: (state, action) => {
      state.rowData = action.payload;
    },
    setCafeFilter: (state, action) => {
      state.currentCafeFilter = action.payload;
    },
    setCafeShopOptions: (state, action) => {
      state.cafeShopOptions = action.payload;
    },
    setCurrentEmployee: (state, action) => {
      state.currentEmployee = action.payload;
      sessionStorage.setItem('currentEmployee', JSON.stringify(action.payload)); 
    },
    createEmployee: (state, action) => {
      state.rowData.push(action.payload);  
    },
    updateEmployee: (state, action) => {
      const updatedEmployee = action.payload;
      const index = state.rowData.findIndex((emp) => emp.id === updatedEmployee.id);
      if (index !== -1) {
        state.rowData[index] = { ...state.rowData[index], ...updatedEmployee };
        if (state.currentEmployee?.id === updatedEmployee.id) {
          state.currentEmployee = { ...state.currentEmployee, ...updatedEmployee };
          sessionStorage.setItem('currentEmployee', JSON.stringify(state.currentEmployee)); 
        }
      }
    },

    clearCurrentEmployee: (state) => {
      state.currentEmployee = null;
      sessionStorage.removeItem('currentEmployee'); 
    },
    resetState: (state) => {
      state.rowData = [];
      state.currentCafeFilter = '';
      state.cafeShopOptions = [];
      state.currentEmployee = null;
      sessionStorage.removeItem('currentEmployee'); 
    },
  },
});

export const {
  setRowData,
  setCafeFilter,
  setCafeShopOptions,
  setCurrentEmployee,
  createEmployee,
  updateEmployee,
  clearCurrentEmployee,
  resetState,
} = EmployeeSlice.actions;

export const selectRowData = (state) => state.employee.rowData;
export const selectCafeFilter = (state) => state.employee.currentCafeFilter;
export const selectCafeShopOptions = (state) => state.employee.cafeShopOptions;
export const selectCurrentEmployee = (state) => state.employee.currentEmployee;

export default EmployeeSlice.reducer;
