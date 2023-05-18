import React, { useEffect, useState } from "react";
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
import MyTextField from "../Components/Textfield";
import { Formik, Form, useFormikContext, FormikContext } from "formik";
import { SAVE_SUCCESS, TIME_OUT, FAILURE } from "../Constants/Contant";
import { VehicleSchema, VehicleinitialValues } from "../Constants/Validation";
import { liveApi } from "../../service/Service";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory, useParams } from "react-router-dom";
import Fileuploader from "../Components/FIleupload";
import DeleteIcon from "@material-ui/icons/Delete";
import FileOpenIcon from "@mui/icons-material/FileOpen";

const defaultS3Data = {
  media_id: "",
  media_key: "",
};
import FileUploadComponent from "../Components/FIleupload";
const Vehicle = () => {
  const history = useHistory();
  const liveapi = liveApi();
  const editid = useParams();
  const [Access,setAccess]=useState(false)
  const [attachment, setAttachment] = useState(defaultS3Data);
  const [attachment1, setAttachment1] = useState(defaultS3Data);
  const [attachment2, setAttachment2] = useState(defaultS3Data);
  const [attachment3, setAttachment3] = useState(defaultS3Data);
  const [attachment4, setAttachment4] = useState(defaultS3Data);
  const [success, setSuccess] = useState("");
  const [failure, setFailure] = useState("");
  const [Vehicledata, setVehicledata] = useState(VehicleinitialValues);
  const handleSubmit = (values) => {
    values.asset_attributes.Attachment = attachment.media_key;
    values.asset_attributes.Attachment1 = attachment1.media_key;
    values.asset_attributes.Attachment2 = attachment2.media_key;
    values.asset_attributes.Attachment3 = attachment3.media_key;
    values.asset_attributes.Attachment4 = attachment4.media_key;
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
      })
    
    }
  };
  useEffect(() => {
    if (editid!==undefined) {
      console.log(editid);
      UpdateVehicle(editid);
    }
  }, [editid]);
  const UpdateVehicle = (id) => {
    liveapi
      .get("/school-app/assets/")
      .then((res) => {
        const updatedata = res.data.results.find(
          (o) => o.ipss_asset_id === Number(id.editid)
        );
        setVehicledata(updatedata);
        setAccess(true)
        setAttachment({ media_key: updatedata.asset_attributes.Attachment });
        setAttachment1({ media_key: updatedata.asset_attributes.Attachment1 });
        setAttachment2({ media_key: updatedata.asset_attributes.Attachment2 });
        setAttachment3({ media_key: updatedata.asset_attributes.Attachment3 });
        setAttachment4({ media_key: updatedata.asset_attributes.Attachment4 });
      })
      .catch((err) => {
        console.log("req error", err);
      });
  };

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

  return (
    <div style={{ margin: "0 8vh" }}>
      <br />
      <AppBar position="static" class="appbar">
        <Toolbar>
          <Box display="flex" flexGrow={1}>
            <Typography variant="h6">Vehicle</Typography>
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
        initialValues={Vehicledata|| VehicleinitialValues}
        enableReinitialize={Access} // Enable reinitialization when Vehicledata changes
        onSubmit={handleSubmit}
        validationSchema={VehicleSchema}
      >
        <Form>
          <div style={{ margin: "0vh" }}>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <div style={{ width: "400px" }}>
                <div class="main-container">
                  <div class="left-side">
                    <Typography className="name">Vehicle Reg No :</Typography>
                    <Typography className="name">Vehicle Mfr :</Typography>
                    <Typography className="name">Engine No :</Typography>
                    <Typography className="name">Chassis No :</Typography>
                    <Typography className="name">RC No :</Typography>
                    <Typography className="name">FC No :</Typography>
                  </div>
                  <div class="right-side">
                    <MyTextField name="asset_identifier" />
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
                    <MyTextField name="asset_attributes.RCno" /> <br />
                    <br />
                    <MyTextField name="asset_attributes.FCno" />
                  </div>
                </div>
              </div>
              <div style={{ width: "440px" }}>
                <div class="main-container">
                  <div class="left-side">
                    <Typography className="name">Seat Capacity :</Typography>
                    <Typography className="name">
                      Fuel Tank Capacity :
                    </Typography>
                    <Typography className="name">Fuel Type :</Typography>
                    <Typography className="name">Speed Limit:</Typography>
                    <Typography className="name">Attachments:</Typography>
                  </div>
                  <div class="right-side">
                    <MyTextField name="asset_attributes.SeatCapacity" />
                    <br />
                    <br />
                    <MyTextField name="asset_attributes.FuelCapacity" />
                    <br />
                    <br />
                    <MyTextField name="asset_attributes.FuelType" />
                    <br />
                    <br />
                    <MyTextField name="asset_attributes.speed" />
                    <br />
                    <br />
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
                                          color: "#a4a4a4",
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
                                          color: "#a4a4a4",
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
                                  >                                    <Tooltip title="Preview" arrow>

                                    <FileOpenIcon
                                      style={{ fontSize: 38, color: "#a4a4a4" }}
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
                                      style={{ fontSize: 38, color: "#a4a4a4" }}
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
                                      style={{ fontSize: 38, color: "#a4a4a4" }}
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
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Stack
            direction="row"
            justifyContent="center"
            spacing={4}
            padding={2}
          >
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
        </Form>
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
export default Vehicle;
