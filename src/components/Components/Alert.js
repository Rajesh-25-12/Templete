import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@mui/material";

const Alertpopup = ({ open, close, data, data1, allow }) => {
  return (
    <>
      {/* Dialog component */}
      <Dialog
        open={open} // Set the open state of the dialog
        onClose={close} // Set the close function to handle dialog close event
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* Dialog title */}
        <DialogTitle id="alert-dialog-title"></DialogTitle>

        {/* Dialog content */}
        <DialogContent>
          <div
            style={{
              fontFamily: "sans-serif",
              display: "flex",
              flexDirection: "column",
              fontSize: "17px",
            }}
          >
            {/* Display the data if it is defined */}
            {data != undefined && <>{data}</>}

            {/* Display the second data if it is defined and not an empty string */}
            {data1 != undefined && data1 != "" && (
              <>
                <br />
                <br />
                {data1}
              </>
            )}
          </div>
        </DialogContent>

        {/* Dialog actions */}
        <DialogActions>
          {/* If the second data is defined */}
          {data1 != undefined ? (
            <>
              {/* Button to close the dialog */}
              <Button onClick={close}>No</Button>
              {/* Button to trigger the allow function */}
              <Button
                color="primary"
                variant="contained"
                onClick={allow}
                autoFocus
              >
                Yes
              </Button>
            </>
          ) : (
            <>
              {/* If the second data is not defined, show a single OK button */}
              <Button onClick={close}>OK</Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Alertpopup;
