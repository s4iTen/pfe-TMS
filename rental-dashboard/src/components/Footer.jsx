import React from "react";
import { useSelector } from "react-redux";
import logo from "../assets/logo.png";

const FooterList = ({ title, items }) => {
  const darkMode = useSelector((state) => state.global.mode);
  return (
    <div className="flex flex-col space-y-2">
      <h3
        className={`font-bold text-xl ${
          darkMode === "dark" ? "text-white" : "text-black"
        }`}
      >
        {title}
      </h3>
      <ul>
        {items.map((item, index) => (
          <li
            key={index}
            className={`text-lg ${
              darkMode === "dark" ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

const Footer = () => {
  const darkMode = useSelector((state) => state.global.mode);
  const tourItems = ["Features", "Partners", "Pricing", "Product", "Support"];
  const companyItems = ["About Us", "Agents", "Blog", "Media", "Contact Us"];

  return (
    <footer
      className={`${darkMode === "dark" ? "bg-[#333]" : "bg-[#FFF]"} p-8`}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <img src={logo} alt="TMS Logo" className="mb-4" />
          <p
            className={`text-lg ${
              darkMode === "dark" ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        <FooterList title="Take a tour" items={tourItems} />

        <FooterList title="Our Company" items={companyItems} />

        <div className="flex flex-col space-y-2">
          <h3
            className={`font-bold text-xl ${
              darkMode === "dark" ? "text-white" : "text-black"
            }`}
          >
            Subscribe
          </h3>
          <p
            className={`text-lg ${
              darkMode === "dark" ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Subscribe to get the latest property, blog news from us
          </p>
          <div className="flex space-x-2">
            <input
              type="email"
              placeholder="Email Address"
              className={`border p-4 rounded-md w-full ${
                darkMode === "dark"
                  ? "bg-[#444] text-white"
                  : "bg-white text-black"
              }`}
            />
            <button className="bg-blue-500 text-white p-4 rounded-md">→</button>
          </div>
        </div>
      </div>

      <div
        className={`text-center mt-8 border-t pt-4 ${
          darkMode === "dark"
            ? "border-gray-600 text-gray-400"
            : "border-gray-300 text-gray-500"
        }`}
      >
        © 2024 . All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
