import { IconButton, styled, Toolbar } from "@mui/material";
import React, { useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar from "@mui/material/AppBar";
import DarkModeButton from "./DarkModeButton";
import UserAvatar from "./UserAvatar";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../store/user/actions";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, drawerWidth }) => ({
  backgroundColor: theme.palette.background.default,
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `-${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const DashNavBar = ({ drawerWidth, open, handleDrawerOpen }) => {
  const userId = useSelector((state) => state.global.userId);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(getUser());
    }
  }, [userId, dispatch]);
  return (
    <AppBar position="fixed" drawerWidth={drawerWidth} open={open}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={[
            {
              mr: 2,
            },
          ]}
        >
          <MenuIcon />
        </IconButton>
        <div className="flex gap-6">
          <UserAvatar />
          <DarkModeButton />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default DashNavBar;
