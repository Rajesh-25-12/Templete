// React Hooks
import React, { useEffect, useState } from "react";
// Router Hooks
import { useHistory } from "react-router-dom";
// Mui Components
import {
  Alert,
  Button,
  Grid,
  Snackbar,
  AppBar,
  Toolbar,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Autocomplete from "@mui/material/Autocomplete";
import Select from "@mui/material/Select";
// Mui icons
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ReplayIcon from "@mui/icons-material/Replay";
// Constants
import {
  Schools,
  Users,
  Vehicles,
  Routes,
  FAILURE,
  TIME_OUT,
  PARENT,
} from "../Constants/Contant";
// Axios Component
import { liveApi } from "../../service/Service";
// Custom hook
import DynamicTransferList from "../Components/Transferlist";
/*Function Initialization */
const Configure = () => {
  const liveapi = liveApi();
  const history = useHistory();
  // Vehicle Data state
  const [Vehicle, setVehicle] = useState([]);
  // School Data state
  const [School, setSchool] = useState([]);
  // User Data state
  const [User, setUser] = useState([]);
  // Route Data state
  const [Route, setRoute] = useState([]);
  // Mapping Data states
  const [Mappingdata, setMappingdata] = useState([]);
  const [Mappingdata1, setMappingdata1] = useState([]);
  // Dynmaic Label states
  const [Label, setLabel] = useState([]);
  const [Label1, setLabel1] = useState([]);
  // 1st Autocomplete Value state
  const [Parentid, setParentid] = useState(null);
  // 2nd Autocomplte Value state
  const [Parentid1, setParentid1] = useState(null);
  // Transferlist Leftside Data state
  const [List, setList] = useState([]);
  // Transferlist Label state
  const [Listlabel, setListlabel] = useState("");
  // Transferlist Rightside Data state
  const [RightData, setRightData] = useState([]);
  // 1 st Autocomplete Onchange state
  const [Parent, setParent] = useState("");
  // 2nd Autocomplte Onchange state
  const [Children, setChildren] = useState("");
  // Snackbar states
  const [success, setSuccess] = useState("");
  const [failure, setFailure] = useState("");
  // 2nd Autocomplete Options Value state
  const [ChildrenData, setChildrenData] = useState([]);
  const Data = [];
  Data.push("Vehicle", "School");
  // Function to fetch Vehicle datas
  const Vehicledata = () => {
    liveapi
      .get("/school-app/assets/?asset_type=Vehicle&results_per_page=1000")
      .then((res) => {
        setVehicle(res.data.results);
      })
      .catch((res) => {
        console.log("err");
      });
  };
  // Function to fetch School datas
  const Schooldata = () => {
    liveapi
      .get("/school-app/assets/?asset_type=Site")
      .then((res) => {
        setSchool(res.data.results);
      })
      .catch((res) => {
        console.log("err");
      });
  };
  // Function to fetch Route datas
  const Routedata = () => {
    liveapi
      .get("school-app/assets/asset-mapping/vehicle-routes/")
      .then((res) => {
        setRoute(res.data.data);
      })
      .catch((res) => {
        console.log("err");
      });
  };
  // Function to fetch User datas
  const Userdata = () => {
    liveapi
      .get("/school-app/assets/")
      .then((res) => {
        setUser(res.data.results);
      })
      .catch((res) => {
        console.log("err");
      });
  };
  useEffect(() => {
    Vehicledata();
    Schooldata();
    Routedata();
    Userdata();
  }, []);
  // 1st Autocomplete Onchange function
  const handleChange = (event) => {
    const data = event.target.value;
    if (data === "Vehicle") {
      setMappingdata(Vehicle);
      setLabel("asset_identifier");
      setChildren("");
      setRightData([]);
      setParentid(null);
      setList([]);
      setChildrenData(Vehicles);
    }
    if (data === "School") {
      setMappingdata(School);
      setLabel("title");
      setChildren("");
      setParentid(null);
      setList([]);
      setRightData([]);
      setChildrenData(Schools);
    }
    if (data === "Route") {
      setMappingdata(Route);
      setLabel("route_name");
      setChildren("");
      setParentid(null);
      setList([]);
      setRightData([]);
      setChildrenData(Routes);
    }
    if (data !== "Route" && data !== "School" && data !== "Vehicle") {
      setMappingdata(User.filter((o) => o.asset_type === data));
      setLabel("title");
      setChildren("");
      setParentid(null);
      setList([]);
      setRightData([]);
      setChildrenData(Users);
    }
    setParent(event.target.value);
  };
  // 2nd Autocomplte Onchange function
  const handleChange1 = (event) => {
    const data = event.target.value;
    setChildren(event.target.value);
    if (data === "Vehicle") {
      setListlabel("asset_identifier");
      setRightData(
        Vehicle.filter((o) => o.parent_id === Number(Parentid.ipss_asset_id))
      );
      setList(
        Vehicle.filter((o) => o.parent_id !== Number(Parentid.ipss_asset_id))
      );
    }
    if (data === "School") {
      setList(School);
      setListlabel("title");
    }
    if (data === "Route") {
      setListlabel("route_name");
      setList(
        Route.filter((o) => o.vehicle_id !== Number(Parentid.ipss_asset_id))
      );
      setRightData(
        Route.filter((o) => o.vehicle_id === Number(Parentid.ipss_asset_id))
      );
    }
    if (data !== "Route" && data !== "School" && data !== "Vehicle") {
      let Filter = User.filter((o) => o.asset_type === event.target.value);
      setListlabel("title");
      setList(
        Filter.filter((o) => o.parent_id !== Number(Parentid.ipss_asset_id))
      );
      setRightData(
        Filter.filter((o) => o.parent_id === Number(Parentid.ipss_asset_id))
      );
      let datas = Filter.find(
        (o) => o.parent_id === Number(Parentid.ipss_asset_id)
      );
      setParentid1(datas ? datas : null);
      setMappingdata1(Filter);
      setLabel1("title");
    }
  };
  // Transferlist onchange Function
  const li = (props) => {
    setRightData(props);
  };
  // Handle submit function
  const handleSubmit = () => {
    let asset = [];
    let assets1 = [
      {
        asset_id: Parentid1?.ipss_asset_id,
      },
    ];
    for (let i = 0; i < RightData.length; i++) {
      asset.push({
        asset_id: RightData[i].ipss_asset_id,
      });
    }

    let dataa1 = {
      parent_id: Parentid.ipss_asset_id,
      asset_type: Children,
      asset_ids: assets1,
    };
    let data = {
      parent_id: Parentid.ipss_asset_id,
      asset_type: Children,
      asset_ids: asset,
    };
    if (Parent === "School" && Children === "Vehicle") {
      VehicletoRoute();
    }
    if (Parent === "Vehicle" && Children === "Route") {
      SchooltoVehicle(data);
    }
    if (Parent === "School" && Children === "Driver") {
      SchooltoVehicle(data);
    }
    if (Parent === "School" && Children === "Helper") {
      SchooltoVehicle(data);
    }
    if (Parent === "School" && Children === "Supervisor") {
      SchooltoVehicle(data);
    }
    if (Parent === "School" && Children === "Conductor") {
      SchooltoVehicle(data);
    }
    if (Parent === "Vehicle" && Children === "Driver") {
      SchooltoVehicle(dataa1);
    }
    if (Parent === "Vehicle" && Children === "Helper") {
      SchooltoVehicle(dataa1);
    }
    if (Parent === "Vehicle" && Children === "Supervisor") {
      SchooltoVehicle(dataa1);
    }
    if (Parent === "Vehicle" && Children === "Conductor") {
      SchooltoVehicle(dataa1);
    }
  };
  // Assignment functions
  const SchooltoVehicle = (data) => {
    liveapi
      .post("/school-app/assets/asset-mapping/bulk-assignment/", data)
      .then((res) => {
        Rest(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const VehicletoRoute = () => {
    let asset = [];
    for (let i = 0; i < RightData.length; i++) {
      asset.push({
        route_id: RightData[i].gps_route_id,
      });
    }
    let data = {
      vehicle_id: Parentid.ipss_asset_id,
      route_ids: asset,
    };
    liveapi
      .post("/school-app/assets/asset-mapping/vehicle-routes/", data)
      .then((res) => {
        Rest(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const Vehicletouser = () => {
    liveapi
      .post("/school-app/assets/asset-mapping/user-assets/")
      .then((res) => Rest(res))
      .catch((err) => {
        console.log(err);
      });
  };
  // State Reset function
  const Refresh = () => {
    setParent("");
    setChildren("");
    setList([]);
    setRightData([]);
    Vehicledata();
    Schooldata();
    Routedata();
    Userdata();
    setParentid(null);
  };
  // Success or failure function
  const Rest = (res) => {
    if (res.data.success) {
      Refresh();
      setSuccess("SAVE_SUCCESS");
      setTimeout(() => {
        setSuccess("");
      }, TIME_OUT);
    } else {
      setFailure(FAILURE);
      setTimeout(() => {
        setFailure("");
      }, TIME_OUT);
    }
  };
  // Sidebar menu icon
  var element = document.querySelectorAll('style[data-meta="MuiAppBar"]');
  if (element) {
    if (element.length > 1) {
      element[0].parentNode.removeChild(element[1]);
    }
  }
  return (
    <div style={{ margin: "0 8vh" }}>
      <br />
      {/* Appbar */}
      {/* The app bar component */}
      <AppBar position="static" class="appbar">
        <Toolbar>
          <Box display="flex" flexGrow={1}>
            <Typography variant="h6">Vehicle</Typography>
          </Box>
          <Grid align="right">
            {/* Refresh button */}
            <div class="tooltip">
              <Button varient="text" className="n_btn" onClick={Refresh}>
                <ReplayIcon style={{ color: "#000" }} />
              </Button>
              <span class="tooltiptext">Reset </span>
            </div>
            {/* Go back button */}
            <div class="tooltip">
              <Button
                varient="text"
                className="n_btn"
                onClick={() => window.history.go(-1)}
              >
                <ArrowBackIcon style={{ color: "#000" }}></ArrowBackIcon>
              </Button>
              <span class="tooltiptext">Go Back </span>
            </div>
          </Grid>
        </Toolbar>
      </AppBar>
      <br />
      <Grid container gap={5}>
        <Grid item xs={2}>
          {/* Select dropdown */}
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Select</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={Parent}
              label="Select"
              onChange={handleChange}
            >
              {PARENT.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid xs={8}>
          {/* Autocomplete input */}
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            disableClearable
            options={Mappingdata}
            getOptionLabel={(option) => option[Label]}
            value={Parentid}
            onChange={(event, newValue) => {
              setParentid(newValue);
              if (Children === "Vehicle") {
                setListlabel("asset_identifier");
                setRightData(
                  Vehicle.filter(
                    (o) => o.parent_id === Number(newValue.ipss_asset_id)
                  )
                );
                setList(
                  Vehicle.filter(
                    (o) => o.parent_id !== Number(newValue.ipss_asset_id)
                  )
                );
              }
              if (Children === "School") {
                setList(School);
                setListlabel("title");
              }
              if (Children === "Route") {
                setListlabel("route_name");
                setList(
                  Route.filter(
                    (o) => o.vehicle_id !== Number(newValue.ipss_asset_id)
                  )
                );
                setRightData(
                  Route.filter(
                    (o) => o.vehicle_id === Number(newValue.ipss_asset_id)
                  )
                );
              }
              if (
                Children !== "Route" &&
                Children !== "School" &&
                Children !== "Vehicle"
              ) {
                let Filter = User.filter((o) => o.asset_type === Children);
                setListlabel("title");
                setList(
                  Filter.filter(
                    (o) => o.parent_id !== Number(newValue.ipss_asset_id)
                  )
                );
                setRightData(
                  Filter.filter(
                    (o) => o.parent_id === Number(newValue.ipss_asset_id)
                  )
                );
                let datas = Filter.find(
                  (o) => o.parent_id === Number(newValue.ipss_asset_id)
                );
                setParentid1(datas ? datas : null);
                setMappingdata1(Filter);
                setLabel1("title");
              }
            }}
            sx={{ width: 200 }}
            renderInput={(params) => <TextField {...params} />}
          />
        </Grid>
        <Grid item xs={2}>
          {/* Select dropdown */}
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Select</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={Children}
              disabled={Boolean(Parentid === null)}
              label="Select"
              onChange={handleChange1}
            >
              {ChildrenData.filter((o) => Parent !== o).map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        {Parent === "Vehicle" && Children !== "Route" && Children !== "" ? (
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            disableClearable
            options={Mappingdata1}
            getOptionLabel={(option) => option[Label1]}
            value={Parentid1}
            onChange={(event, newValue) => {
              setParentid1(newValue);
            }}
            sx={{ width: 200 }}
            renderInput={(params) => <TextField {...params} />}
          />
        ) : (
          <Grid item xs={8}>
            {/* Dynamic transfer list */}
            <DynamicTransferList
              leftdata={List}
              rightdata={RightData}
              values={Listlabel}
              data={li}
            />
          </Grid>
        )}
      </Grid>
      <div style={{ display: "flex", gap: "30px" }}>
        {/* Cancel button */}
        <Button
          variant="outlined"
          style={{ marginLeft: "54.5%", marginTop: "10px" }}
          color="primary"
          onClick={() => history.push("/assets/list")}
        >
          Cancel
        </Button>

        {/* Submit button */}
        <Button
          type="submit"
          variant="contained"
          style={{ marginTop: "10px" }}
          disabled={Boolean(Parentid === null) || Boolean(Children === "")}
          color="primary"
          onClick={() => handleSubmit()}
        >
          Submit
        </Button>
      </div>
      {/* Snackbar for success message */}
      <Snackbar open={Boolean(success)}>
        <Alert severity="success">Assigned Successfully!</Alert>
      </Snackbar>
      {/* Snackbar for failure message */}
      <Snackbar open={Boolean(failure)}>
        <Alert severity="error">{failure}</Alert>
      </Snackbar>
    </div>
  );
};

export default Configure;
