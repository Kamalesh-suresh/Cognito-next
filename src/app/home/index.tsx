import React from "react";
import { useMyContext } from "../contexts/appContext";
import { Typography } from "@mui/joy";

const Landing = () => {
  const { data, setData } = useMyContext();
  return (
    <Typography ml={4} sx={{ fontSize: "22px" }}>
      {data}
    </Typography>
  );
};

export default Landing;
