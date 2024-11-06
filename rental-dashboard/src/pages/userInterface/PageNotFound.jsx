import { Button } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const darkMode = useSelector((state) => state.global.mode);
  const navigate = useNavigate();
  return (
    <div
      className={`flex items-center justify-center h-[60vh] ${
        darkMode === "dark" ? "bg-[#444]" : "bg-gray-100"
      }`}
    >
      <div className="text-center">
        <h1
          className={`text-5xl font-bold ${
            darkMode === "dark" ? "text-white" : "text-gray-800"
          } mb-4`}
        >
          Page Not Found 😢
        </h1>
        <p
          className={`text-lg ${
            darkMode === "dark" ? "text-gray-300" : "text-gray-600"
          } mb-8`}
        >
          We're sorry, but the page you're looking for doesn't exist.
        </p>
        <Button onClick={() => navigate("/")} variant="contained">
          Go Back Home
        </Button>
      </div>
    </div>
  );
};

export default PageNotFound;
