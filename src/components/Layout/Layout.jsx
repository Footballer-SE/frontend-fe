import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Fragment } from "react";
import { Helpers } from "../Utility/Helpers";

import BottomNavBar from "./BottomNavBar";
import TopNavBar from "./TopNavBar";

const Layout = (props) => {
  const isMdDown = Helpers.useMediaQuery("down", "md");
  
  return (
    <Fragment>
      <TopNavBar />
      <Grid component={"main"} container spacing={1} pt={1} direction={"row"} justifyContent={"center"} textAlign={"center"} >
       
        <Grid item xs={12} md={12}>
        {props.children}
        </Grid>
       

      </Grid>
      {isMdDown && <BottomNavBar />}
    </Fragment>
  );
};

export default Layout;
