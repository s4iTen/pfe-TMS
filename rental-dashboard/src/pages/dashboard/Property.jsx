import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import Spinner from "../../components/Spinner";
import PropertyComponent from "../../components/PropertyComponent";

const Property = () => {
  const { _id } = useParams();
  const property = useSelector((state) =>
    state.propertyReducer.data.find((prop) => prop._id === _id)
  );

  if (!property) {
    return <Spinner />;
  }

  return (
    <>
      <Typography variant="h3">property</Typography>
      <PropertyComponent property={property} />
    </>
  );
};

export default Property;
