import React, { useMemo } from "react";
import Map from "../../components/Map";
import { useSelector } from "react-redux";
import { useTransformAddress } from "../../hooks/useTransformAddress";
import Spinner from "../../components/Spinner";

const MapPage = () => {
  const properties = useSelector((state) => state.propertyReducer.data);

  const addresses = useMemo(
    () => properties.map((property) => property.adress),
    [properties]
  );

  const { coordinates, loading, error } = useTransformAddress(addresses);

  if (loading === true) return <Spinner />;

  return <Map coordinates={coordinates} />;
};

export default MapPage;
