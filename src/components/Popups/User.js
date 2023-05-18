import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Stack,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Formik, Form } from "formik";
import MyTextField from "../Components/Textfield";
import { UserSchema } from "../Constants/Validation";
import MyAutocomplete from "../Components/AutoComplete";
const User = ({ open, Close }) => {
  const initialValues = {
    name: "",
    mobile: "",
    Role: null,
  };
  const options = [
    { role: 'Admin', label: 'Admin' },
    { role: 'User', label: 'User' },
  ];
  
  const handleSubmit = (values) => {
    console.log(values);
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
                  <MyTextField name="name" label="Name" />
                </div>
                <br />
                <div style={{ width: "500px" }}>
                  <MyTextField name="mobile" label="Mobile" />
                </div>
                <br />
                <div style={{ width: "500px" }}>
                  <MyAutocomplete
                    name="Role"
                    label="Role"
                    options={options}
                    getOptionLabel={(option) => option.label}
                  />
                </div>
                <br />
                <Stack
                  direction="row"
                  spacing={4}
                  justifyContent="flex-end"
                  style={{ padding: 10, right: "0%" }}
                >
                  <Button onClick={Close} variant="outlined" color="primary">
                    Close
                  </Button>
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

export default User;
