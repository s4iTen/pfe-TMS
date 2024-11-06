import React from "react";
import useFetch from "../../hooks/useFetch";
import { getProperty } from "../../store/property/action";
import { Typography } from "@mui/material";
import CardList from "../../components/CardList";
import { useProperty } from "../../hooks/useProperty";
import Spinner from "../../components/Spinner";
import { useSelector } from "react-redux";

const RentedProperties = () => {
  const userId = useSelector((state) => state.global.userId);
  const { data, loading, error } = useFetch(
    getProperty,
    (state) => state.propertyReducer
  );
  const { handleDelete, handleEdit, handlePageChange } =
    useProperty("property");

  if (loading === "loading") return <Spinner />;
  if (error) return <p>Error loading properties: {error}</p>;

  const filteredProperties = data.filter(
    (property) => property.userOwner === userId && property.rentStatus === true
  );

  return (
    <>
      <Typography variant="h3">My Rented Properties</Typography>
      <CardList
        data={filteredProperties}
        handlePageChange={handlePageChange}
        type={"property"}
      />
    </>
  );
};

export default RentedProperties;
