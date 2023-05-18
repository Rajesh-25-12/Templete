import React, { useState, useEffect, useRef } from "react";
import { Formik, FieldArray, Field } from "formik";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Grid,
  Button,
  Stack,
  Typography,
  Alert,
  AppBar,
  Toolbar,
  Box,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { RouteSchema, RouteValues } from "../Constants/Validation";
import MyTextField from "../Components/Textfield";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { SAVE_SUCCESS, TIME_OUT, FAILURE } from "../Constants/Contant";
import { liveApi } from "../../service/Service";
import Select, { SelectChangeEvent } from '@mui/material/Select';
const MyForm = () => {
  const liveapi=liveApi()
  const [success, setSuccess] = useState("");
  const [failure, setFailure] = useState("");
  const [School,setSchool]=useState([])
  const handleSubmit = (values) => {
    console.log(values);
    let Routedata={
      
    }
    {editid? 
      liveapi
      .post("/school-app/assets/update-asset/"+Number(editid.editid), values)
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
      }):
      liveapi
      .post("/school-app/route/", values)
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
      })    
    }
  };
const GetSchool=()=>{
  liveapi.get("/school-app/gps-tracking/all-routes/")
  .then((res)=>{
    setSchool(res.data.data)
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
  .catch((err)=>{
    console.log("error", err);
  })
}
useEffect(()=>{
  GetSchool()
},[])
  return (
    <div style={{ margin: "0 5vh" }}>
      <br />
      <AppBar position="static" class="appbar">
        <Toolbar>
          <Box display="flex" flexGrow={1}>
            <Typography variant="h6">Route</Typography>
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
        initialValues={RouteValues}
        validationSchema={RouteSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, values, handleChange, errors, touched }) => (
          <form onSubmit={handleSubmit}>
            <div style={{ display: "flex", gap: "20px", margin: "0 2vh" }}>
              <div>
                <MyTextField
                  type="number"
                  name="routeno"
                  label="Route Number"
                />
              </div>
              <div>
                <MyTextField type="text" name="name" label="Route Name" />
              </div>
              <div>
                <Field name="is_active">
                  {({ field }) => (
                   <FormControl fullWidth>
                   <InputLabel id="demo-simple-select-label">Active</InputLabel>
                   <Select
                     labelId="demo-simple-select-label"
                     id="demo-simple-select"
                     size="small"
                     label="Active"
{...field}                   >
                     <MenuItem value={false}>No</MenuItem>
                     <MenuItem value={true}>Yes</MenuItem>
                   </Select>
                 </FormControl>
                  )}
                </Field>
              </div>
            </div>
            <br />
            <TableContainer>
              <Table aria-label="simple table">
                <TableBody>
                  <FieldArray name="details">
                    {({ push, remove }) => (
                      <div>
                        {values.details.map((detail, index) => (
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
                                    onClick={() => remove(index)}
                                  >
                                    <DeleteIcon />
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}

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
