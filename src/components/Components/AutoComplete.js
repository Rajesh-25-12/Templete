import React from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { useFormikContext, getIn } from 'formik';

const MyAutocomplete = ({ name, label, type = 'text', size, options, getOptionLabel }) => {
    // Access formik context
  const { values, errors, touched, handleChange, handleBlur } = useFormikContext();
  // Retrieve field value, error, and touched state using getIn utility function
  const fieldValue = getIn(values, name);
  const fieldError = getIn(errors, name);
  const fieldTouched = getIn(touched, name);
  return (
    <Autocomplete
      options={options} // Options for the autocomplete
      getOptionLabel={getOptionLabel} // Function to extract the label from each option
      value={fieldValue} // Current selected value
      onChange={(event, newValue) => {
        handleChange({
          target: {
            name: name,
            value: newValue,
          },
        });
      }} // Handle value change
      onBlur={handleBlur} // Handle input blur
      renderInput={(params) => (
        <TextField
          {...params}
          type={type}
          name={name}
          size={size}
          fullWidth
          label={label}
          error={fieldTouched && !!fieldError} // Set error state based on field being touched and having an error
          helperText={fieldTouched && fieldError} // Display error message if field is touched and has an error
        />
      )}
    />
  );
};
export default MyAutocomplete;
