import React, { useState } from "react";
//Validations
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
//Import from Mui
import {
  Alert,
  Snackbar,
  Stack,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  MenuItem,
  Select,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
//import Constants
import { Days, Weekdays, monthNames } from "../Constants/Contant";
//Components Imports
import AntTextfield from "../Components/AntTextfield";
import MyAutocomplete from "../Components/AutoComplete";
import WeekdaysComponent from "../Components/WeekSelect";
//Antdesign Button
import { Button } from "antd";
//moment
import moment from "moment";
const Calaender = ({ open, Close, Editdata, FormValue, School }) => {
  //Enable Description field
  const [Show, setShow] = useState(false);
  //Config Type Field state
  const [Declare, setDeclare] = useState("DeclaredHoliday");
  //End Date state
  const [Ends, setEnds] = useState("Never");
  //recurring_type State
  const [Type, setType] = useState("Day");
  //Update Week days state
  const [Week, setWeek] = useState([]);
  //Weekdays state
  const [Day, setDay] = useState("Monday");
  //Numbers state
  const [Num, setNum] = useState("First");
  //Years state
  const [Years, setYears] = useState("January");
  //Config Type Month state
  const [Month, setMonth] = useState(1);
  //Config Type Year state
  const [Year, setYear] = useState(1);
  //Weeks select state
  const [SelectedDays, setSelectedDays] = useState([]);
  //Output state
  const [Text, setText] = useState("");
  //Reset function
  const ResetForm = () => {
    setDeclare("DeclaredHoliday");
    setType("Day");
    setDay("Monday");
    setNum("First");
    setYears("January");
    setEnds("Never");
    Close();
  };
  //initial value
  const CalaenderValues = {
    school_id: null,
    title: "",
    description: "",
    start_date: new Date().toISOString().slice(0, 10),
    end_date: "",
    recurring_type: "Day",
    recurring_interval: 1,
    recurring_end_date: "",
    day_type: "",
    config_type: "DeclaredHoliday",
    ends: "Never",
    start: "",
  };
  //End Date Validation Schema
  let enddate =
    Declare === "DeclaredHoliday"
      ? Yup.string().required("Field is required")
      : Yup.string();
  //recurring type Validation Schema
  let recurringtype =
    Declare === "Global"
      ? Yup.string().required("Field is required")
      : Yup.string();
  //recurring interval Validation Schema
  let recurring_interval =
    Declare === "Global" && Type !== "Year"
      ? Yup.string().required("Field is required")
      : Yup.string();
  //recurring end date Validation Schema
  let recurring_end_date =
    Ends === "On" ? Yup.string().required("Field is required") : Yup.string();
  //Start Validation Schema
  let Start = "";
  //Config Type Year Validation Schema
  if (Type === "Year") {
    Start =
      Year === 0 && Type === "Year"
        ? Yup.string().required("Field is required")
        : Yup.string();
  } else {
    //config type Month Validation Schema
    Start =
      Month === 0 && Type === "Month"
        ? Yup.string().required("Field is required")
        : Yup.string();
  }
  //Validation Schema
  const CalaenderSchema = Yup.object().shape({
    school_id: Yup.object().nullable().required("Field is required"),
    title: Yup.string().required("Field is required"),
    description: Yup.string(),
    day_type: Yup.string(),
    start_date: Yup.string()
      .required("Field is required")
      //DateValidation
      .test({
        name: "start_date",
        test: function (start_date) {
          const { end_date } = this.parent;
          // Convert date strings to Date objects for comparison
          const startDate = start_date ? new Date(start_date) : null;
          const endDate = end_date ? new Date(end_date) : null;
          // Skip comparison if either start_date or end_date is undefined
          if (!startDate || !endDate) {
            return true;
          }
          // Skip comparison if start_date is equal to end_date
          if (startDate.getTime() === endDate.getTime()) {
            return true;
          }
          // Validate that start_date is less than end_date
          return startDate < endDate;
        },
        message: "Start date must be earlier than end date",
      }),
    end_date: enddate.test({
      name: "end_date",
      //DateValidation
      test: function (end_date) {
        const { start_date } = this.parent;
        // Convert date strings to Date objects for comparison
        const startDate = start_date ? new Date(start_date) : null;
        const endDate = end_date ? new Date(end_date) : null;
        // Skip comparison if either start_date or end_date is undefined
        if (!startDate || !endDate) {
          return true;
        }
        // Skip comparison if start_date is equal to end_date
        if (startDate.getTime() === endDate.getTime()) {
          return true;
        }
        // Validate that end_date is greater than start_date
        return endDate > startDate;
      },
      message: "End date must be later than start date",
    }),
    recurring_type: recurringtype,
    recurring_interval: recurring_interval,
    recurring_interval: recurring_interval,
    recurring_end_date: recurring_end_date.test({
      name: "recurring_end_date",
      test: function (recurring_end_date) {
        const { start_date } = this.parent;
        // Convert date strings to Date objects for comparison
        const startDate = start_date ? new Date(start_date) : null;
        const endDate = recurring_end_date
          ? new Date(recurring_end_date)
          : null;
        // Skip comparison if either start_date or end_date is undefined
        if (!startDate || !endDate) {
          return true;
        }
        // Skip comparison if start_date is equal to end_date
        if (startDate.getTime() === endDate.getTime()) {
          return true;
        }
        // Validate that end_date is greater than start_date
        return endDate > startDate;
      },
      message: "End date must be later than start date",
    }),
    ends: Yup.string(),
    start: Start,
    config_type: Yup.string().required("Field is required"),
  });
  //Selected Weekdays Mapping
  const weekdayMapping = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  };
  //Selected Days Upadeting
  const WeekUpdater = () => {
    const indices = Weekdays.map((weekday) => weekdayMapping[weekday]);
  };
  //Selected Days Mapping
  const WeekSelector = (props) => {
    const weekdays = props.map((value) => weekdayMapping[value]);
    setSelectedDays(props);
  };
  //Output Text change based on Config type
  const Typechange = (values) => {
    const sortedDays = SelectedDays.slice().sort((a, b) => {
      return Weekdays.indexOf(a) - Weekdays.indexOf(b);
    });
    if (Type === "Day") {
      setText(
        `Occurs every ${values?.recurring_interval} days starting ${
          values?.start_date
        }${
          values.recurring_end_date !== ""
            ? ` until ${values.recurring_end_date} `
            : ""
        }`
      );
    }
    if (Type === "Week") {
      setText(
        `Occurs every ${values?.recurring_interval} weeks on ${sortedDays.map(
          (o) => o
        )} starting ${values?.start_date}${
          values.recurring_end_date !== ""
            ? ` until ${values.recurring_end_date} `
            : ""
        }`
      );
    }
    if (Type === "Month") {
      setText(
        `Occurs every ${values?.recurring_interval} months on ${
          Month === 0 ? values?.start : Num + " " + Day
        }  starting ${values?.start_date}${
          values.recurring_end_date !== ""
            ? ` until ${values.recurring_end_date} `
            : ""
        }`
      );
    }
    if (Type === "Year") {
      setText(
        `Occurs every ${values?.recurring_interval} year on ${
          Year === 0
            ? values?.start + " of " + Num
            : Num + " " + Day + " of " + Years
        }  starting ${values?.start_date}${
          values.recurring_end_date !== ""
            ? ` until ${values.recurring_end_date} `
            : ""
        }`
      );
    }
  };
  //Submit Function
  const handleSubmit = (values) => {
    // Decalare let for conditional changes the data
    let CalaenderData = {};
    if (Declare === "DeclaredHoliday") {
      CalaenderData = {
        school_id: values.school_id.ipss_asset_id,
        title: values.title,
        description: values.description,
        start_date: values.start_date,
        end_date: values.end_date,
        // Working Type
        day_type: "NonWorking",
        // Golbal or Reccuring format
        config_type: values.config_type,
      };
    } else {
      if(Type==="Day"){
        CalaenderData = {
          school_id: values.school_id.ipss_asset_id,
          title: values.title,
          description: values.description,
          start_date: values.start_date,
          recurring_end_date: values.recurring_end_date,
          day_type: "NonWorking",
          config_type: values.config_type,
          recurring_interval:values.recurring_interval,
          recurringtype:Type
        };
      }
      if(Type==="Week"){
        CalaenderData = {
          school_id: values.school_id.ipss_asset_id,
          title: values.title,
          description: values.description,
          start_date: values.start_date,
          recurring_end_date: values.recurring_end_date,
          day_type: "NonWorking",
          config_type: values.config_type,
          recurring_interval:values.recurring_interval,
          day_config:SelectedDays,
          recurringtype:Type
        };
      }
      if(Type==="Month"){
        CalaenderData = {
          school_id: values.school_id.ipss_asset_id,
          title: values.title,
          description: values.description,
          start_date: values.start_date,
          recurring_end_date: values.recurring_end_date,
          day_type: "NonWorking",
          config_type: values.config_type,
          recurring_interval:values.recurring_interval,
          day_config:SelectedDays,
          recurringtype:Type
        };
      }
    }
    console.log(CalaenderData, "Submit Values");
  };
  return (
    <Dialog
      className="dialog-border"
      open={open}
      maxWidth="lg"
      scroll="paper"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Create Event
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
        <style>
          {`
          ::-webkit-scrollbar {
            width: 8px;
          }
      
          ::-webkit-scrollbar-track {
            background-color: #f1f1f1;
          }
      
          ::-webkit-scrollbar-thumb {
            background-color: #888;
          }
        `}
        </style>
        <Formik
          initialValues={CalaenderValues}
          enableReinitialize
          validationSchema={CalaenderSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, errors }) => (
            <Form onChange={Typechange(values)}>
              {/* School Autocomplete */}
              <div style={{ width: "500px", marginTop: "5px" }}>
                <MyAutocomplete
                  name="school_id"
                  label="School"
                  options={School}
                  title={"title"}
                  size="small"
                  getOptionLabel={(option) => option.title}
                />
              </div>
              {/* Custom Textfield */}
              <div style={{ width: "500px", marginTop: "15px" }}>
                <AntTextfield
                  name="title"
                  label="Title"
                  suffix={
                    !Show && (
                      <Button type="primary" onClick={() => setShow(true)}>
                        Add description
                      </Button>
                    )
                  }
                  size="large"
                />
              </div>
              {/* Description Textfield  renderring*/}
              {Show && (
                <div style={{ width: "500px" }}>
                  <AntTextfield
                    name="description"
                    label="Description"
                    suffix={
                      <Button type="text" onClick={() => setShow(false)}>
                        <CloseIcon />
                      </Button>
                    }
                    size="large"
                  />
                </div>
              )}
              {/* Config Type Field */}
              <FormControl component="fieldset" style={{ marginTop: "-2%" }}>
                <RadioGroup
                  row
                  name="config_type"
                  value={values.config_type}
                  onChange={(event) => {
                    //Field value set to config_type
                    setFieldValue("config_type", event.target.value);
                    setDeclare(event.target.value);
                  }}
                >
                  {FormValue?.config_type.map((option) => (
                    <FormControlLabel
                      key={option.id}
                      value={option.id}
                      control={<Radio />}
                      label={option.value}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
              <div style={{ width: "500px" }}>
                <p className="Texts">Start Date</p>
                <AntTextfield
                  name="start_date"
                  label="Start Date"
                  type="date"
                  size="large"
                />
              </div>
              {/* End Date rendring only Config type is DeclaredHolidays */}
              {Declare === "DeclaredHoliday" ? (
                <div style={{ width: "500px" }}>
                  <p className="Texts">End Date</p>
                  <AntTextfield
                    name="end_date"
                    label="End Date"
                    type="date"
                    size="large"
                  />
                </div>
              ) : (
                <>
                  <div
                    style={{
                      width: "500px",
                      display: "flex",
                      gap: "15px",
                      flexWrap: "nowrap",
                      marginTop: "-2%",
                    }}
                  >
                    <div
                      style={{
                        marginTop: "8px",
                        display: "flex",
                        flexWrap: "nowrap",
                      }}
                    >
                      <p className="Texts">Repeat every</p>
                    </div>
                    {/* When Year this Field is not rendred */}
                    {Type !== "Year" && (
                      <div style={{ width: "105px" }}>
                        <AntTextfield name="recurring_interval" size="large" />
                      </div>
                    )}
                    <Field name="recurring_type">
                      {({ field }) => (
                        <div>
                          <Select
                            id="recurring_type"
                            size="small"
                            value={field.value}
                            {...field}
                            onChange={(event) => {
                              setFieldValue(
                                "recurring_type",
                                event.target.value
                              );
                              setType(event.target.value);
                            }}
                            style={{ width: "100%", marginBottom: "10px" }}
                          >
                            {FormValue?.recurring_freq.map((option) => (
                              <MenuItem key={option.id} value={option.value}>
                                {option.value}
                              </MenuItem>
                            ))}
                          </Select>
                        </div>
                      )}
                    </Field>
                  </div>
                  {/* Reccurring type week this will be rendering */}
                  {Type === "Week" && (
                    <div style={{ margin: "10px 0", marginTop: "-2%" }}>
                      {/* Week Selector Component */}
                      <WeekdaysComponent
                        WeekSelector={WeekSelector}
                        index={Week}
                      />
                    </div>
                  )}
                  {/* Reccurring type Month this will be rendering */}
                  {Type === "Month" && (
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "nowrap",
                        marginTop: "-2%",
                      }}
                    >
                      {/* Left side Fields */}
                      <div style={{ width: "100px" }}>
                        <FormControl component="fieldset">
                          <RadioGroup
                            value={Month}
                            onChange={(event) => {
                              setMonth(Number(event.target.value));
                            }}
                          >
                        
                            <FormControlLabel
                              style={{ marginTop: "-8px" }}
                              value={1}
                              control={<Radio />}
                              label="On the"
                            />
                          </RadioGroup>
                        </FormControl>
                      </div>
                      {/* Right side Fields */}
                      <div>
                   
                        <div
                          style={{
                            display: "flex",
                            gap: "15px",
                            flexWrap: "nowrap",
                            marginTop: "-2%",
                          }}
                        >
                          {/* Numbers Field */}
                          <div style={{ width: "150px", marginLeft: "8px" }}>
                            <FormControl fullWidth>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={Num}
                                disabled={Boolean(Month === 0)}
                                size="small"
                                onChange={(event) => setNum(event.target.value)}
                              >
                                {Days.map((option) => (
                                  <MenuItem key={option} value={option}>
                                    {option}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </div>
                          {/* Weekdays Field */}
                          <div>
                            <FormControl fullWidth>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                size="small"
                                value={Day}
                                disabled={Boolean(Month === 0)}
                                onChange={(event) => setDay(event.target.value)}
                              >
                                {Weekdays.map((option) => (
                                  <MenuItem key={option} value={option}>
                                    {option}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* Reccurring type Year this will be rendering */}
                  {Type === "Year" && (
                    <div style={{ display: "flex", flexWrap: "nowrap" }}>
                      {/* Left side Fields */}
                      <div style={{ width: "100px" }}>
                        <FormControl component="fieldset">
                          <RadioGroup
                            value={Year}
                            onChange={(event) => {
                              setYear(Number(event.target.value));
                            }}
                          >
                            {/* <FormControlLabel
                              value={0}
                              label="On day"
                              control={<Radio />}
                            /> */}
                            <FormControlLabel
                              style={{ marginTop: "-5px" }}
                              value={1}
                              control={<Radio />}
                              label="On the"
                            />
                          </RadioGroup>
                        </FormControl>
                      </div>
                      {/* Right side Fields */}
                      <div>
                        {/* 1st Fields */}
                        {/* <div style={{ display: "flex" }}>
                          <div style={{ width: "120px", marginLeft: "8px" }}>
                            <FormControl fullWidth>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={Num}
                                disabled={Boolean(Year === 1)}
                                size="small"
                                onChange={(event) => setNum(event.target.value)}
                              >
                                {monthNames.map((option) => (
                                  <MenuItem key={option} value={option}>
                                    {option}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </div>
                          <div style={{ width: "105px", marginLeft: "8px" }}>
                            <AntTextfield
                              name="start"
                              size="large"
                              dis={Boolean(Year === 1)}
                            />
                          </div>
                        </div> */}
                        {/* 2nd Fields */}
                        <div
                          style={{
                            display: "flex",
                            gap: "15px",
                            flexWrap: "nowrap",
                          }}
                        >
                          {/* Days Field */}
                          <div style={{ width: "100px", marginLeft: "8px" }}>
                            <FormControl fullWidth>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={Num}
                                disabled={Boolean(Year === 0)}
                                size="small"
                                onChange={(event) => setNum(event.target.value)}
                              >
                                {Days.map((option) => (
                                  <MenuItem key={option} value={option}>
                                    {option}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </div>
                          {/* Weekdays Field */}
                          <div>
                            <FormControl fullWidth>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                size="small"
                                value={Day}
                                disabled={Boolean(Year === 0)}
                                onChange={(event) => setDay(event.target.value)}
                              >
                                {Weekdays.map((option) => (
                                  <MenuItem key={option} value={option}>
                                    {option}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </div>
                          <p style={{ marginTop: "10px" }} className="Texts">
                            of
                          </p>
                          {/* Monthname Field */}
                          <div>
                            <FormControl fullWidth>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                size="small"
                                value={Years}
                                disabled={Boolean(Year === 0)}
                                onChange={(event) =>
                                  setYears(event.target.value)
                                }
                              >
                                {monthNames.map((option) => (
                                  <MenuItem key={option} value={option}>
                                    {option}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* End Date Rendering */}
                  <p className="Texts">Ends</p>
                  <div style={{ display: "flex", flexWrap: "nowrap" }}>
                    <RadioGroup
                      name="ends"
                      value={values.ends}
                      onChange={(event) => {
                        setFieldValue("ends", event.target.value);
                        setEnds(event.target.value);
                      }}
                    >
                      <FormControlLabel
                        value="Never"
                        control={<Radio />}
                        label="Never"
                      />
                      <FormControlLabel
                        value="On"
                        control={<Radio />}
                        label="On"
                      />
                    </RadioGroup>
                    <div
                      style={{
                        width: "180px",
                        marginTop: "8.5%",
                        marginLeft: "16px",
                      }}
                    >
                      <AntTextfield
                        name="recurring_end_date"
                        size="large"
                        dis={Boolean(Ends !== "On")}
                        type="date"
                      />
                    </div>
                  </div>
                  {/* Output Text rendering */}
                  <div className="word_break">
                    <p className="Texts">{Text}</p>
                  </div>
                </>
              )}
              {/* Action button rendering */}
              <Stack
                direction="row"
                spacing={4}
                justifyContent="flex-end"
                style={{ right: "0%" }}
              >
                <Button onClick={ResetForm} variant="outlined" color="primary">
                  Close
                </Button>
                <Button htmlType="submit" type="primary">
                  Submit
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
};
export default Calaender;
