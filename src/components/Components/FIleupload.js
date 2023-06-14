import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import { getApi, liveApi } from "../../service/Service";
import { IconButton, Button } from "@material-ui/core";
import { createStyles, Theme } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Alert, Snackbar } from "@mui/material";
import Alertpopup from "./Alert";
const DocumentUploader = ({ title, onVideoUploaded }) => {
  const fileChoose1 = useRef(null);
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState("init");
  const [fileErrors, setFileErrors] = useState([]);
  const api = liveApi();
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [popupdata, setPopupdata] = useState(
    " Invalid file format. Only “pdf and images” formats allowed"
  );
  const [popupdata1, setPopupdata1] = useState();
  const handleClose = () => {
    setOpen(false);
    setPopupdata1();
    setFileErrors([]);
  };
  const allow = () => {
    setOpen(false);
    setPopupdata1();
    setFileErrors([]);
  };
  const useStyles = makeStyles(() =>
    createStyles({
      fabProgress: {
        color: green[500],
        position: "absolute",
        width: "35px",
        height: "35px",
        top: "-10px",
        left: "0",
        right: "0",
        margin: "0 auto",
        zIndex: 1,
      },
    })
  );
  const classes = useStyles();

  const onFileChoose = async () => {
    setLoading(true);
    setStage("uploading");

    if (fileChoose1.current?.files) {
      const files = Array.from(fileChoose1.current.files);
      const errors = [];

      for (const file of files) {
        const fileType = file.type;
        if (
          fileType !== "application/pdf" &&
          fileType !== "image/jpeg" &&
          fileType !== "image/png"
        ) {
          errors.push(file.name);
        } else {
          try {
            let data = await uploadImage(file);
            if (data !== null && data.media_id) {
              onVideoUploaded({
                media_id: data.media_id,
                media_key: data.media_key,
              });
            }
          } catch (err) {
            console.log(err);
            errors.push(file.name);
          }
        }
      }

      setLoading(false);
      setFileErrors(errors);
      setStage("uploaded");
    }
  };

  const uploadImage = async (file) => {
    return new Promise(async (resolve, reject) => {
      api
        .post("/doc_upload/", {
          content_type: file.type,
        })
        .then((res) => {
          const formData = new FormData();
          Object.keys(res.data.data.fields).forEach((key) => {
            formData.append(key, res.data.data.fields[key]);
          });
          formData.append("file", file);
          const xhr = new XMLHttpRequest();
          xhr.open("POST", res.data.data.url, true);
          xhr.onload = function () {
            if (this.status === 204) {
              setSuccess(true);
              setTimeout(() => setSuccess(false), 3000);
              resolve(res.data);
            } else {
              reject(null);
            }
          };
          xhr.upload.onprogress = function (evt) {};
          xhr.send(formData);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  return (
    <>
      <div className="docu_uploader">
        <div>
          <table>
            <tr>
              <td>
                <Button
                  disabled={loading}
                  style={{ textTransform: "none" }}
                  onClick={() => fileChoose1.current?.click()}
                  className="iIHpkQ"
                  variant="contained"
                  color="secondry"
                  component="span"
                >
                  Attach
                  <AttachFileIcon />
                  {loading && (
                    <CircularProgress
                      size={24}
                      style={{ marginTop: "15px" }}
                      className={classes.fabProgress}
                    />
                  )}
                </Button>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div className="ion-text-right" slot="end">
        <div style={{ visibility: "hidden", opacity: 0 }}>
          <input
            type="file"
            ref={fileChoose1}
            onChange={onFileChoose}
            accept=".pdf, image/*"
            capture="camera"
          />
        </div>
        <Alertpopup
          open={fileErrors.length > 0}
          close={handleClose}
          allow={allow}
          data={popupdata}
          data1={popupdata1}
        />
      </div>
    </>
  );
};

export default DocumentUploader;
