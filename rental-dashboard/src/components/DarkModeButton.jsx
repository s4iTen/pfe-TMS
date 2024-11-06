import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "../store/global/slice";
import { IconButton } from "@mui/material";
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";

const DarkModeButton = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.global.mode);
  return (
    <IconButton onClick={() => dispatch(setMode())}>
      {darkMode === "dark" ? (
        <LightModeOutlined sx={{ fontSize: "25px" }} />
      ) : (
        <DarkModeOutlined sx={{ fontSize: "25px" }} />
      )}
    </IconButton>
  );
};

export default DarkModeButton;
