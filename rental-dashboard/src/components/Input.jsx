import {
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";
import React from "react";

const CustomInput = ({
  onChange,
  label,
  type = "text",
  endAdornment,
  name,
  value = "",
  error = false,
  helperText = "",
}) => {
  return (
    <FormControl fullWidth error={error}>
      <InputLabel htmlFor={`${name}-input`}>{label}</InputLabel>
      <OutlinedInput
        id={`${name}-input`}
        type={type}
        onChange={onChange}
        endAdornment={endAdornment}
        label={label}
        name={name}
        value={value}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}{" "}
    </FormControl>
  );
};

export default CustomInput;
