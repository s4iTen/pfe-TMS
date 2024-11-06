import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const CustomDatePicker = ({ label, name, value, onChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={value}
        onChange={(newValue) => {
          onChange({ target: { name, value: newValue } });
        }}
      />
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
