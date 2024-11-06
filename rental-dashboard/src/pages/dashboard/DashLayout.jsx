import React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { Outlet } from "react-router-dom";
import DashNavBar from "../../components/DashNavBar";
import SideMenu from "../../components/SideMenu";
import DashContainer from "../../components/DashContainer";

const drawerWidth = 240;

export default function DashLayout({ setOpen, open }) {
  const handleDrawerOpen = () => {
    setOpen(!open);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <DashNavBar
        drawerWidth={drawerWidth}
        handleDrawerOpen={handleDrawerOpen}
        open={open}
      />
      <SideMenu
        open={open}
        handleDrawerClose={handleDrawerClose}
        drawerWidth={drawerWidth}
      />
      <DashContainer
        open={open}
        sx={{ display: "flex", flexDirection: "column", mt: "7vh", gap: 5 }}
      >
        <Outlet />
      </DashContainer>
    </Box>
  );
}
