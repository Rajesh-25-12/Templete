/*File: StyleBom
   Objective: The objective of this page is Adding Style Details and Bomdetails.
   
Initiated By: Rajesh  A on 1st April
Modification History

--------------------------------------------------------------------------------------------------------------------
DATE     |   AUTHOR   |  ModifiCation Request No.                  |      Remarks / Details of Changes
--------------------------------------------------------------------------------------------------------------------
01-Apr-2023  Rajesh     Rajesh on 01 Aprill 2023...             Initial creation
                                                                    
--------------------------------------------------------------------------------------------------------------------
*/
import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from '@mui/material';
const Alertpopup = ({ open, close, data, data1, allow }) => {
  return (
    <>
      <Dialog
        open={open}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogContent>
          <div
            style={{
              fontFamily: 'sans-serif',
              display: 'flex',
              flexDirection: 'column',
              fontSize: '17px',
            }}
          >
            {data != undefined && <>{data}</>}
            {data1 != undefined && data1 != '' && (
              <>
                <br />
                <br />
                {data1}
              </>
            )}
          </div>
        </DialogContent>
        <DialogActions>
          {data1 != undefined ? (
            <>
              <Button onClick={close}>No</Button>
              <Button
                color='primary'
                variant='contained'
                onClick={allow}
                autoFocus
              >
                Yes
              </Button>
            </>
          ) : (
            <>
              <Button onClick={close}>OK</Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Alertpopup;
