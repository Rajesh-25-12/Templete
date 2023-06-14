import React from "react";
import XLSX from "sheetjs-style";
import moment from "moment-timezone";

const Excel = (rowData3, rowData, title, Column) => {
  // Get the current date in the desired format
  let newdate = moment(new Date()).format("DD-MMM-YYYY");

  // Determine the data to be used for Excel export
  var data = rowData3.length > 0 ? rowData3 : rowData;
  data = data.map((asset) => ({
    ...asset,
    ...asset.asset_attributes,
  }));
  for (let i = 0; i < data.length; i++) {
    data[i].x = data[i].over_speed;
  }
  data = data.map(
    ({
      asset_attributes,
      ipss_asset_id,
      parent_id,
      description,
      asset_type,
      asset_role,
      over_speed,
      ...rest
    }) => rest
  );

  // Create a new workbook
  var workbook = XLSX.utils.book_new();

  // Create a new worksheet
  var ws = XLSX.utils.json_to_sheet(data, { origin: "A1" });

  // Adding the column names as a row at the beginning
  XLSX.utils.sheet_add_aoa(ws, [Column], { origin: "A1" });

  // Append the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, ws, "SheetName");

  // Generate the Excel file and download it
  XLSX.writeFile(workbook, title + "-" + newdate + ".xlsx");
};

export default Excel;
