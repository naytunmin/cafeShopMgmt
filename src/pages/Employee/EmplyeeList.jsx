import React, { useEffect, useState, useRef,useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { useNavigate } from 'react-router-dom';
import { getData } from '../../api/FetchServices'; 
import { API_ENDPOINTS } from '../../utils/ApiConfig';
import CommonGrid from '../../components/CommonGrid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import CommonColumns from '../../components/CommonColumns';
import CustomButton from '../../components/CustomButton';
import { Button, Input, Row, Col, Layout, Space } from 'antd';
const { Content } = Layout;

const EmplyeeList = () => {
  const [rowData, setRowData] = useState([]);
  const [currentCafeFilter, setCurrentCafeFilter] = useState('');
  const gridApiRef = useRef(null);
  const navigate = useNavigate();
  const columns = useMemo(() => CommonColumns(gridApiRef, 'employee'), [gridApiRef]);

  const fetchEmployees = async (filter = '') => {
    const decodedFilter = decodeURIComponent(filter);
    const response = await getData(API_ENDPOINTS.EMPLOYEE.GET, { cafe: decodedFilter });
    if (response.success) {
      setRowData(response.data.data);
    } else {
      console.error('Error fetching emplopyee:', response.message);
    }
  };

  useEffect(() => {
    const cafeshopName = sessionStorage.getItem('cafeshopName');
    if (cafeshopName) {
      setCurrentCafeFilter(cafeshopName);
      sessionStorage.removeItem('cafeshopName');
    } else {
      fetchEmployees(currentCafeFilter);
    }
  }, [currentCafeFilter]);

  const onFilterChanged = () => {
    const filterModel = gridApiRef.current.getFilterModel();
    const cafeShopNameFilter = filterModel.cafeShopName ? filterModel.cafeShopName.filter : '';
    setCurrentCafeFilter(cafeShopNameFilter);
  };

  const onGridReady = (params) => {
    gridApiRef.current = params.api; 
    fetchEmployees(); 
  };
  const handleAddEmployee = () => {
    navigate('/employee-form');
  };
  return (
    <div style={{ backgroundColor: '#fff' }}>
        <CustomButton 
          onClick={handleAddEmployee} 
          label="Add Employee" 
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

export default EmplyeeList;
