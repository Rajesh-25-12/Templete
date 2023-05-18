import * as Yup from 'yup'
export const VehicleSchema = Yup.object().shape({
  asset_identifier: Yup.string()
  .required('Field is required')
  .matches(/^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$/, 'Invalid vehicle number format'),
asset_type: Yup.string(),
  title: Yup.string(),
  asset_role:Yup.string(),
  asset_attributes:Yup.object().shape({
    Chassisno: Yup.number().positive("Must be positive").typeError("Must be a number"),
    EngineNo: Yup.number().positive("Must be positive").typeError("Must be a number"),
    RCno: Yup.number().positive("Must be positive").typeError("Must be a number"),
    FCno: Yup.number().positive("Must be positive").typeError("Must be a number"),

    RCExpdate: Yup.date()
      .typeError("Invalid Date")
      .nullable()
      .max(new Date(2099, 12, 31), "Date must be before or on 31st December 2099"),
    FCExpdate: Yup.date()
      .typeError("Invalid Date")
      .nullable()
      .max(new Date(2099, 12, 31), "Date must be before or on 31st December 2099"),
    Emissionexpdate: Yup.date()
      .typeError("Invalid Date")
      .nullable()
      .max(new Date(2099, 12, 31), "Date must be before or on 31st December 2099"),
    Insuexpdate: Yup.date()
      .typeError("Invalid Date")
      .nullable()
      .max(new Date(2099, 12, 31), "Date must be before or on 31st December 2099")
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
    speed: Yup.number().typeError("Must be a number"),
    Attachment: Yup.string(),
    Attachment1: Yup.string(),
    Attachment2: Yup.string(),
    Attachment3: Yup.string(),
    Attachment4: Yup.string(),

  })
  
});

export const VehicleinitialValues = {
  asset_identifier: "",
  asset_type: "Vehicle",
  title: "",
  asset_role: "Vehicle",
  asset_attributes: {
    Chassisno: "",
    EngineNo: "",
    RCno: "",
    FCno: "",
    RCExpdate: null,
    FCExpdate: null,
    Emissionexpdate: null,
    Insuexpdate: null,
    SeatCapacity: "",
    FuelCapacity: "",
    FuelType: "",
    kmpl: "",
    speed: "",
    Attachment: "",
    Attachment1: "",
    Attachment2: "",
    Attachment3: "",
    Attachment4: "",

  },
};
export const UserSchema=Yup.object().shape({
    name:Yup.string().required("Field is required"),
    mobile: Yup.string().required("Field is required").matches(/^\d{10}$/, "Invalid mobile number"),
    Role:Yup.object().required("Field is required")
})

export const RouteSchema=Yup.object().shape({
    routeno: Yup.number().positive("Must be positive"),
    name: Yup.string(),
    is_active:Yup.boolean(),
    details: Yup.array().of(
      Yup.object().shape({
        stop_sequence: Yup.number().positive("Must be positive"),
        stop_lat: Yup.number().positive("Must be positive").typeError("Must be number"),
        stop_lng: Yup.number().positive("Must be positive").typeError("Must be number"),
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
export   const RouteValues = {
  routeno: 0,
  name: "",
  is_active:true,
  details: [
    {
      stop_sequence: 0,
      stop_name:"",
      stop_lat: "",
      stop_lng: "",
      is_active:false,
      location:"",
      arrival_time_up: "",
      arrival_time_down:"",
      depart_time_up: "",
      depart_time_down: "",
    },
  ],
};