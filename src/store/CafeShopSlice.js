import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rowData: [],
  currentCafeFilter: '',
  cafeShopOptions: [],
  currentCafeShop: JSON.parse(sessionStorage.getItem('currentCafeShop')) || null, 
};

const CafeShopSlice = createSlice({
  name: 'cafeShop',
  initialState,
  reducers: {
    setRowData: (state, action) => {
      state.rowData = action.payload;
    },
    setCafeFilter: (state, action) => {
      state.currentCafeFilter = action.payload;
    },
    setCurrentCafeShop: (state, action) => {
      state.currentCafeShop = action.payload;
      sessionStorage.setItem('currentCafeShop', JSON.stringify(action.payload)); 
    },
    createCafeShop: (state, action) => {
      state.rowData.push(action.payload);  
    },
    updateCafeShop: (state, action) => {
      const updatedCafeShop = action.payload;
      const index = state.rowData.findIndex((shop) => shop.id === updatedCafeShop.id);
      if (index !== -1) {
        state.rowData[index] = { ...state.rowData[index], ...updatedCafeShop };
        if (state.currentCafeShop?.id === updatedCafeShop.id) {
          state.currentCafeShop = { ...state.currentCafeShop, ...updatedCafeShop };
          sessionStorage.setItem('currentCafeShop', JSON.stringify(state.currentCafeShop));  
        }
      }
    },

    clearCurrentCafeShop: (state) => {
      state.currentCafeShop = null;
      sessionStorage.removeItem('currentCafeShop');
    },
    resetState: (state) => {
      state.rowData = [];
      state.currentCafeFilter = '';
      state.cafeShopOptions = [];
      state.currentCafeShop = null;
      sessionStorage.removeItem('currentCafeShop');  
    },
  },
});

export const {
  setRowData,
  setCafeFilter,
  setCurrentCafeShop,
  createCafeShop,
  updateCafeShop,
  clearCurrentCafeShop,
  resetState,
} = CafeShopSlice.actions;

export const selectRowData = (state) => state.cafeShop.rowData;
export const selectCafeFilter = (state) => state.cafeShop.currentCafeFilter;
export const selectCafeShopOptions = (state) => state.cafeShop.cafeShopOptions;
export const selectCurrentCafeShop = (state) => state.cafeShop.currentCafeShop;

export default CafeShopSlice.reducer;
