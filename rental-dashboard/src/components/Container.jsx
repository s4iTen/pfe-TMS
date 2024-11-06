import React from "react";
import { Box } from "@mui/material";
import logo from "../assets/logo.png";
const Header = ({ title }) => {
  return (
    <div className="flex flex-col items-center justify-center p-3 text-center">
      <img src={logo} alt="logo" className="py-4" />
      <h1 className="font-medium text-xl">Welcome to</h1>
      <h1 className="font-bold text-2xl">Tenant Management System</h1>
      <p>{title}</p>
    </div>
  );
};

const Container = ({ title, hasHeader = true, children }) => {
  return (
    <Box
      sx={{
        bgcolor: "background.alt",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "30vw",
        padding: 5,
        borderRadius: 3,
        minHeight: "55vh",
      }}
    >
      {hasHeader && <Header title={title} />}
      <div className="flex flex-col   w-[25vw] gap-4">{children}</div>
    </Box>
  );
};

export default Container;
