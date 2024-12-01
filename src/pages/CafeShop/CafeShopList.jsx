import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getData } from '../../api/FetchServices';
import { API_ENDPOINTS } from '../../utils/ApiConfig';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import CommonColumns from '../../components/CommonColumns';
import CommonGrid from '../../components/CommonGrid';
import CustomButton from '../../components/CustomButton';
import { Button, Input, Row, Col, Layout, Space } from 'antd';
const { Content } = Layout;

const CafeShopList = () => {
  const [rowData, setRowData] = useState([]);
  const [currentCafeFilter, setCurrentCafeFilter] = useState('');
  const gridApiRef = useRef(null);
  const navigate = useNavigate();
  const columns = useMemo(() => CommonColumns(gridApiRef, 'cafe'), [gridApiRef]);

  const fetchCafeShops = async (filter = '') => {
    const response = await getData(API_ENDPOINTS.CAFE_SHOP.GET, { location: filter });
    console.log('response success', response.success);
    if (response.success) {
      console.log('response success');
      setRowData(response.data.data);
    } else {
      console.error('Error fetching cafe shops:', response.message);
    }
  };

  useEffect(() => {
    console.log('useEffect');
    fetchCafeShops(currentCafeFilter);
  }, [currentCafeFilter]);

  const onFilterChanged = () => {
    console.log('onFilterChanged');
    const filterModel = gridApiRef.current.getFilterModel();
    const cafeShopLocationFilter = filterModel.location ? filterModel.location.filter : '';
    setCurrentCafeFilter(cafeShopLocationFilter); 
  };

  const onGridReady = (params) => {
    gridApiRef.current = params.api; 
    fetchCafeShops(); 
  };
  const handleAddCafeShop = () => {
    navigate('/cafe-form');  
  };

  return (
      <div style={{ backgroundColor: '#fff' }}>
        <CustomButton 
          onClick={handleAddCafeShop} 
          label="Add Cafe Shop" 
        />

        <CommonGrid
          columnDefs={columns}
          rowData={rowData}
          gridApiRef={gridApiRef}
          onGridReady={onGridReady}
          onFilterChanged={onFilterChanged}
        />
      </div>
  );
};

export default CafeShopList;
