import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
import { IconButton } from "@mui/material";
import { Menu as MenuIcon, Close } from "@mui/icons-material";
import DarkModeButton from "./DarkModeButton";
import { getUser } from "../store/user/actions";
import UserAvatar from "./UserAvatar";

const pages = [
  { name: "Home", path: "/" },
  { name: "Properties", path: "/properties" },
  { name: "Agents", path: "/agents" },
  { name: "Blog", path: "/blog" },
];

const NavItem = ({ page, toggleMenu }) => {
  const darkMode = useSelector((state) => state.global.mode);

  return (
    <li key={page.name}>
      <NavLink
        to={page.path}
        onClick={toggleMenu}
        className={`${
          page.isButton
            ? `px-6 py-2 border font-medium uppercase rounded-lg text-lg transition ${
                darkMode === "dark"
                  ? "border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
                  : "border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
              }`
            : `px-4 font-medium text-lg uppercase ${
                darkMode === "dark" ? "text-white" : "text-black"
              }`
        }`}
      >
        {page.name}
      </NavLink>
    </li>
  );
};

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const darkMode = useSelector((state) => state.global.mode);
  const userId = useSelector((state) => state.global.userId);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(getUser());
    }
  }, [userId, dispatch]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav
      className={`flex items-center justify-between px-6 sm:px-12 md:px-24 py-6 ${
        darkMode === "dark" ? "bg-[#333]" : "bg-white"
      }`}
    >
      <img src={logo} alt="TMS Logo" className="h-8" />

      <div className="flex items-center space-x-4 xl:hidden">
        <DarkModeButton />
        <IconButton onClick={toggleMenu}>
          {menuOpen ? (
            <Close sx={{ fontSize: "30px" }} />
          ) : (
            <MenuIcon sx={{ fontSize: "30px" }} />
          )}
        </IconButton>
      </div>

      <ul className="hidden xl:flex items-center justify-center space-x-8 list-none">
        {pages.map((page, index) => (
          <NavItem page={page} key={index} />
        ))}

        <li>
          {userId ? (
            <UserAvatar />
          ) : (
            <NavLink
              to="/login"
              className={`px-6 py-2 border font-medium uppercase rounded-lg text-lg transition ${
                darkMode === "dark"
                  ? "border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
                  : "border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
              }`}
            >
              Log In
            </NavLink>
          )}
        </li>

        <li>
          <DarkModeButton />
        </li>
      </ul>

      <ul
        className={`${
          menuOpen ? "flex" : "hidden"
        } flex-col absolute top-[70px] left-0 w-full ${
          darkMode === "dark" ? "bg-[#333] text-white" : "bg-white text-black"
        } xl:hidden p-6 space-y-6`}
      >
        {pages.map((page, index) => (
          <NavItem page={page} key={index} toggleMenu={toggleMenu} />
        ))}

        <li>
          {userId ? (
            <UserAvatar />
          ) : (
            <NavLink
              to="/login"
              className={`px-6 py-2 border font-medium uppercase rounded-lg text-lg transition ${
                darkMode === "dark"
                  ? "border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
                  : "border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
              }`}
            >
              Log In
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
