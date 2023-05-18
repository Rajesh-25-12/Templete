export const DELETE_SUCCESS = "Data deleted Successfully!";
export const SAVE_SUCCESS = "Data saved Successfully!";
export const FAILURE = "Facing some issue in system. please try again!";
export const CONFLICT = "Data is Already Exists!";
export const TIME_OUT = 2000;
export const VEHICLE=[
    { 
        field: "asset_identifier",
        headerName: "Vehicle Reg Number",
        headerCheckboxSelection:true,
        headerCheckboxSelectionFilteredOnly:true,
        checkboxSelection: true
    },
    { 
        field: "asset_identifier",
        headerName: "Vehicle Name",
    },{ 
        field: "asset_attributes.RCExpdate",
        headerName: "RC Valid Date",
    },{ 
        field: "asset_attributes.FCExpdate",
        headerName: "FC Exp Date",
    },{ 
        field: "asset_attributes.Emissionexpdate",
        headerName: "Emission exp date",
    },{ 
        field: "asset_attributes.Insuexpdate",
        headerName: "Insurance Exp Date",
    },
]
export const USER=["Name","Mobile","Role"]
export const ROUTE=["Route Number","Route Name"]
export const SCHOOL=["School Name"]
