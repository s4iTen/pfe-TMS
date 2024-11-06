import React, { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
} from "@mui/icons-material";
import BarChartIcon from "@mui/icons-material/BarChart";
import BuildIcon from "@mui/icons-material/Build";
import logo from "../assets/logo.png";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import MapIcon from "@mui/icons-material/Map";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
const DrawerHeader = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  display: "flex",
  alignItems: "center",
  gap: 70,
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const navItems = [
  {
    text: "Dashboard",
    icon: <BarChartIcon />,
    lcText: "dashboard",
    url: "dashboard",
  },
  {
    text: "Property",
    icon: <HomeOutlined />,
    lcText: "property",
    url: "property",
  },
  {
    text: "Add Property",
    icon: <AddHomeWorkIcon />,
    lcText: "add-property",
    url: "add-property",
  },
  {
    text: "Rented Properties",
    icon: <HomeWorkIcon />,
    lcText: "rented-properties",
    url: "rented-properties",
  },
  {
    text: "Map",
    icon: <MapIcon />,
    lcText: "mapPage",
    url: "mapPage",
  },
  {
    text: "Maintainer",
    icon: <BuildIcon />,
    lcText: "maintainer",
    url: "maintainer",
  },
  {
    text: "Add Maintainer",
    icon: <PersonAddAlt1Icon />,
    lcText: "add-Maintainer",
    url: "add-Maintainer",
  },
  {
    text: "Expences",
    icon: <AttachMoneyIcon />,
    lcText: "expences",
    url: "expences",
  },
];

const SideMenu = ({ open, drawerWidth, handleDrawerClose }) => {
  const navigate = useNavigate();
  const [active, setActive] = useState("");
  const { pathname } = useLocation();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          backgroundColor: theme.palette.background.default,
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <img src={logo} alt="TMS Logo" className="h-5" />

        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeft />
          ) : (
            <ChevronRightOutlined />
          )}
        </IconButton>
      </DrawerHeader>
      <List>
        {navItems.map(({ lcText, text, icon, url }) => {
          return (
            <ListItem key={text} disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate(`/${url}`);
                  setActive(lcText);
                }}
                sx={{
                  backgroundColor:
                    active === lcText
                      ? theme.palette.primary.main
                      : "transparent",
                  color:
                    active === lcText
                      ? theme.palette.primary.contrastText
                      : theme.palette.primary.contrastText,
                }}
              >
                <ListItemIcon
                  sx={{
                    ml: "1rem",
                    color:
                      active === lcText
                        ? theme.palette.primary.contrastText
                        : theme.palette.primary.contrastText,
                  }}
                >
                  {icon}
                </ListItemIcon>
                <ListItemText primary={text}>
                  {active === lcText && (
                    <ChevronRightOutlined
                      sx={{
                        ml: "auto",
                      }}
                    />
                  )}
                </ListItemText>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

export default SideMenu;
