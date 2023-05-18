import React, { useState, useEffect, useRef } from "react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";

const defColumnDefs = {
    sortable: true,
    resizable: true,
    wrapHeaderText: true,
    autoHeaderHeight: true,
    autoHeaderWidth: true,
    lockVisible: true,
    filter: true,
    floatingFilter: true,
    enableBrowserTooltips: false,
    minWidth: 151,
    flex: 1,
  };
  const Grid=({AGData,AgColumnData,onGridReady,rowSelection})=>{
return(
    <>
         <AgGridReact
                headerCheckboxSelection={true}
                headerCheckboxSelectionFilteredOnly={true}
                checkboxSelection={true}
                rowSelection={rowSelection}
                rowData={AGData}
                columnDefs={AgColumnData}
                defaultColDef={defColumnDefs}
                pagination={true}
                onGridReady={onGridReady}
                paginationPageSize={100}
                headerHeight={80}
              />
    </>
)
  }
  export default Grid