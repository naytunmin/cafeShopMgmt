import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '../style.css';  // Import the CSS file

const CommonGrid = ({ columnDefs, rowData, gridApiRef, onGridReady, onFilterChanged }) => {
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const paginationPageSize = 10;
  const paginationPageSizeSelector = [10, 20, 50, 100];

  return (
    <div style={gridStyle} className="ag-theme-alpine">
      <AgGridReact
        pagination
        paginationPageSize={paginationPageSize}
        paginationPageSizeSelector={paginationPageSizeSelector}
        columnDefs={columnDefs}
        defaultColDef={{
          sortable: true,
          resizable: true,
          filter: true,
        }}
        onGridReady={onGridReady}
        onFilterChanged={onFilterChanged}
        rowData={rowData}
        domLayout="autoHeight"
        loadingOverlayComponent={() => <div className="ag-overlay-loading-center">Loading...</div>}
        overlayLoadingTemplate={'<span class="ag-overlay-loading-center">Loading...</span>'}
        overlayNoRowsTemplate={'<span class="ag-overlay-loading-center">No data available</span>'}
        ref={gridApiRef}
      />
    </div>
  );
};

export default CommonGrid;
