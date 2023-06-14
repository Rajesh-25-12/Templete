import React from "react";
import { Input, Form } from "antd";
import { useFormikContext, getIn } from "formik";

// Define the MyTextField component
const MyTextField = ({ name, label, type, prefix, suffix, dis }) => {
  // Get the formik context values, errors, touched state, and event handlers
  const { values, errors, touched, handleChange, handleBlur } =
    useFormikContext();

  // Extract the specific field value, error, and touched state based on the provided name prop
  const fieldValue = getIn(values, name);
  const fieldError = getIn(errors, name);
  const fieldTouched = getIn(touched, name);

  // Render the component
  return (
    <Form.Item
      // Set the validateStatus prop to "error" if the field has been touched and there is an error
      validateStatus={fieldTouched && fieldError ? "error" : ""}
      // Set the help prop to display the validation error message when the field has been touched and an error exists
      help={fieldTouched && fieldError}
    >
      <Input
        // Set the input type based on the type prop value
        type={type}
        // Set the disabled prop based on the dis prop value
        disabled={dis}
        // Set the name prop to identify the input field
        name={name}
        // Set the size prop to "large" for the input
        size="large"
        // Set the style prop to customize the input's color and placeholder color
        style={{ color: "black", "::placeholder": { color: "black" } }}
        // Set the placeholder prop to display the label as a placeholder
        placeholder={label}
        // Set the value prop to the field value
        value={fieldValue}
        // Set the onChange prop to handle changes in the input value
        onChange={handleChange}
        // Set the onBlur prop to handle the input being blurred
        onBlur={handleBlur}
        // Set the prefix prop to display a prefix element in the input
        prefix={prefix}
        // Set the suffix prop to display a suffix element in the input
        suffix={suffix}
      />
    </Form.Item>
  );
};

export default MyTextField;
