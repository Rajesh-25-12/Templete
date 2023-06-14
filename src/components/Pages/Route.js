import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
// Formik Hooks
import { Formik, FieldArray, Field } from "formik";
// Mui icons
import DeleteIcon from "@mui/icons-material/Delete";
// Mui components
import {
  Grid,
  Button,
  Stack,
  Typography,
  Alert,
  AppBar,
  Toolbar,
  Box,
  Snackbar,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Select from "@mui/material/Select";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
// Axios Service
import { liveApi } from "../../service/Service";
// Schema imports
import { RouteSchema, RouteValues } from "../Constants/Validation";
// Constant imports
import { SAVE_SUCCESS, TIME_OUT, FAILURE } from "../Constants/Contant";
// Custom hook components
import MyAutocomplete from "../Components/AutoComplete";
import MyTextField from "../Components/Textfield";
const MyForm = () => {
  // Axios State
  const liveapi = liveApi();
  // Navigation Properties
  const editid = useParams();
  // Navigation State
  const history = useHistory();
  // Snackbar state
  const [success, setSuccess] = useState("");
  const [failure, setFailure] = useState("");
  // School state for get
  const [School, setSchool] = useState([]);
  // initial state
  const [RouteData, setRouteData] = useState(RouteValues);
  // Reinitialization state
  const [Access, setAccess] = useState(false);
  // Submit function
  const handleSubmit = (values) => {
    let Routedata = {
      site_id: values.routeno.ipss_asset_id,
      route_name: values.name,
      is_active: values.is_active,
      stopDetails: values.details,
    };
    // Post Function
    if (editid.editid === undefined) {
      liveapi
        .post("/school-app/route/", Routedata)
        .then((res) => {
          if (res.data.success) {
            setSuccess(SAVE_SUCCESS);
            setTimeout(() => {
              setSuccess("");
              history.push("/assets/list");
            }, TIME_OUT);
          } else {
            setFailure(FAILURE);
            setTimeout(() => {
              setFailure("");
            }, TIME_OUT);
          }
        })
        .catch((err) => {
          console.log("error", err);
          setFailure(FAILURE);
          setTimeout(() => {
            setFailure("");
          }, TIME_OUT);
        });
    } else {
      // Patch Function
      liveapi
        .put(
          "/school-app/route/update-route/" + Number(editid.editid) + "/",
          Routedata
        )
        .then((res) => {
          if (res.data.success) {
            setSuccess(SAVE_SUCCESS);
            setTimeout(() => {
              setSuccess("");
              history.push("/assets/list");
            }, TIME_OUT);
          } else {
            setFailure(FAILURE);
            setTimeout(() => {
              setFailure("");
            }, TIME_OUT);
          }
        })
        .catch((err) => {
          console.log("error", err);
          setFailure(FAILURE);
          setTimeout(() => {
            setFailure("");
          }, TIME_OUT);
        });
    }
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
  // Function to fetch Route datas
  const Routedetails = (id) => {
    liveapi
      .get("/school-app/route/")
      .then((res) => {
        const updatedata = res.data.results.find(
          (o) => Number(o.gps_route_id) === Number(id.editid) // Find the item in res.data.results with a matching gps_route_id
        );
        let data1 = School.find(
          (o) => o.ipss_asset_id === Number(updatedata.site_id) // Find the item in School with a matching ipss_asset_id
        );
        setAccess(true); // Set the access to true
        if (updatedata.stopDetails.length === 0) {
          // Check if stopDetails array is empty
          updatedata.stopDetails = [
            // If empty, assign a default stop detail
            {
              stop_sequence: 0,
              stop_name: "",
              stop_lat: "",
              stop_lng: "",
              location: "",
              arrival_time_up: "",
              arrival_time_down: "",
              depart_time_up: "",
              depart_time_down: "",
            },
          ];
        }
        const updatedStopDetails = updatedata.stopDetails.map((stopDetail) => {
          // Map over each stop detail in stopDetails array
          const { gps_route_id, route_stop_id, is_active, ...rest } =
            stopDetail; // Destructure the stop detail object
          const allNull = Object.values(rest).every((value) => value === null); // Check if all remaining values are null
          if (allNull) {
            // If all values are null
            return {
              // Return a modified stop detail object with default values and the original ids
              stop_sequence: 0,
              stop_name: "",
              stop_lat: "",
              stop_lng: "",
              location: "",
              arrival_time_up: "",
              arrival_time_down: "",
              depart_time_up: "",
              depart_time_down: "",
              gps_route_id,
              route_stop_id,
              is_active,
            };
          }
          return stopDetail; // Return the original stop detail object
        });

        setRouteData({
          routeno: data1,
          name: updatedata?.route_name,
          is_active: updatedata?.is_active,
          details: updatedStopDetails,
        });
      })
      .catch((err) => {
        console.log("req error", err);
      });
  };
  useEffect(() => {
    GetSchool();
  }, []);
  useEffect(() => {
    if (editid.editid != undefined) {
      Routedetails(editid);
    }
  }, [editid, School]);
  // Sidebar Menu icon
  var element = document.querySelectorAll('style[data-meta="MuiAppBar"]');
  if (element) {
    if (element.length > 1) {
      element[0].parentNode.removeChild(element[1]);
    }
  }
  // Delete Function when Update
  const Stopdelete = (id) => {
    liveapi
      .delete("/school-app/route/update-route-stop/" + id + "/")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <div style={{ margin: "0 5vh" }}>
      <br />
      <AppBar position="static" class="appbar">
        <Toolbar>
          <Box display="flex" flexGrow={1}>
            <Typography variant="h6">
              {editid.editid ? "Update" : "Add"} Route
            </Typography>
          </Box>
          <Grid align="right">
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
      <Formik
        initialValues={RouteData || RouteValues} // Initial values for the formik form
        enableReinitialize={Access} // Enable reinitialization of form values
        validationSchema={RouteSchema} // Validation schema for form validation
        onSubmit={handleSubmit} // Handle form submission
      >
        {({ handleSubmit, values, handleChange, errors, touched }) => (
          <form onSubmit={handleSubmit}>
            {/* 1st Row */}
            <div style={{ display: "flex", gap: "20px", margin: "0 2vh" }}>
              <div style={{ width: "300px" }}>
                <MyAutocomplete
                  name="routeno"
                  label="School"
                  options={School}
                  title={"title"}
                  size="small"
                  getOptionLabel={(option) => option.title}
                />
              </div>
              <div>
                <MyTextField type="text" name="name" label="Route Name" />
              </div>
              <div>
                <Field name="is_active">
                  {({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Active
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        size="small"
                        label="Active"
                        {...field}
                      >
                        <MenuItem value={false}>No</MenuItem>
                        <MenuItem value={true}>Yes</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                </Field>
              </div>
            </div>
            <br />
            {/* Route Details Fields */}
            <TableContainer>
              <Table aria-label="simple table">
                <TableBody>
                  <FieldArray name="details">
                    {({ push, remove }) => (
                      <div>
                        {values?.details?.map((detail, index) => {
                          return (
                            <TableRow key={index}>
                              <TableCell>
                                <div style={{ display: "flex", gap: "5px" }}>
                                  <MyTextField
                                    type="number"
                                    label="Stop Number"
                                    name={`details[${index}].stop_sequence`}
                                  />
                                  <MyTextField
                                    type="text"
                                    label="Stop Name"
                                    name={`details[${index}].stop_name`}
                                  />
                                  <MyTextField
                                    type="text"
                                    label="Location/Address"
                                    name={`details[${index}].location`}
                                  />
                                  <MyTextField
                                    label="Latitude"
                                    name={`details[${index}].stop_lat`}
                                  />
                                  <MyTextField
                                    label="Longitude"
                                    name={`details[${index}].stop_lng`}
                                  />
                                  <MyTextField
                                    type="time"
                                    label="Pickup Time up"
                                    name={`details[${index}].arrival_time_up`}
                                  />
                                  <MyTextField
                                    type="time"
                                    label="Pickup Time down"
                                    name={`details[${index}].arrival_time_down`}
                                  />
                                  <MyTextField
                                    type="time"
                                    label="Drop Time up"
                                    name={`details[${index}].depart_time_up`}
                                  />
                                  <MyTextField
                                    type="time"
                                    label="Drop Time down"
                                    name={`details[${index}].depart_time_down`}
                                  />
                                  {values.details.length > 1 && (
                                    <Button
                                      color="secondary"
                                      onClick={() => {
                                        if (
                                          values.details[index]
                                            ?.route_stop_id === undefined
                                        ) {
                                          remove(index);
                                        } else {
                                          Stopdelete(
                                            values.details[index]?.route_stop_id
                                          );
                                          remove(index);
                                        }
                                      }}
                                    >
                                      <DeleteIcon />
                                    </Button>
                                  )}
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                        <Stack
                          direction="row"
                          spacing={4}
                          justifyContent="flex-end"
                          style={{ padding: 10, right: "0%" }}
                        >
                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                          >
                            Submit
                          </Button>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() =>
                              push({
                                stop_sequence: 0,
                                stop_name: "",
                                stop_lat: "",
                                stop_lng: "",
                                location: "",
                                arrival_time_up: "",
                                arrival_time_down: "",
                                depart_time_up: "",
                                depart_time_down: "",
                              })
                            }
                          >
                            Add Stop
                          </Button>
                        </Stack>
                      </div>
                    )}
                  </FieldArray>
                </TableBody>
              </Table>
            </TableContainer>
          </form>
        )}
      </Formik>
      <Snackbar open={Boolean(success)}>
        <Alert severity="success">{success}</Alert>
      </Snackbar>
      <Snackbar open={Boolean(failure)}>
        <Alert severity="error">{failure}</Alert>
      </Snackbar>
    </div>
  );
};
export default MyForm;
