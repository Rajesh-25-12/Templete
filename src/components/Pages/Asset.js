import React, { useState, useEffect, useRef } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Box, Grid, Divider } from "@material-ui/core";
import Button from "@mui/material/Button";
import LanIcon from "@mui/icons-material/Lan";
import AddBoxRoundedIcon from "@material-ui/icons/AddBoxRounded";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import DownloadIcon from "@mui/icons-material/Download";
import { getApi, liveApi } from "../../service/Service";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@material-ui/lab/Alert";
import Home from "../Loader/loader";
import { useHistory } from "react-router-dom";
import { FcDataConfiguration } from "react-icons/fc";
import Grid from "../Components/AGGrid";
import {
  VEHICLE,
  USER,
  ROUTE,
  SCHOOL,
  TIME_OUT,
  SAVE_SUCCESS,
  FAILURE,
  DELETE_SUCCESS,
} from "../Constants/Contant";
import Alertpopup from "../Components/Alert";
import {
  Typography,
  CardContent,
  Card,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import User from "../Popups/User";
import "../Css/ag.css";
/*Function Initialization */
let gridApi;

const Assets = () => {
  const history = useHistory();
  const liveapi = liveApi();
  const Data = ["Vehicle", "Route", "User", "Asset"];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [Selecteddata, setSelecteddata] = useState("Vehicle");
  const [AGData, setAGData] = useState([]);
  const [AgColumnData, setAgColumnData] = useState([]);
  const [AgSelectData, setAgSelectData] = useState([]);
  const [success, setSuccess] = useState("");
  const [failure, setFailure] = useState("");
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [popupdata, setPopupdata] = useState();
  const [popupdata1, setPopupdata1] = useState();
  const handleClose = () => {
    setOpen2(false);
    setPopupdata1();
  };
  const allow = (props) => {
    setOpen2(false);
    Delete();
    setPopupdata1();
  };
  const onGridReady = (params) => {
    gridApi = params.api;
  };
  const Vehicledetails = () => {
    liveapi
      .get("/school-app/assets/")
      .then((res) => {
        setAGData(res.data.results);
      })
      .catch((err) => {
        console.log("req error", err);
      });
  };
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    setSelecteddata(event);
    if (event === "Vehicle") {
      setAgColumnData(VEHICLE);
      Vehicledetails();
    }
    if (event === "Route") {
      Agcolumndata(ROUTE);
    }
    if (event === "User") {
      Agcolumndata(USER);
    }
    if (event === "School") {
      Agcolumndata(SCHOOL);
    }
    if (event === "Asset") {
      history.push("/assets/configure");
    }
  };
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
  };
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
    }
  };
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
  const Close = () => {
    setOpen(false);
  };
  useEffect(() => {
    setAgColumnData(VEHICLE);
    Vehicledetails();
  }, []);
  console.log(Boolean(AgSelectData.length !== 0));
  return (
    <div
      className="ag-theme-alpine"
      style={{
        height: "70vh",
        marginLeft: 25,
        marginRight: 25,
        marginTop: 15,
      }}
    >
      <Grid container spacing={2} style={{ height: "100%" }}>
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
                  {Data.map((data, idx) => (
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
          <AppBar position="static" class="gridappbar">
            <Toolbar>
              <Grid style={{ marginRight: "0", marginLeft: "auto" }}>
                <div class="tooltip">
                  <Button varient="text" onClick={() => Add(Selecteddata)}>
                    <AddBoxRoundedIcon className="color" />
                  </Button>
                  <span class="tooltiptext">Add</span>
                </div>
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

                <div class="tooltip">
                  <Button
                    variant="text"
                    className="n_btn"
                    onClick={() => Delete(Selecteddata)}
                  >
                    <DeleteRoundedIcon className="color" />
                  </Button>
                  <span class="tooltiptext">Delete</span>
                </div>
              </Grid>
            </Toolbar>
          </AppBar>
          {Selecteddata !== "Route" && (
            <div style={{ width: "100%", height: "100%" }}>
              <Grid
                AGData={AGData}
                AgColumnData={AgColumnData}
                onGridReady={onGridReady}
                rowSelection="single"
              />
            </div>
          )}
          <User open={open} Close={Close} />
          <Alertpopup
            open={open2}
            close={handleClose}
            allow={allow}
            data={popupdata}
            data1={popupdata1}
          />
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
