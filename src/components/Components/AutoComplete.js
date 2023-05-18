import React from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { useFormikContext, getIn } from 'formik';
const MyAutocomplete = ({ name, label, type = 'text', options,getOptionLabel}) => {
    const { values, errors, touched, handleChange, handleBlur } = useFormikContext();
  
    const fieldValue = getIn(values, name);
    const fieldError = getIn(errors, name);
    const fieldTouched = getIn(touched, name);
    return (
      <Autocomplete
        options={options} 
        getOptionLabel={getOptionLabel} 
        value={fieldValue}
        onChange={(event, newValue) => {
          handleChange({
            target: {
              name: name,
              value: newValue,
            },
          });
        }}
        onBlur={handleBlur}
        renderInput={(params) => (
          <TextField
            {...params}
            type={type}
            name={name}
            label={label}
            error={fieldTouched && !!fieldError}
            helperText={fieldTouched && fieldError}
          />
        )}
      />
    );
  };
  export default MyAutocomplete
  