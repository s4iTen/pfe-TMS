import { Box, CircularProgress } from "@mui/material";
import React from "react";

const Spinner = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="80vh"
    >
      <CircularProgress color="primary" />
    </Box>
  );
};

export default Spinner;
