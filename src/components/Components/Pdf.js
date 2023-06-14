import jsPDF from "jspdf";
import "jspdf-autotable";
import React from "react";
import moment from "moment-timezone";

const Pdf = (rowData3, rowData, column, title) => {
  // Get the current date and time in the desired format
  let newdate = moment(new Date()).format("DD-MMM-YYYY");
  const time = moment(new Date()).format("LT");

  // Function to add footers to the PDF
  const addFooters = (doc) => {
    const pageCount = doc.internal.getNumberOfPages();
    doc.setFontSize(8);
    for (var i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setDrawColor("#000000");
      doc.rect(
        5,
        5,
        doc.internal.pageSize.width - 10,
        doc.internal.pageSize.height - 10,
        "S"
      );
      doc.text(
        "Page " + String(i) + " of " + String(pageCount),
        doc.internal.pageSize.width / 2,
        291,
        {
          align: "center",
        }
      );
      doc.setFont("helvetica", "italic");
      doc.setFontSize(10);
      doc.text("Royal Durga Logistics", 15, 291);
      doc.text(newdate, 350, 291);
      doc.text(time, 335, 291);
    }
  };

  // Create a new PDF instance
  const doc = new jsPDF("l", "mm", [400, 298]);

  // Determine the data to be used for the PDF
  var data = rowData3.length > 0 ? rowData3 : rowData;
  data = data.map((asset) => ({
    ...asset,
    ...asset.asset_attributes,
  }));
  data = data.map(
    ({ asset_attributes, ipss_asset_id, parent_id, description, ...rest }) =>
      rest
  );

  // Set the font and text color
  doc.setFontSize(15);
  doc.setFont("Times", "bold");
  doc.setTextColor("Dark blue");
  doc.setFontSize(18);
  doc.setTextColor("black");
  doc.setFontSize(10);
  doc.setFontSize(12);

  // Add the document title
  doc.text("Vehicle List", 160, 15);

  // Generate the table using autoTable
  doc.autoTable(column, data, {
    styles: {
      cellPadding: 1,
      fontSize: 8,
      font: "akshar",
    },
    columnWidth: "wrap",
    theme: "grid",
    headerStyles: {
      lineWidth: 0.3,
      lineColor: [217, 216, 216],
      fillColor: "#1abd9c",
      textColor: [255, 255, 255],
    },
    startY: 25,
    willDrawCell: function (data) {
      if (data.cell.text == "Yes") {
        doc.setTextColor("#ff1212");
      }
    },
  });

  // Add footers to the PDF
  addFooters(doc);

  // Save the PDF file with the specified title and current date
  doc.save(title + newdate + ".pdf");

  // Open the PDF in a new window
  doc.output("dataurlnewwindow");
};

export default Pdf;
