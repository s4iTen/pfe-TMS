import { FormControl, TextField } from "@mui/material";
import React from "react";

const CustomTextArea = ({ onChange, label, name, value = "", rows = 4 }) => {
  return (
    <FormControl fullWidth variant="outlined">
      <TextField
        id={name}
        label={label}
        multiline
        rows={rows}
        value={value}
        onChange={onChange}
        variant="outlined"
        name={name}
      />
    </FormControl>
  );
};

export default CustomTextArea;
