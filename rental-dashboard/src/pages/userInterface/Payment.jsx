import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Button } from "@mui/material";

const Payment = () => {
  const darkMode = useSelector((state) => state.global.mode);
  const propertyData = useSelector((state) => state.propertyReducer.data);
  const data = useLocation();
  const property = propertyData.find(
    (item) => item._id === data.state.property
  );
  const handleCheckout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/create-checkout-session",
        {
          property: property,
          data: data,
          amount: parseInt(data.state.totalPrice) * 100,
        }
      );

      window.location.href = response.data.url;
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <div
      className={`min-h-[60vh] p-10 ${
        darkMode === "dark"
          ? "bg-[#333] text-white"
          : "bg-gray-100 text-gray-800"
      }`}
    >
      <div
        className={`max-w-3xl mx-auto shadow-lg rounded-lg p-6 ${
          darkMode === "dark" ? "bg-[#444]" : "bg-white"
        }`}
      >
        <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

        {/* Cart Items */}
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b pb-4">
            <div className="flex items-center">
              <img
                src={`data:image/png;base64,${property.photos[0]}`}
                alt="Product"
                className="w-28 h-28 rounded object-cover mr-4"
              />
              <div className="w-[70%]">
                <p className="font-semibold">{property.title}</p>
                <p
                  className={`text-gray-500 ${
                    darkMode === "dark" ? "text-gray-200/50" : "text-gray-500"
                  }`}
                >
                  {property.description
                    ? property.description.split(" ").slice(0, 35).join(" ") +
                      "..."
                    : "No description available."}
                </p>
              </div>
            </div>
            <p className="text-lg font-semibold">${data.state.totalPrice}</p>
          </div>
        </div>

        <div className="mt-6 pt-4">
          <div className="flex justify-between text-lg font-semibold">
            <span>Total Price</span>
            <span>${data.state.totalPrice}</span>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <Button
            onClick={handleCheckout}
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 2 }}
          >
            Proceed to Payment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
