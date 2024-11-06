import { Avatar, Menu, MenuItem, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import profile from "../assets/agent.jpg";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

const UserAvatar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const userId = useSelector((state) => state.global.userId);
  const user = useSelector((state) =>
    state.userReducer.data.find((user) => user._id === userId)
  );

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
    handleClose();
  };

  const handlePageChange = () => {
    navigate("/rents");
    handleClose();
  };

  const handleDashboard = () => {
    navigate("/dashboard");
    handleClose();
  };

  const getUserType = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken.userType;
    }
    return null;
  };

  const userType = getUserType();

  return (
    <>
      <Avatar
        alt={user?.firstName || "User Avatar"}
        src={profile}
        sx={{ width: 40, height: 40, cursor: "pointer" }}
        onClick={handleAvatarClick}
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Typography variant="h6" sx={{ px: 2, py: 1 }}>
          {user?.firstName} {user?.lastName}
        </Typography>

        {userType === "landlord" && (
          <MenuItem onClick={handleDashboard}>Dashboard</MenuItem>
        )}
        <MenuItem onClick={handlePageChange}>My Rents</MenuItem>
        <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
      </Menu>
    </>
  );
};

export default UserAvatar;
