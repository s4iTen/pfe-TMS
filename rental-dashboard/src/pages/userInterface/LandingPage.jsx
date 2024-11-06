import React from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import France from "../../assets/france.png";
import America from "../../assets/america.png";
import Spain from "../../assets/spain.png";
import London from "../../assets/london.png";
import bg from "../../assets/bg.png";
import building from "../../assets/building.png";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const darkMode = useSelector((state) => state.global.mode);

  return (
    <div
      className={`flex items-center justify-center ${
        darkMode === "dark" ? "bg-[#333]" : "bg-[#FFF]"
      }`}
    >
      <div
        className={`h-[90vh] w-[90vw] flex items-center justify-start px-4 sm:px-8 md:px-16 bg-contain bg-no-repeat bg-center`}
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="w-full sm:w-3/5 md:w-2/5 flex flex-col items-start justify-center gap-6 sm:gap-8 md:gap-10">
          <h1
            className={`font-bold text-2xl sm:text-3xl md:text-3xl lg:text-6xl text-black`}
          >
            Easy way to find a perfect property
          </h1>
          <p className={`text-lg sm:text-lg md:text-xl text-[#585981]`}>
            We provide a complete service for the sale, purchase, or rental of
            real estate.
          </p>
          <button
            className={`w-full sm:w-2/3 md:w-1/3 bg-[#45A9EA] text-white 
            hover:bg-white border-2 border-[#45A9EA] hover:text-[#45A9EA] px-4 py-3 md:px-6 md:py-4 rounded-full 
            text-base sm:text-lg font-bold transition-all duration-500`}
          >
            Explore more
          </button>
        </div>
      </div>
    </div>
  );
};

const countries = [
  { title: "America", imageUrl: America },
  { title: "Spain", imageUrl: Spain },
  { title: "London", imageUrl: London },
  { title: "France", imageUrl: France },
];

const Country = ({ country }) => {
  return (
    <div
      className="xl:w-[20vw] md:w-[35vw] w-[80vw] h-4/5 bg-cover bg-center rounded-3xl shadow-lg flex flex-col justify-start p-4 
      hover:shadow-2xl hover:shadow-black/50 hover:scale-105 transition-all duration-300 cursor-pointer"
      style={{ backgroundImage: `url(${country.imageUrl})` }}
    >
      <h2 className="text-black lg:text-4xl font-bold text-center mt-10">
        {country.title}
      </h2>
    </div>
  );
};

const Countries = () => {
  const darkMode = useSelector((state) => state.global.mode);
  return (
    <div
      className={`flex py-10 flex-col items-center justify-center h-screen ${
        darkMode === "dark" ? "bg-[#333]" : "bg-[#FFF]"
      }`}
    >
      <h1
        className={`text-2xl xl:text-5xl font-bold text-center w-[80vw] xl:w-[35vw] ${
          darkMode === "dark" ? "text-white" : "text-black"
        }`}
      >
        We are available in many well-known countries
      </h1>
      <div className="grid  sm:grid-cols-2  xl:grid-cols-4 justify-center items-center gap-4 space-x-4 mt-8 h-[80vh]">
        {countries.map((country, index) => (
          <Country country={country} key={index} />
        ))}
      </div>
    </div>
  );
};

const Card = ({ house }) => {
  const darkMode = useSelector((state) => state.global.mode);
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/properties/${house._id}`);
  };
  return (
    <div
      onClick={handleCardClick}
      className={`border-2 rounded-lg p-4 flex space-x-4 items-center transition-all duration-300 cursor-pointer ${
        darkMode === "dark"
          ? "border-gray-600 hover:border-blue-400"
          : "border-gray-300 hover:border-blue-500"
      } hover:shadow-xl`}
    >
      <img
        src={`data:image/png;base64,${house.photos[0]}`}
        alt="House"
        className="w-24 h-24 rounded-lg object-cover"
      />
      <div className="flex-1">
        <h1
          className={`font-bold text-lg ${
            darkMode === "dark" ? "text-white" : "text-gray-800"
          }`}
        >
          {house.title}
        </h1>
        <div
          className={`flex space-x-4 text-sm mt-2 ${
            darkMode === "dark" ? "text-gray-400" : "text-gray-500"
          }`}
        >
          <p>{house.bedrooms} Bedroom</p>
          <p>{house.bathrooms} bathroom</p>
        </div>
        <div className="flex justify-between items-center mt-4">
          <p
            className={`text-sm ${
              darkMode === "dark" ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {house.description.length > 50
              ? `${house.description.slice(0, 50)}...`
              : house.description}
          </p>
          <div
            className={`px-4 py-2 rounded-lg font-semibold ${
              darkMode === "dark"
                ? "bg-gray-700 text-gray-200"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            ${house.rent}
          </div>
        </div>
      </div>
    </div>
  );
};

const RecentlyAdded = () => {
  const darkMode = useSelector((state) => state.global.mode);
  const houses = useSelector((state) => state.propertyReducer.data);
  const filteredData = houses.filter(
    (property) => property.rentStatus !== true
  );
  return (
    <div
      className={`p-6 rounded-lg w-full flex flex-col items-center justify-center ${
        darkMode === "dark" ? "bg-[#333]" : "bg-white"
      }`}
    >
      <div className="flex items-center justify-between w-[80vw]">
        <h2
          className={`font-bold text-4xl mb-4 ${
            darkMode === "dark" ? "text-white" : "text-gray-800"
          }`}
        >
          Recently Added
        </h2>
        <p className="text-cyan-500 text-lg font-semibold">See all</p>
      </div>
      <div className="grid  sm:grid-cols-2 xl:grid-cols-3 gap-4 w-[80vw]">
        {filteredData.map((house, index) => (
          <Card key={index} house={house} />
        ))}
      </div>
    </div>
  );
};

const FindYourBest = () => {
  return (
    <div
      className={`flex items-center my-14 bg-gradient-to-b from-[#C3DFED] to-[#DFF0F7] 
      rounded-3xl w-[80vw] mx-auto`}
    >
      <div className="w-1/2 p-8">
        <h2 className="text-5xl font-bold text-gray-800 mb-4">
          Find your best Real Estate
        </h2>
        <p className="text-gray-600 mb-6 text-lg">
          We provide a complete service for the sale, <br /> purchase, or rental
          of real estate.
        </p>
        <button
          className="bg-[#45A9EA] hover:bg-white border-2 border-[#45A9EA] 
          hover:text-[#45A9EA] px-12 py-2 rounded-xl text-lg font-medium text-white transition-all duration-500"
        >
          Contact Us
        </button>
      </div>
      <div className="w-1/2 flex items-end justify-end">
        <img src={building} alt="Building" className="rounded-3xl" />
      </div>
    </div>
  );
};

const LandingPage = () => {
  const darkMode = useSelector((state) => state.global.mode);

  return (
    <Box className={darkMode === "dark" ? "bg-[#333]" : "bg-[#FFF]"}>
      <HeroSection />
      <Countries />
      <RecentlyAdded />
      <FindYourBest />
    </Box>
  );
};

export default LandingPage;
