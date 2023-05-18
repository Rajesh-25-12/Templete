import React from 'react';
import { TextField } from '@mui/material';
import { useFormikContext, getIn } from 'formik';

const MyTextField = ({ name, label, type = 'text' }) => {
  const { values, errors, touched, handleChange, handleBlur } = useFormikContext();

  const fieldValue = getIn(values, name);
  const fieldError = getIn(errors, name);
  const fieldTouched = getIn(touched, name);

  return (
    <TextField
      type={type}
      name={name}
      size='small'
      label={label}
      fullWidth
      value={fieldValue}
      onChange={handleChange}
      onBlur={handleBlur}
      error={fieldTouched && !!fieldError}
      helperText={fieldTouched && fieldError}
      InputLabelProps={type === 'time'||"date"? { shrink: true } : {}}
     
    />
  );
};

export default MyTextField;
