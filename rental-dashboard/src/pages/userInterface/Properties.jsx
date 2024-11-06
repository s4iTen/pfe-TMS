import React from "react";
import { useSelector } from "react-redux";
import CardList from "../../components/CardList";
import { useProperty } from "../../hooks/useProperty";

const Properties = () => {
  const darkMode = useSelector((state) => state.global.mode);
  const data = useSelector((state) => state.propertyReducer.data);
  const { handlePageChange } = useProperty("properties");

  const filteredData = data.filter((property) => property.rentStatus !== true);
  if (filteredData.length === 0)
    return (
      <section
        className={`py-12 ${darkMode === "dark" ? "bg-[#444]" : "bg-[#FFF]"}`}
      >
        <h2
          className={`text-xl font-bold text-center mb-8 ${
            darkMode === "dark" ? "text-white" : "text-gray-800"
          }`}
        >
          Sorry we don't have any properties for now🥲
          <br />
          Can you come back later🩷
        </h2>
      </section>
    );
  return (
    <section
      className={`py-12 ${darkMode === "dark" ? "bg-[#444]" : "bg-[#FFF]"}`}
    >
      <div className="container mx-auto px-4">
        <h2
          className={`text-3xl font-bold text-center mb-8 ${
            darkMode === "dark" ? "text-white" : "text-gray-800"
          }`}
        >
          Our Properties
        </h2>
        <CardList
          data={filteredData}
          type={"property"}
          handlePageChange={handlePageChange}
        />
      </div>
    </section>
  );
};

export default Properties;
