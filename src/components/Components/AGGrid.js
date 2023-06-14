import React, { useState, useEffect, useRef } from "react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";

// Default column definitions for the grid
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
  minWidth: 121,
};

// Grid component
const Grid = ({ AGData, AgColumnData, onGridReady, rowSelection, onFilterChanged }) => {
  return (
    <>
      {/* Render the AgGridReact component */}
      <AgGridReact
        headerCheckboxSelection={true} // Enable checkbox selection in the header
        headerCheckboxSelectionFilteredOnly={true} // Enable checkbox selection only for filtered rows in the header
        checkboxSelection={true} // Enable checkbox selection for each row
        onFilterChanged={onFilterChanged} // Callback function for filter changes
        rowSelection={rowSelection} // Set the row selection mode
        rowData={AGData} // Set the data for the grid
        columnDefs={AgColumnData} // Set the column definitions for the grid
        defaultColDef={defColumnDefs} // Set the default column definitions for the grid
        pagination={true} // Enable pagination
        onGridReady={onGridReady} // Callback function for grid ready event
        paginationPageSize={100} // Set the number of rows per page in pagination
        headerHeight={80} // Set the height of the header
      />
    </>
  );
};

export default Grid;
