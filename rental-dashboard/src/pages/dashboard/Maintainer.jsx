import React from "react";
import CardList from "../../components/CardList";
import useFetch from "../../hooks/useFetch";
import { getMaintainer } from "../../store/maintainer/action";
import { Typography } from "@mui/material";

const Maintainer = () => {
  const { data } = useFetch(getMaintainer, (state) => state.maintainerReducer);

  return (
    <>
      <Typography variant="h3">My Maintainers</Typography>
      <CardList data={data} ButtonText={"Contact Maintainer"} type="tenant" />
    </>
  );
};

export default Maintainer;
