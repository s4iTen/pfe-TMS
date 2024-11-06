import { styled } from "@mui/material";
import React from "react";
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme }) => ({
    backgroundColor: theme.palette.background.alt,
    minHeight: "93vh",
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-250px`,
    variants: [
      {
        props: ({ open }) => open,
        style: {
          transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: 0,
        },
      },
    ],
  })
);
const DashContainer = ({ open, children, sx = { mt: "7vh" } }) => {
  return (
    <Main open={open} sx={sx}>
      {children}
    </Main>
  );
};

export default DashContainer;
