import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Gif from '../Assets/techgen.png'
const Home = ({ open, handleClose }) => {
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth='sm'
      >
        <DialogContent >
          <DialogContentText id="alert-dialog-description"></DialogContentText>
          <div className="divLoader" >
            <svg className="svgLoader" viewBox="0 0 100 100">
              <path ng-attr-d="{{config.pathCmd}}" stroke="none" d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50" fill="#51CACC" transform="rotate(179.719 50 51)">
                <animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 51;360 50 51" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite">
                </animateTransform>
              </path>
            </svg>
            <img src={Gif} className='image' style={{ width: "240px", height: "240px" }}></img>
            <span className="fvloadio">
            </span>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Home
