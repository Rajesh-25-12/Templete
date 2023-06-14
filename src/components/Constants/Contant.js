import moment from "moment-timezone";
export const DELETE_SUCCESS = "Data deleted Successfully!";
export const SAVE_SUCCESS = "Data saved Successfully!";
export const FAILURE = "Facing some issue in system. please try again!";
export const CONFLICT = "Data is Already Exists!";
export const TIME_OUT = 2000;
export const Vehiclecolumn = [
  {
    header: "Vehicle Reg Number",
    dataKey: "asset_identifier",
  },
  {
    header: "Vehicle Mfr",
    dataKey: "title",
  },
  {
    header: "Engine No",
    dataKey: "EngineNo",
  },
  {
    header: "Chassis No",
    dataKey: "Chassisno",
  },
  {
    header: "RC No",
    dataKey: "RCno",
  },
  {
    header: "FC No",
    dataKey: "FCno",
  },
  {
    header: "Tax Recepit No",
    dataKey: "TaxNo",
  },
  {
    header: "Permit No",
    dataKey: "PermitNo",
  },
  {
    header: "Seat Capacity",
    dataKey: "SeatCapacity",
  },
  {
    header: "Fuel Tank Capacity",
    dataKey: "FuelCapacity",
  },
  {
    header: "Fuel Type",
    dataKey: "FuelType",
  },
  {
    header: "Speed Limit",
    dataKey: "over_speed",
  },
  {
    header: "Seat Capacity",
    dataKey: "SeatCapacity",
  },
  {
    header: "RC Valid Upto",
    dataKey: "RCExpdate",
  },
  {
    header: "FC Valid Upto",
    dataKey: "FCExpdate",
  },
  {
    header: "Emission Valid Upto",
    dataKey: "Emissionexpdate",
  },
  {
    header: "Insurance Valid Upto",
    dataKey: "Insuexpdate",
  },
  {
    header: "Tax Expiry Date",
    dataKey: "Taxexpirydate",
  },
  {
    header: "Permit Expiry Date",
    dataKey: "Permitexpirydate",
  },
];
export const VEHICLE = [
  {
    field: "asset_identifier",
    headerName: "Vehicle Reg Number",
    headerCheckboxSelection: true,
    headerCheckboxSelectionFilteredOnly: true,
    checkboxSelection: true,
  },
  {
    field: "title",
    headerName: "Vehicle Name",
  },
  {
    field: "RCExpdate",
    headerName: "RC Valid Date",
    cellRenderer: (data) => {
      if (data.value === undefined || null) {
        return "";
      }
      return moment.utc(data.value).local().format("DD-MMM-YYYY");
    },
    filter: "agDateColumnFilter",
    filterParams: {
      buttons: ["reset"],
      closeOnReset: true,
      comparator: function (filterLocalDateAtMidnight, cellValue) {
        var cellDate = new Date(cellValue);
        // Extract the year, month, and day from the cell value
        var cellYear = cellDate.getFullYear();
        var cellMonth = cellDate.getMonth();
        var cellDay = cellDate.getDate();

        // Extract the year, month, and day from the filter date
        var filterYear = filterLocalDateAtMidnight.getFullYear();
        var filterMonth = filterLocalDateAtMidnight.getMonth();
        var filterDay = filterLocalDateAtMidnight.getDate();

        // Compare the dates
        if (cellYear < filterYear) {
          return -1;
        } else if (cellYear > filterYear) {
          return 1;
        } else if (cellMonth < filterMonth) {
          return -1;
        } else if (cellMonth > filterMonth) {
          return 1;
        } else if (cellDay < filterDay) {
          return -1;
        } else if (cellDay > filterDay) {
          return 1;
        } else {
          return 0;
        }
      },
      dateFormat: "yyyy-mm-dd hh:mm:ss",
    },
  },
  {
    field: "FCExpdate",
    headerName: "FC Exp Date",
    cellRenderer: (data) => {
      if (data.value === undefined || null) {
        return "";
      }
      return moment.utc(data.value).local().format("DD-MMM-YYYY");
    },
    filter: "agDateColumnFilter",
    filterParams: {
      buttons: ["reset"],
      closeOnReset: true,
      comparator: function (filterLocalDateAtMidnight, cellValue) {
        var cellDate = new Date(cellValue);
        // Extract the year, month, and day from the cell value
        var cellYear = cellDate.getFullYear();
        var cellMonth = cellDate.getMonth();
        var cellDay = cellDate.getDate();

        // Extract the year, month, and day from the filter date
        var filterYear = filterLocalDateAtMidnight.getFullYear();
        var filterMonth = filterLocalDateAtMidnight.getMonth();
        var filterDay = filterLocalDateAtMidnight.getDate();

        // Compare the dates
        if (cellYear < filterYear) {
          return -1;
        } else if (cellYear > filterYear) {
          return 1;
        } else if (cellMonth < filterMonth) {
          return -1;
        } else if (cellMonth > filterMonth) {
          return 1;
        } else if (cellDay < filterDay) {
          return -1;
        } else if (cellDay > filterDay) {
          return 1;
        } else {
          return 0;
        }
      },
      dateFormat: "yyyy-mm-dd hh:mm:ss",
    },
  },
  {
    field: "Emissionexpdate",
    headerName: "Emission exp date",
    cellRenderer: (data) => {
      if (data.value === undefined || null) {
        return "";
      }
      return moment.utc(data.value).local().format("DD-MMM-YYYY");
    },
    filter: "agDateColumnFilter",
    filterParams: {
      buttons: ["reset"],
      closeOnReset: true,
      comparator: function (filterLocalDateAtMidnight, cellValue) {
        var cellDate = new Date(cellValue);
        // Extract the year, month, and day from the cell value
        var cellYear = cellDate.getFullYear();
        var cellMonth = cellDate.getMonth();
        var cellDay = cellDate.getDate();

        // Extract the year, month, and day from the filter date
        var filterYear = filterLocalDateAtMidnight.getFullYear();
        var filterMonth = filterLocalDateAtMidnight.getMonth();
        var filterDay = filterLocalDateAtMidnight.getDate();

        // Compare the dates
        if (cellYear < filterYear) {
          return -1;
        } else if (cellYear > filterYear) {
          return 1;
        } else if (cellMonth < filterMonth) {
          return -1;
        } else if (cellMonth > filterMonth) {
          return 1;
        } else if (cellDay < filterDay) {
          return -1;
        } else if (cellDay > filterDay) {
          return 1;
        } else {
          return 0;
        }
      },
      dateFormat: "yyyy-mm-dd hh:mm:ss",
    },
  },
  {
    field: "Insuexpdate",
    headerName: "Insurance Exp Date",
    cellRenderer: (data) => {
      if (data.value === undefined || null) {
        return "";
      }
      return moment.utc(data.value).local().format("DD-MMM-YYYY");
    },
    filter: "agDateColumnFilter",
    filterParams: {
      buttons: ["reset"],
      closeOnClear: true,
      clearButton: true,

      comparator: function (filterLocalDateAtMidnight, cellValue) {
        var cellDate = new Date(cellValue);
        // Extract the year, month, and day from the cell value
        var cellYear = cellDate.getFullYear();
        var cellMonth = cellDate.getMonth();
        var cellDay = cellDate.getDate();

        // Extract the year, month, and day from the filter date
        var filterYear = filterLocalDateAtMidnight.getFullYear();
        var filterMonth = filterLocalDateAtMidnight.getMonth();
        var filterDay = filterLocalDateAtMidnight.getDate();

        // Compare the dates
        if (cellYear < filterYear) {
          return -1;
        } else if (cellYear > filterYear) {
          return 1;
        } else if (cellMonth < filterMonth) {
          return -1;
        } else if (cellMonth > filterMonth) {
          return 1;
        } else if (cellDay < filterDay) {
          return -1;
        } else if (cellDay > filterDay) {
          return 1;
        } else {
          return 0;
        }
      },
      dateFormat: "yyyy-mm-dd hh:mm:ss",
    },
  },
  {
    field: "Taxexpirydate",
    headerName: "Tax Exp Date",
    cellRenderer: (data) => {
      if (data.value === undefined || null) {
        return "";
      }
      return moment.utc(data.value).local().format("DD-MMM-YYYY");
    },
    filter: "agDateColumnFilter",
    filterParams: {
      buttons: ["reset"],
      closeOnClear: true,
      clearButton: true,

      comparator: function (filterLocalDateAtMidnight, cellValue) {
        var cellDate = new Date(cellValue);
        // Extract the year, month, and day from the cell value
        var cellYear = cellDate.getFullYear();
        var cellMonth = cellDate.getMonth();
        var cellDay = cellDate.getDate();

        // Extract the year, month, and day from the filter date
        var filterYear = filterLocalDateAtMidnight.getFullYear();
        var filterMonth = filterLocalDateAtMidnight.getMonth();
        var filterDay = filterLocalDateAtMidnight.getDate();

        // Compare the dates
        if (cellYear < filterYear) {
          return -1;
        } else if (cellYear > filterYear) {
          return 1;
        } else if (cellMonth < filterMonth) {
          return -1;
        } else if (cellMonth > filterMonth) {
          return 1;
        } else if (cellDay < filterDay) {
          return -1;
        } else if (cellDay > filterDay) {
          return 1;
        } else {
          return 0;
        }
      },
      dateFormat: "yyyy-mm-dd hh:mm:ss",
    },
  },
  {
    field: "Permitexpirydate",
    headerName: "Permit Exp Date",
    cellRenderer: (data) => {
      if (data.value === undefined || null) {
        return "";
      }
      return moment.utc(data.value).local().format("DD-MMM-YYYY");
    },
    filter: "agDateColumnFilter",
    filterParams: {
      buttons: ["reset"],
      closeOnClear: true,
      clearButton: true,

      comparator: function (filterLocalDateAtMidnight, cellValue) {
        var cellDate = new Date(cellValue);
        // Extract the year, month, and day from the cell value
        var cellYear = cellDate.getFullYear();
        var cellMonth = cellDate.getMonth();
        var cellDay = cellDate.getDate();

        // Extract the year, month, and day from the filter date
        var filterYear = filterLocalDateAtMidnight.getFullYear();
        var filterMonth = filterLocalDateAtMidnight.getMonth();
        var filterDay = filterLocalDateAtMidnight.getDate();

        // Compare the dates
        if (cellYear < filterYear) {
          return -1;
        } else if (cellYear > filterYear) {
          return 1;
        } else if (cellMonth < filterMonth) {
          return -1;
        } else if (cellMonth > filterMonth) {
          return 1;
        } else if (cellDay < filterDay) {
          return -1;
        } else if (cellDay > filterDay) {
          return 1;
        } else {
          return 0;
        }
      },
      dateFormat: "yyyy-mm-dd hh:mm:ss",
    },
  },
];
export const Route = [
  {
    field: "route_name",
    headerName: "Route Number",
    width: 150,
  },
  {
    field: "is_active",
    headerName: "Active",
    width: 130,
    valueFormatter: (params) => {
      return params.value === true ? "Yes" : "No";
    },
  },
];
export const CALAENDER = [
  {
    field: "title",
    headerName: "Title",
    width: 150,
  },
  {
    field: "description",
    headerName: "Description",
    width: 130,
  },
  {
    field: "start_date",
    headerName: "Start Date",
    width: 130,
    valueFormatter: (params) => {
      if (params.value) {
        return moment.utc(params.value).local().format("DD-MMM-YYYY");
      } else {
        return "";
      }
    },
    cellRenderer: (data) => {
      if (data.value === undefined || null) {
        return "";
      }
      return moment.utc(data.value).local().format("DD-MMM-YYYY");
    },
    filter: "agDateColumnFilter",
    filterParams: {
      buttons: ["reset"],
      closeOnReset: true,
      comparator: function (filterLocalDateAtMidnight, cellValue) {
        var cellDate = new Date(cellValue);
        // Extract the year, month, and day from the cell value
        var cellYear = cellDate.getFullYear();
        var cellMonth = cellDate.getMonth();
        var cellDay = cellDate.getDate();

        // Extract the year, month, and day from the filter date
        var filterYear = filterLocalDateAtMidnight.getFullYear();
        var filterMonth = filterLocalDateAtMidnight.getMonth();
        var filterDay = filterLocalDateAtMidnight.getDate();

        // Compare the dates
        if (cellYear < filterYear) {
          return -1;
        } else if (cellYear > filterYear) {
          return 1;
        } else if (cellMonth < filterMonth) {
          return -1;
        } else if (cellMonth > filterMonth) {
          return 1;
        } else if (cellDay < filterDay) {
          return -1;
        } else if (cellDay > filterDay) {
          return 1;
        } else {
          return 0;
        }
      },
      dateFormat: "yyyy-mm-dd hh:mm:ss",
    },
  },
  {
    field: "end_date",
    headerName: "End Date",
    width: 130,

    cellRenderer: (data) => {
      if (data.value === null) {
        return "";
      } else {
        return moment.utc(data.value).local().format("DD-MMM-YYYY");
      }
    },
    filter: "agDateColumnFilter",
    filterParams: {
      buttons: ["reset"],
      closeOnReset: true,
      comparator: function (filterLocalDateAtMidnight, cellValue) {
        var cellDate = new Date(cellValue);
        // Extract the year, month, and day from the cell value
        var cellYear = cellDate.getFullYear();
        var cellMonth = cellDate.getMonth();
        var cellDay = cellDate.getDate();

        // Extract the year, month, and day from the filter date
        var filterYear = filterLocalDateAtMidnight.getFullYear();
        var filterMonth = filterLocalDateAtMidnight.getMonth();
        var filterDay = filterLocalDateAtMidnight.getDate();

        // Compare the dates
        if (cellYear < filterYear) {
          return -1;
        } else if (cellYear > filterYear) {
          return 1;
        } else if (cellMonth < filterMonth) {
          return -1;
        } else if (cellMonth > filterMonth) {
          return 1;
        } else if (cellDay < filterDay) {
          return -1;
        } else if (cellDay > filterDay) {
          return 1;
        } else {
          return 0;
        }
      },
      dateFormat: "yyyy-mm-dd hh:mm:ss",
    },
  },
  {
    field: "recurring_type",
    headerName: "Recurring Type",
    width: 150,
    valueFormatter: (params) => {
      if (params.value === "week") {
        return "Weekly";
      } else if (params.value === "month") {
        return "Monthly";
      } else if (params.value === "year") {
        return "Yearly";
      } else {
        return "";
      }
    },
  },
  {
    field: "day_type",
    headerName: "Day Type",
    width: 130,
  },
  {
    field: "config_type",
    headerName: "Config Type",
    width: 180,
  },
];
export const USER = [
  {
    field: "username",
    headerName: "Name",
    headerCheckboxSelection: true,
    headerCheckboxSelectionFilteredOnly: true,
    checkboxSelection: true,
  },
  {
    field: "mobilenumber",
    headerName: "Mobile Number",
  },
  {
    field: "user_roles",
    headerName: "Roles",
  },
];
export const ROUTE = ["Route Number", "Route Name"];
export const SCHOOL = ["School Name"];
export const PARENT = ["Vehicle", "School"];
export const Users = ["School"];
export const Schools = [
  "Vehicle",
  "Driver",
  "Helper",
  "Supervisor",
  "Conductor",
];
export const Routes = ["Vehicle"];
export const Vehicles = [
  "Driver",
  "Helper",
  "Supervisor",
  "Conductor",
  "Route",
];
export const Site = (Siteid, masterData, id, value) => {
  if (masterData) {
    let customerList = masterData.filter(
      (ele) => parseInt(ele.ipss_asset_id) === parseInt(Siteid)
    );
    return customerList.length > 0 ? customerList[0].title : Siteid;
  }
};
export const Excels = [
  "Vehicle Reg Number",
  "Vehicle Mfr",
  "Engine No",
  "Speed Limit",
  " Chassis No",
  " RC No",
  "FC No",
  "Tax Recepit No",
  "Permit No",
  "Seat Capacity",
  "Fuel Tank Capacity",
  " Fuel Type",
  "Seat Capacity",
  "RC Valid Upto",
  " FC Valid Upto",
  " Emission Valid Upto",
  "Insurance Valid Upto",
  " Tax Expiry Date",
  "Permit Expiry Date  ",
];
export const Days = ["First", "Second", "Third", "Fourth", "Last"];

export const Weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
