import * as Yup from "yup";
export const VehicleSchema = Yup.object().shape({
  asset_identifier: Yup.string()
    .required("Field is required")
    .matches(/^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$/, "Invalid vehicle number format"),
  asset_type: Yup.string(),
  title: Yup.string(),
  asset_role: Yup.string(),
  over_speed: Yup.number().typeError("Must be a number"),
  asset_attributes: Yup.object().shape({
    Chassisno: Yup.number()
      .positive("Must be positive")
      .typeError("Must be a number"),
    EngineNo: Yup.number()
      .positive("Must be positive")
      .typeError("Must be a number"),
    RCno: Yup.number()
      .positive("Must be positive")
      .typeError("Must be a number"),
    FCno: Yup.number()
      .positive("Must be positive")
      .typeError("Must be a number"),
    RCExpdate: Yup.date()
      .typeError("Invalid Date")
      .nullable()
      .max(
        new Date(2099, 12, 31),
        "Date must be before or on 31st December 2099"
      ),
    FCExpdate: Yup.date()
      .typeError("Invalid Date")
      .nullable()
      .max(
        new Date(2099, 12, 31),
        "Date must be before or on 31st December 2099"
      ),
    Emissionexpdate: Yup.date()
      .typeError("Invalid Date")
      .nullable()
      .max(
        new Date(2099, 12, 31),
        "Date must be before or on 31st December 2099"
      ),
    Insuexpdate: Yup.date()
      .typeError("Invalid Date")
      .nullable()
      .max(
        new Date(2099, 12, 31),
        "Date must be before or on 31st December 2099"
      )
      .test("four-digit-year", "Year must be in four-digit format", (value) => {
        if (value) {
          const year = new Date(value).getFullYear();
          return String(year).length === 4;
        }
        return true;
      }),
    Permitexpirydate: Yup.date()
      .typeError("Invalid Date")
      .nullable()
      .max(
        new Date(2099, 12, 31),
        "Date must be before or on 31st December 2099"
      )
      .test("four-digit-year", "Year must be in four-digit format", (value) => {
        if (value) {
          const year = new Date(value).getFullYear();
          return String(year).length === 4;
        }
        return true;
      }),
    Taxexpirydate: Yup.date()
      .typeError("Invalid Date")
      .nullable()
      .max(
        new Date(2099, 12, 31),
        "Date must be before or on 31st December 2099"
      )
      .test("four-digit-year", "Year must be in four-digit format", (value) => {
        if (value) {
          const year = new Date(value).getFullYear();
          return String(year).length === 4;
        }
        return true;
      }),
    SeatCapacity: Yup.number().typeError("Must be a number"),
    FuelCapacity: Yup.number().typeError("Must be a number"),
    FuelType: Yup.string(),
    kmpl: Yup.number().typeError("Must be a number"),
    TaxNo: Yup.number().typeError("Must be a number"),
    PermitNo: Yup.number().typeError("Must be a number"),
    Attachment: Yup.string(),
    Attachment1: Yup.string(),
    Attachment2: Yup.string(),
    Attachment3: Yup.string(),
    Attachment4: Yup.string(),
  }),
});

export const VehicleinitialValues = {
  asset_identifier: "",
  asset_type: "Vehicle",
  title: "",
  asset_role: "Vehicle",
  over_speed: "",
  asset_attributes: {
    Chassisno: "",
    EngineNo: "",
    RCno: "",
    FCno: "",
    RCExpdate: null,
    FCExpdate: null,
    Emissionexpdate: null,
    Permitexpirydate: null,
    Taxexpirydate: null,
    Insuexpdate: null,
    TaxNo: "",
    PermitNo: "",
    SeatCapacity: "",
    FuelCapacity: "",
    FuelType: "",
    kmpl: "",
    Attachment: "",
    Attachment1: "",
    Attachment2: "",
    Attachment3: "",
    Attachment4: "",
  },
};
export const UserSchema = Yup.object().shape({
  name: Yup.string().required("Field is required"),
  mobile: Yup.string()
    .required("Field is required")
    .matches(/^\d{10}$/, "Invalid mobile number"),
  Role: Yup.object().required("Field is required"),
});

export const RouteSchema = Yup.object().shape({
  routeno: Yup.object().nullable().required("Field is required"),
  name: Yup.string(),
  is_active: Yup.boolean(),
  details: Yup.array().of(
    Yup.object().shape({
      stop_sequence: Yup.number().positive("Must be positive"),
      stop_lat: Yup.number()
        .positive("Must be positive")
        .typeError("Must be number"),
      stop_lng: Yup.number()
        .positive("Must be positive")
        .typeError("Must be number"),
      stop_name: Yup.string(),
      name: Yup.string(),
      location: Yup.string(),
      arrival_time_up: Yup.string(),
      arrival_time_down: Yup.string(),
      depart_time_up: Yup.string(),
      depart_time_down: Yup.string(),
    })
  ),
});
export const RouteValues = {
  routeno: null,
  name: "",
  is_active: true,
  details: [
    {
      stop_sequence: 0,
      stop_name: "",
      stop_lat: "",
      stop_lng: "",
      is_active: false,
      location: "",
      arrival_time_up: "",
      arrival_time_down: "",
      depart_time_up: "",
      depart_time_down: "",
    },
  ],
};

export const CalaenderSchema = Yup.object().shape({
  title: Yup.string().required("Field is required"),
  description: Yup.string(),
  day_type: Yup.string(),
  config_type: Yup.string().required("Field is required"),
  start_date: Yup.string().required("Field is required"),
  end_date: Yup.string().when("config_type", {
    is: (value) => value === "DeclaredHoliday",
    then: Yup.string().required("Field is required"),
    otherwise: Yup.string(),
  }),
  recurring_type: Yup.string().when("config_type", {
    is: (value) => value === "Global",
    then: Yup.string().required("Field is required"),
    otherwise: Yup.string(),
  }),
  recurring_interval: Yup.string().when("config_type", {
    is: (value) => value === "Global",
    then: Yup.string().required("Field is required"),
    otherwise: Yup.string(),
  }),
  day_config: Yup.object().when("config_type", {
    is: (value) => value === "Global",
    then: Yup.object().required("Field is required"),
    otherwise: Yup.object(),
  }),
  recurring_end_date: Yup.string().when("ends", {
    is: (value) => value === "On",
    then: Yup.string().required("Field is required"),
    otherwise: Yup.string(),
  }),
});

export const CalaenderValues = {
  title: "",
  description: "",
  start_date: "",
  end_date: "",
  recurring_type: "",
  recurring_interval: 0,
  recurring_end_date: "",
  day_type: "",
  config_type: "Global",
  day_config: {},
};
