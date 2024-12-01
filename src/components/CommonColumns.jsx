import React from 'react';
import Logo from './Logo';
import ListButton from './CommonButtom';
import LinkButton from './LinkButton';

import '../style.css';  // Import the CSS file

const CommonColumns = (gridApiRef, type) => {
  let typeSpecificColumns = [];
  if (type === 'cafe') {
    typeSpecificColumns = [
      { headerName: "id", field: "id", hide: true },
      {
        field: 'logo',
        headerName: 'Logo',
        filter: false,
        maxWidth: 80,
        cellRenderer: (params) => <Logo {...params} api={gridApiRef.current} />,
      },
      { 
        headerName: "Name", 
        field: "name", 
        filter: false, 
        maxWidth: 120, 
      },
      { 
        headerName: "Description", 
        field: "description", 
        filter: false, 
        flex: 2, 
      },
      {
        field: 'employeeCount',
        headerName: 'Emp Count',
        filter: false,
        maxWidth: 120, 
        cellRenderer: function(params) {
          return <LinkButton data={params.data} />;
        }
      },
      { 
        headerName: "Location", 
        field: 'location', 
        filter: 'agTextColumnFilter', 
        flex: 1.5,
      },
      { headerName: "status", field: 'status', hide: true, filter: false },
    ];
  } else if (type === 'employee') {
    typeSpecificColumns = [
      { headerName: "id", field: "id", filter: false, maxWidth: 120 },
      { headerName: "Name", field: "name", filter: false, flex: 2 }, 
      { headerName: "Email", field: "emailAddress", filter: false, flex: 2 }, 
      { headerName: "Phone", field: "phoneNumber", filter: false, flex: 1.5 },
      { 
        headerName: "Total Working Days", 
        field: 'daysWorked', 
        filter: false, 
        flex: 1,
      },
      { headerName: "Cafe Shop", field: 'cafeShopName', filter: 'agTextColumnFilter', flex: 2 }, 
      { headerName: "status", field: 'status', hide: true, filter: false },
      { headerName: "cafeShopId", field: 'cafeShopId', hide: true, filter: false },
    ];
  }
  const allColumns = [
    ...typeSpecificColumns,
    { 
      field: 'actions',
      headerName: 'Actions',
      filter: false,
      cellRenderer: (params) => {
        return <ListButton {...params} api={gridApiRef.current} type={type} />;
      },
    },
  ];

  return allColumns;
};

export default CommonColumns;
