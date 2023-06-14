import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// Imports from Mui
import {
  Typography,
  CardContent,
  Card,
  List,
  ListItemButton,
  ListItemText,
  Snackbar,
  Alert,
  Box,
  Grid,
  Divider,
  Toolbar,
  AppBar
} from "@mui/material";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
// Mui icons
import AddBoxRoundedIcon from "@material-ui/icons/AddBoxRounded";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DownloadIcon from "@mui/icons-material/Download";
import { FcDataConfiguration } from "react-icons/fc";
// Axios service
import { liveApi } from "../../service/Service";
// Custom Hook components Imports
import AgGrid from "../Components/AGgrid";
import Pdf from "../Components/Pdf";
import Excel from "../Components/Excel";
// Constants import
import {
  VEHICLE,
  USER,
  Vehiclecolumn,
  Site,
  SCHOOL,
  TIME_OUT,
  Excels,
  FAILURE,
  DELETE_SUCCESS,
  CALAENDER,
  Route
} from "../Constants/Contant";
// Popup imports
import Alertpopup from "../Components/Alert";
import Calaender from "../Popups/Calaender";
// Import Css
import "../Css/ag.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
/*Function Initialization */
let gridApi;
const Assets = () => {
  //History for navigation
  const history = useHistory();
  //Api functions form import
  const liveapi = liveApi();
  //side navigation date
  const Data = ["Vehicle", "Route", "Assign", "Calendar"];
  // sidebar navigation index
  const [selectedIndex, setSelectedIndex] = useState(0);
  // sidebar navigation data state
  const [Selecteddata, setSelecteddata] = useState("Vehicle");
  // AG grid Data state
  const [AGData, setAGData] = useState([]);
  // AG grid Column state
  const [AgColumnData, setAgColumnData] = useState([]);
  // AG grid selected data state
  const [AgSelectData, setAgSelectData] = useState([]);
  // Snackbar states
  const [success, setSuccess] = useState("");
  const [failure, setFailure] = useState("");
  // Calander popup state
  const [open, setOpen] = useState(false);
  // Alert popup state
  const [open2, setOpen2] = useState(false);
  // Alert popup data state
  const [popupdata, setPopupdata] = useState();
  const [popupdata1, setPopupdata1] = useState();
  // School Data state
  const [School, setSchool] = useState([]);
  // Menu popup state for Download button
  const [Download, setDownload] = useState(null);
  // AG grid Filtering state
  const [rowData3, setRowdata3] = useState([]);
  // Calander Edit state
  const [CalaenderData, setCalaenderData] = useState([]);
  // Calendar Form Values state
  const [FormValue, setFormValue] = useState([]);
  // Download button menu state change function
  const handleChange = () => {
    setDownload("g");
  };
  // Excel function
  const Closed = () => {
    setDownload(null);
    Excel(rowData3, AGData, "Vehicle", Excels);
  };
  const Gh = () => {
    setDownload(null);
  };
  // Alert popup close function
  const handleClose = () => {
    setOpen2(false);
    setPopupdata1();
  };
  // Alert popup Allow function
  const allow = () => {
    setOpen2(false);
    Delete();
    setPopupdata1();
  };
  // Grid function
  const onGridReady = (params) => {
    gridApi = params.api;
  };
  // Function to fetch form values
  const Values = () => {
    liveapi
      .get("/school-app/calendar/form-values/")
      .then((res) => {
        setFormValue(res.data);
      })
      .catch((err) => {
        console.log("req error", err);
      });
  };
  // Function to fetch Vehicle datas
  const Vehicledetails = () => {
    liveapi
      .get("/school-app/assets/?asset_type=Vehicle&results_per_page=1000")
      .then((res) => {
        setAGData(res.data.results);
      })
      .catch((err) => {
        console.log("req error", err);
      });
  };
  // Function to fetch School datas
  const GetSchool = () => {
    liveapi
      .get("/school-app/assets/?asset_type=Site")
      .then((res) => {
        setSchool(res.data.results);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  // Function to fetch User datas
  const Userdetails = () => {
    liveapi
      .get("/users/")
      .then((res) => {
        for (let i = 0; i < res.data.results.length; i++) {
          res.data.results[i].user_roles = res.data.results[i].user_roles[0];
        }
        setAGData(res.data.results);
      })
      .catch((err) => {
        console.log("req error", err);
      });
  };
  // Function to fetch Route datas
  const Routedetails = () => {
    liveapi
      .get("/school-app/route/")
      .then((res) => {
        setAGData(res.data.results);
      })
      .catch((err) => {
        console.log("req error", err);
      });
  };
  // Function to fetch Calandar datas
  const CalaenderGet = () => {
    liveapi
      .get("/school-app/calendar/")
      .then((res) => {
        setAGData(res.data.data);
      })
      .catch((err) => {
        console.log("req error", err);
      });
  };
  // Function for Sidebar change event
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    setSelecteddata(event);
    if (event === "Vehicle") {
      setAgColumnData(VEHICLE);
      Vehicledetails();
    }
    if (event === "Route") {
      let data = [];
      data.push({
        field: "site_id",
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
        headerName: "School Name",
        valueFormatter: (params) => {
          return Site(params.value, School, "ipss_asset_id", "asset_type");
        },
      });
      for (let i = 0; i < Route.length; i++) {
        data.push(Route[i]);
      }
      setAgColumnData(data);
      Routedetails();
    }
    if (event === "Calendar") {
      let data = [];
      data.push({
        field: "school_id",
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
        width: 150,
        headerName: "School Name",
        valueFormatter: (params) => {
          return Site(params.value, School, "ipss_asset_id", "asset_type");
        },
      });
      for (let i = 0; i < CALAENDER.length; i++) {
        data.push(CALAENDER[i]);
      }
      setAgColumnData(data);
      CalaenderGet();
    }
    if (event === "User") {
      setAgColumnData(USER);
      Userdetails();
    }
    if (event === "School") {
      Agcolumndata(SCHOOL);
    }
    if (event === "Assign") {
      history.push("/assets/configure");
    }
  };
  // AG Grid Data change function
  const Agcolumndata = (props) => {
    let columndata = [];
    for (let i = 0; i < props.length; i++) {
      columndata.push({
        wrapText: true,
        field: props[i],
        headerName: props[i].charAt(0).toUpperCase() + props[i].slice(1),
      });
    }
    setAgColumnData(columndata);
  };
  // Add Function
  const Add = (event) => {
    if (event === "Vehicle") {
      history.push("/assets/vehicle/add");
    }
    if (event === "Route") {
      history.push("/assets/route/add");
    }
    if (event === "User") {
      setOpen(true);
    }
    if (event === "Calendar") {
      setOpen(true);
    }
  };
  // Edit Function
  const Edit = (event) => {
    const selectedRows = gridApi.selectionService.getSelectedRows();
    setAgSelectData(selectedRows);
    if (selectedRows === undefined || selectedRows.length === 0) {
      setOpen2(true);
      setPopupdata("No Field is selected,Please select one field");
    } else if (selectedRows.length > 1) {
      setOpen2(true);
      setPopupdata("More Than One Field Is Selected ,Please Select One Field");
    } else {
      if (event === "Vehicle") {
        history.push(`/assets/vehicle/edit/${selectedRows[0].ipss_asset_id}`);
      }
      if (event === "Route") {
        history.push(`/assets/route/edit/${selectedRows[0].gps_route_id}`);
      }
      if (event === "Calendar") {
        setOpen(true);
        setCalaenderData(selectedRows[0]);
      }
    }
  };
  //AG grid Filtered Data
  const onFilterChanged = (event) => {
    getAllRows(event.api);
  };
  // AG grid Filtered Data functions
  const getAllRows = () => {
    let filterData = [];
    gridApi.forEachNodeAfterFilter((node) => {
      filterData.push(node.data);
      setRowdata3(filterData);
    });
  };
  // PDF Function
  const Export = (event) => {
    Pdf(rowData3, AGData, Vehiclecolumn, "Vehicle");
    setDownload(null);
  };
  // Vehicle Delete function
  const Vehicledelete = (data) => {
    let numberOfDeletes = 0;
    data.forEach((row) => {
      const ipss_asset_id = row.ipss_asset_id;
      liveapi
        .delete(ipss_asset_id)
        .then((res) => {
          numberOfDeletes++;
          Vehicledetails();
          if (res.data.success) {
            setSuccess(DELETE_SUCCESS);
            setTimeout(() => {
              setSuccess("");
            }, TIME_OUT);
          } else {
            setFailure(FAILURE);
            setTimeout(() => {
              setFailure("");
            }, TIME_OUT);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };
  // Main Delete function
  const Delete = (event) => {
    const selectedRows = gridApi.selectionService.getSelectedRows();
    setAgSelectData(selectedRows);
    if (selectedRows === undefined || selectedRows.length === 0) {
      setOpen2(true);
      setPopupdata("No Field is selected,Please select one field");
    } else if (selectedRows.length > 1) {
      setOpen2(true);
      setPopupdata("More Than One Field Is Selected ,Please Select One Field");
    } else {
      if (event === "Vehicle") {
        Vehicledelete(selectedRows);
      }
    }
  };
  // Calander Close function
  const Close = () => {
    setOpen(false);
  };
  // fetch function
  useEffect(() => {
    setAgColumnData(VEHICLE);
    Vehicledetails();
    GetSchool();
    Values();
  }, []);
  // Menu icon button for Sidebar mui
  var element = document.querySelectorAll('style[data-meta="MuiAppBar"]');
  if (element) {
    if (element.length > 1) {
      element[0].parentNode.removeChild(element[1]);
    }
  }
  // User Role Configurations
  let RoleData = [];
  let Role = [
    "GaVehicleConfig",
    "GaRouteConfig",
    "GaAssignAssets",
    "GaCalendarConfig",
  ];
  for (let i = 0; i < Role.length; i++) {
    // Get the Role permissions form localstorage
    let Get = localStorage.getItem(Role[i]);
    if (Get !== null || undefined) {
      RoleData.push(Data[i]);
    }
  }
  // Check the role permissions based on sidebar data
  var Roledata = "";
  if (Selecteddata === "Vehicle") {
    Roledata = "GaVehicleConfig";
  }
  if (Selecteddata === "Route") {
    Roledata = "GaRouteConfig";
  }
  if (Selecteddata === "Assign") {
    Roledata = "GaAssignAssets";
  }
  if (Selecteddata === "Calendar") {
    Roledata = "GaCalendarConfig";
  }
  const Permissons = localStorage.getItem(Roledata);
  return (
    <div
      className="ag-theme-alpine"
      style={{
        height: "80vh",
        marginLeft: 25,
        marginRight: 25,
        marginTop: 15,
      }}
    >
      <Grid container spacing={2} style={{ height: "100%" }}>
        {/* Sidebar Grid */}
        <Grid
          item
          xs={2}
          style={{ height: "100%", overflow: "auto", marginTop: "45px" }}
        >
          <Card style={{ height: "100%" }}>
            <CardContent style={{ height: "100%", overflow: "auto" }}>
              <div
                style={{
                  display: "flex",
                  backgroundColor: "#a9d08e",
                  padding: "2px",
                  gap: "5px",
                }}
              >
                <FcDataConfiguration style={{ fontSize: "35px" }} />
                <Typography style={{ marginTop: "7px" }}>
                  &nbsp;Configure
                </Typography>
              </div>

              <Divider style={{ marginTop: 6, marginBottom: 6 }} />
              <Box className="site_lst">
                <List component="nav" aria-label="secondary mailbox folder">
                  {RoleData.map((data, idx) => (
                    <ListItemButton
                      key={data}
                      selected={selectedIndex === idx}
                      onClick={(event) => handleListItemClick(data, idx)}
                      style={{
                        backgroundColor:
                          selectedIndex === idx ? "#e0e0e0" : "transparent",
                      }}
                    >
                      <ListItemText primary={data} />
                    </ListItemButton>
                  ))}
                </List>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={10} style={{ height: "100%" }}>
          {/* Button Toolbar */}
          <AppBar position="static" class="gridappbar">
            <Toolbar>
              <Grid style={{ marginRight: "0", marginLeft: "auto" }}>
                {Permissons?.includes("add") && (
                  <div class="tooltip">
                    <Button varient="text" onClick={() => Add(Selecteddata)}>
                      <AddBoxRoundedIcon className="color" />
                    </Button>
                    <span class="tooltiptext">Add</span>
                  </div>
                )}
                {Permissons?.includes("edit") && (
                  <div class="tooltip">
                    <Button
                      varient="text"
                      className="n_btn"
                      onClick={() => Edit(Selecteddata)}
                    >
                      <EditRoundedIcon className="color" />
                    </Button>
                    <span class="tooltiptext">Edit </span>
                  </div>
                )}
                {Permissons?.includes("export") && (
                  <div class="tooltip">
                    <Button
                      variant="text"
                      className="n_btn"
                      onClick={handleChange}
                    >
                      <DownloadIcon className="color" />
                    </Button>
                    <span class="tooltiptext">Download</span>
                  </div>
                )}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Menu
                    anchorEl={Download}
                    id="account-menu"
                    open={Boolean(Download)}
                    onClose={Gh}
                    onClick={handleChange}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&:before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "top" }}
                    style={{ marginTop: "7%", marginLeft: "-3%" }}
                  >
                    <MenuItem onClick={Export}>PDF</MenuItem>
                    <MenuItem onClick={Closed}>Excel</MenuItem>
                  </Menu>
                </Box>
              </Grid>
            </Toolbar>
          </AppBar>
          {/* Ag Grid Component */}
          <div style={{ width: "100%", height: "100%" }}>
            <AgGrid
              AGData={AGData}
              AgColumnData={AgColumnData}
              onGridReady={onGridReady}
              rowSelection="single"
              onFilterChanged={onFilterChanged}
            />
          </div>
          {/* Calander Component */}
          <Calaender
            open={open}
            Close={Close}
            Editdata={CalaenderData}
            FormValue={FormValue}
            School={School}
          />
          {/* Popup Component */}
          <Alertpopup
            open={open2}
            close={handleClose}
            allow={allow}
            data={popupdata}
            data1={popupdata1}
          />
          {/* Snackbars */}
          <Snackbar open={Boolean(success)}>
            <Alert severity="success">{success}</Alert>
          </Snackbar>
          <Snackbar open={Boolean(failure)}>
            <Alert severity="error">{failure}</Alert>
          </Snackbar>
        </Grid>
      </Grid>
    </div>
  );
};
export default Assets;
