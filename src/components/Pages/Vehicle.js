import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
// Formik hooks
import { Formik, Form } from "formik";
// Mui components
import {
  Alert,
  Button,
  Grid,
  Snackbar,
  Stack,
  AppBar,
  Toolbar,
  Box,
  Typography,
  Tooltip,
  IconButton,
} from "@mui/material";
// Mui icons
import DeleteIcon from "@material-ui/icons/Delete";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
// Custom hooks
import MyTextField from "../Components/Textfield";
import Fileuploader from "../Components/FIleupload";
// Constants
import { SAVE_SUCCESS, TIME_OUT, FAILURE } from "../Constants/Contant";
//Validation Schemas
import { VehicleSchema, VehicleinitialValues } from "../Constants/Validation";
// Axios hook
import { liveApi } from "../../service/Service";
// S3 State
const defaultS3Data = {
  media_id: "",
  media_key: "",
};
/*Function Initialization */
const Vehicle = () => {
  const history = useHistory();
  const liveapi = liveApi();
  const editid = useParams();
  // Reinitialize the formik values
  const [Access, setAccess] = useState(false);
  // File upload states
  const [attachment, setAttachment] = useState(defaultS3Data);
  const [attachment1, setAttachment1] = useState(defaultS3Data);
  const [attachment2, setAttachment2] = useState(defaultS3Data);
  const [attachment3, setAttachment3] = useState(defaultS3Data);
  const [attachment4, setAttachment4] = useState(defaultS3Data);
  // Snackbar states
  const [success, setSuccess] = useState("");
  const [err, seterr] = useState("");
  const [failure, setFailure] = useState("");
  // Vehicle state
  const [Vehicledata, setVehicledata] = useState(VehicleinitialValues);
  // SUbmit function
  const handleSubmit = (values) => {
    values.asset_attributes.Attachment = attachment.media_key;
    values.asset_attributes.Attachment1 = attachment1.media_key;
    values.asset_attributes.Attachment2 = attachment2.media_key;
    values.asset_attributes.Attachment3 = attachment3.media_key;
    values.asset_attributes.Attachment4 = attachment4.media_key;
    {
      editid.editid
        ? liveapi
            .post(
              "/school-app/assets/update-asset/" + Number(editid.editid),
              values
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
            })
        : liveapi
            .post("/school-app/assets/create-asset", values)
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
            });
    }
  };
  // Navigation properties Update
  useEffect(() => {
    if (editid !== undefined) {
      UpdateVehicle(editid);
    }
  }, [editid]);
  // Update vehicle
  const UpdateVehicle = (id) => {
    liveapi
      .get("/school-app/assets/?asset_type=Vehicle&results_per_page=1000")
      .then((res) => {
        const updatedata = res.data.results.find(
          (o) => o.ipss_asset_id === Number(id.editid)
        );
        setVehicledata(updatedata);
        setAccess(true);
        setAttachment({ media_key: updatedata?.asset_attributes?.Attachment });
        setAttachment1({
          media_key: updatedata?.asset_attributes?.Attachment1,
        });
        setAttachment2({
          media_key: updatedata?.asset_attributes?.Attachment2,
        });
        setAttachment3({
          media_key: updatedata?.asset_attributes?.Attachment3,
        });
        setAttachment4({
          media_key: updatedata?.asset_attributes?.Attachment4,
        });
      })
      .catch((err) => {
        console.log("req error", err);
      });
  };
  // File uploader Delete states
  const DeleteAbstract = () => {
    setAttachment(defaultS3Data);
  };
  const DeleteAbstract1 = () => {
    setAttachment1(defaultS3Data);
  };
  const DeleteAbstract2 = () => {
    setAttachment2(defaultS3Data);
  };
  const DeleteAbstract3 = () => {
    setAttachment3(defaultS3Data);
  };
  const DeleteAbstract4 = () => {
    setAttachment4(defaultS3Data);
  };
  // sidebar menu icon
  var element = document.querySelectorAll('style[data-meta="MuiAppBar"]');
  if (element) {
    if (element.length > 1) {
      element[0].parentNode.removeChild(element[1]);
    }
  }
  // Formik Err Handle function
  const Vehiclenovalidate = (props) => {
    seterr(props);
  };
  return (
    <div style={{ margin: "0 8vh" }}>
      <br />
      {/* Appbar */}
      <AppBar position="static" class="appbar">
        <Toolbar>
          <Box display="flex" flexGrow={1}>
            <Typography variant="h6">
              {editid.editid ? "Update" : "Add"} Vehicle
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
        initialValues={Vehicledata || VehicleinitialValues} // Initial values for the formik form
        enableReinitialize={Access} // Enable reinitialization of form values
        onSubmit={handleSubmit} // Handle form submission
        validationSchema={VehicleSchema} // Validation schema for form validation
      >
        <Form>
          <div style={{ margin: "0vh" }}>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {/* Column 1 */}
              <div style={{ width: "400px" }}>
                <div class="main-container">
                  {/* Left side */}
                  <div class="left-side">
                    <Typography className="name">Vehicle Reg No :</Typography>
                    {err && <br />}
                    <Typography className="name">Vehicle Mfr :</Typography>
                    <Typography className="name">Engine No :</Typography>
                    <Typography className="name">Chassis No :</Typography>
                    <Typography className="name">RC No :</Typography>
                    <Typography className="name">FC No :</Typography>
                    <Typography className="name">Tax Recepit No:</Typography>
                    <Typography className="name">Permit No:</Typography>
                  </div>
                  {/* Right side */}
                  <div class="right-side">
                    <MyTextField
                      name="asset_identifier"
                      formikProps={Vehiclenovalidate}
                    />
                    <br />
                    <br />
                    <MyTextField name="title" />
                    <br />
                    <br />
                    <MyTextField name="asset_attributes.EngineNo" />
                    <br />
                    <br />
                    <MyTextField name="asset_attributes.Chassisno" />
                    <br />
                    <br />
                    <MyTextField name="asset_attributes.RCno" />
                    <br />
                    <br />
                    <MyTextField name="asset_attributes.FCno" />
                    <br />
                    <br />
                    <MyTextField name="asset_attributes.TaxNo" />
                    <br />
                    <br />
                    <MyTextField name="asset_attributes.PermitNo" />
                  </div>
                </div>
              </div>
              {/* Column 2 */}
              <div style={{ width: "440px" }}>
                <div class="main-container">
                  {/* Left side */}
                  <div class="left-side">
                    <Typography className="name">Seat Capacity :</Typography>
                    <Typography className="name">
                      Fuel Tank Capacity :
                    </Typography>
                    <Typography className="name">Fuel Type :</Typography>
                    <Typography className="name">Speed Limit:</Typography>
                    <Typography className="name">Attachments:</Typography>
                  </div>
                  {/* Right side */}
                  <div class="right-side">
                    <MyTextField
                      name="asset_attributes.SeatCapacity"
                      need="yes"
                    />
                    <br />
                    <br />
                    <MyTextField name="asset_attributes.FuelCapacity" />
                    <br />
                    <br />
                    <MyTextField name="asset_attributes.FuelType" />
                    <br />
                    <br />
                    <MyTextField name="over_speed" />
                    <br />
                    <br />
                    {/* File Upload Fields */}
                    <div
                      style={{ display: "flex", flexWrap: "wrap", gap: "30%" }}
                    >
                      <div style={{ width: "50px" }}>
                        {attachment.media_key ? (
                          <div>
                            <table>
                              <tr>
                                <td>
                                  <a
                                    href={
                                      "https://freshvoice.sgp1.digitaloceanspaces.com/" +
                                      attachment.media_key
                                    }
                                    target="_blank"
                                  >
                                    <Tooltip title="Preview" arrow>
                                      <FileOpenIcon
                                        style={{
                                          fontSize: 38,
                                          color: "#0000FF",
                                        }}
                                      />
                                    </Tooltip>
                                  </a>
                                </td>
                                <td>
                                  <Tooltip title="Delete" arrow>
                                    <IconButton
                                      onClick={DeleteAbstract}
                                      aria-label="delete"
                                    >
                                      <DeleteIcon
                                        fontSize="small"
                                        className="red_color"
                                      />
                                    </IconButton>
                                  </Tooltip>
                                </td>
                              </tr>
                            </table>
                          </div>
                        ) : (
                          <Fileuploader
                            id="grn_add_invoice_file_upload"
                            onVideoUploaded={setAttachment}
                            title="invoice_pdf"
                          />
                        )}
                      </div>
                      <div style={{ width: "50px" }}>
                        {attachment1.media_key ? (
                          <div>
                            <table>
                              <tr>
                                <td>
                                  <a
                                    href={
                                      "https://freshvoice.sgp1.digitaloceanspaces.com/" +
                                      attachment1.media_key
                                    }
                                    target="_blank"
                                  >
                                    <Tooltip title="Preview" arrow>
                                      <FileOpenIcon
                                        style={{
                                          fontSize: 38,
                                          color: "#0000FF",
                                        }}
                                      />
                                    </Tooltip>
                                  </a>
                                </td>
                                <td>
                                  <Tooltip title="Delete">
                                    <IconButton
                                      onClick={DeleteAbstract1}
                                      aria-label="delete"
                                    >
                                      <DeleteIcon
                                        fontSize="small"
                                        className="red_color"
                                      />
                                    </IconButton>
                                  </Tooltip>
                                </td>
                              </tr>
                            </table>
                          </div>
                        ) : (
                          <Fileuploader
                            id="grn_add_invoice_file_upload"
                            onVideoUploaded={setAttachment1}
                            title="invoice_pdf"
                          />
                        )}
                      </div>
                      <div style={{ width: "50px" }}>
                        {attachment2.media_key ? (
                          <div>
                            <table>
                              <tr>
                                <td>
                                  <a
                                    href={
                                      "https://freshvoice.sgp1.digitaloceanspaces.com/" +
                                      attachment2.media_key
                                    }
                                    target="_blank"
                                  >
                                    <Tooltip title="Preview" arrow>
                                      <FileOpenIcon
                                        style={{
                                          fontSize: 38,
                                          color: "#0000FF",
                                        }}
                                      />
                                    </Tooltip>
                                  </a>
                                </td>
                                <td>
                                  <Tooltip title="Delete">
                                    <IconButton
                                      onClick={DeleteAbstract2}
                                      aria-label="delete"
                                    >
                                      <DeleteIcon
                                        fontSize="small"
                                        className="red_color"
                                      />
                                    </IconButton>
                                  </Tooltip>
                                </td>
                              </tr>
                            </table>
                          </div>
                        ) : (
                          <Fileuploader
                            id="grn_add_invoice_file_upload"
                            onVideoUploaded={setAttachment2}
                            title="invoice_pdf"
                          />
                        )}
                      </div>
                      <div style={{ width: "50px" }}>
                        {attachment3.media_key ? (
                          <div>
                            <table>
                              <tr>
                                <td>
                                  <a
                                    href={
                                      "https://freshvoice.sgp1.digitaloceanspaces.com/" +
                                      attachment3.media_key
                                    }
                                    target="_blank"
                                  >
                                    <Tooltip title="Preview" arrow>
                                      <FileOpenIcon
                                        style={{
                                          fontSize: 38,
                                          color: "#0000FF",
                                        }}
                                      />
                                    </Tooltip>
                                  </a>
                                </td>
                                <td>
                                  <Tooltip title="Delete">
                                    <IconButton
                                      onClick={DeleteAbstract3}
                                      aria-label="delete"
                                    >
                                      <DeleteIcon
                                        fontSize="small"
                                        className="red_color"
                                      />
                                    </IconButton>
                                  </Tooltip>
                                </td>
                              </tr>
                            </table>
                          </div>
                        ) : (
                          <Fileuploader
                            id="grn_add_invoice_file_upload"
                            onVideoUploaded={setAttachment3}
                            title="invoice_pdf"
                          />
                        )}
                      </div>
                      <div style={{ width: "50px" }}>
                        {attachment4.media_key ? (
                          <div>
                            <table>
                              <tr>
                                <td>
                                  <a
                                    href={
                                      "https://freshvoice.sgp1.digitaloceanspaces.com/" +
                                      attachment4.media_key
                                    }
                                    target="_blank"
                                  >
                                    <Tooltip title="Preview" arrow>
                                      <FileOpenIcon
                                        style={{
                                          fontSize: 38,
                                          color: "#0000FF",
                                        }}
                                      />
                                    </Tooltip>
                                  </a>
                                </td>
                                <td>
                                  <Tooltip title="Delete">
                                    <IconButton
                                      onClick={DeleteAbstract4}
                                      aria-label="delete"
                                    >
                                      <DeleteIcon
                                        fontSize="small"
                                        className="red_color"
                                      />
                                    </IconButton>
                                  </Tooltip>
                                </td>
                              </tr>
                            </table>
                          </div>
                        ) : (
                          <Fileuploader
                            id="grn_add_invoice_file_upload"
                            onVideoUploaded={setAttachment4}
                            title="invoice_pdf"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Column 3 */}
              <div style={{ width: "450px" }}>
                <div class="main-container">
                  <div class="left-side">
                    <Typography className="name">RC Valid Upto :</Typography>
                    <Typography className="name">FC Valid Upto :</Typography>
                    <Typography className="name">
                      Emission Valid Upto :
                    </Typography>
                    <Typography className="name">
                      Insurance Valid Upto:
                    </Typography>
                    <Typography className="name">Tax Expiry Date:</Typography>
                    <Typography className="name">
                      Permit Expiry Date:
                    </Typography>
                  </div>
                  <div class="right-side">
                    <MyTextField
                      name="asset_attributes.RCExpdate"
                      type="date"
                    />
                    <br />
                    <br />
                    <MyTextField
                      name="asset_attributes.FCExpdate"
                      type="date"
                    />
                    <br />
                    <br />
                    <MyTextField
                      name="asset_attributes.Emissionexpdate"
                      type="date"
                    />
                    <br />
                    <br />
                    <MyTextField
                      name="asset_attributes.Insuexpdate"
                      type="date"
                    />
                    <br />
                    <br />

                    <MyTextField
                      name="asset_attributes.Taxexpirydate"
                      type="date"
                    />
                    <br />
                    <br />
                    <MyTextField
                      name="asset_attributes.Permitexpirydate"
                      type="date"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Action Buttons */}
          <Stack direction="row" justifyContent="center" spacing={4}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => history.push("/assets/list")}
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Stack>
          <br />
        </Form>
      </Formik>
      {/* Snackbar Actions */}
      {/* Snackbar for success message */}
      <Snackbar open={Boolean(success)}>
        <Alert severity="success">{success}</Alert>
      </Snackbar>
      {/* Snackbar for failure message */}
      <Snackbar open={Boolean(failure)}>
        <Alert severity="error">{failure}</Alert>
      </Snackbar>
    </div>
  );
};
export default Vehicle;
