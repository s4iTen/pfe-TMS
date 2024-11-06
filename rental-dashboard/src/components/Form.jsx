import React from "react";
import { FormControl, useTheme } from "@mui/material";

const Form = ({ children, backgroundColor }) => {
  const theme = useTheme();
  return (
    <FormControl
      fullWidth
      sx={{
        backgroundColor: backgroundColor || theme.palette.background.default,
        minWidth: "40vw",
        padding: 5,
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      {children}
    </FormControl>
  );
};

export default Form;
