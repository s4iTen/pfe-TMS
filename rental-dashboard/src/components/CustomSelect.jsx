import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

const CustomSelect = ({
  handleChange,
  label,
  options = [],
  value = "",
  name,
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel id={`${label}-label`}>{label}</InputLabel>
      <Select
        labelId={`${label}-label`}
        id={`${label}-select`}
        value={value}
        label={label}
        name={name}
        onChange={handleChange}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
