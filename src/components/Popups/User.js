import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Formik, Form } from "formik";
import MyTextField from "../Components/Textfield";
import { UserSchema } from "../Constants/Validation";
import MyAutocomplete from "../Components/AutoComplete";
import { liveApi } from "../../service/Service";
const User = ({ open, Close }) => {
  const [Roles, setRoles] = useState([]);
  const liveapi = liveApi();
  
  const initialValues = {
    name: "",
    mobile: "",
    Role: null,
  };
  
  const options = [
    { role: "Admin", label: "Admin" },
    { role: "User", label: "User" },
  ];

  const Userdetails = () => {
    // Fetch user roles from API
    liveapi
      .get("/school-app/users/list-user-roles")
      .then((res) => {
        setRoles(res.data.data);
      })
      .catch((err) => {
        console.log("req error", err);
      });
  };

  useEffect(() => {
    // Load user roles on component mount
    Userdetails();
  }, []);

  const handleSubmit = (values) => {
    // Handle form submission
  };

  return (
    <>
      <Dialog
        className="dialog-border"
        open={open}
        scroll="paper"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Add User
          <IconButton
            aria-label="close"
            onClick={Close}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent style={{ margin: "0 2vh" }}>
          <Formik
            initialValues={initialValues}
            validationSchema={UserSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <div>
                &nbsp;
                <div style={{ width: "500px" }}>
                  {/* Text field for name */}
                  <MyTextField name="name" label="Name" size="large" />
                </div>
                <br />
                <div style={{ width: "500px" }}>
                  {/* Text field for mobile */}
                  <MyTextField name="mobile" label="Mobile" size="large" />
                </div>
                <br />
                <div style={{ width: "500px" }}>
                  {/* Autocomplete input for role */}
                  <MyAutocomplete
                    name="Role"
                    label="Role"
                    options={Roles}
                    getOptionLabel={(option) => option.title}
                  />
                </div>
                <br />
                <Stack
                  direction="row"
                  spacing={4}
                  justifyContent="flex-end"
                  style={{ padding: 10, right: "0%" }}
                >
                  {/* Close button */}
                  <Button onClick={Close} variant="outlined" color="primary">
                    Close
                  </Button>
                  {/* Submit button */}
                  <Button type="submit" variant="contained" color="primary">
                    Submit
                  </Button>
                </Stack>
              </div>
            </Form>
          </Formik>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </>
  );
};

export default React.memo(User);
