import { Grid } from "@mui/material";
import { Fragment } from "react";
import { Helpers } from "../Utility/Helpers";

import BottomNavBar from "./BottomNavBar";
import TopNavBar from "./TopNavBar";

const Layout = (props) => {
  const isMdDown = Helpers.useMediaQuery("down", "md");
  
  return (
    <Fragment>
      <TopNavBar />
      <Grid component={"main"} container direction={"column"} marginLeft={"auto"} marginRight={"auto"} maxWidth={"600px"} justifyContent={"center"} >
      {props.children}
      </Grid>
      {isMdDown && <BottomNavBar />}
    </Fragment>
  );
};

export default Layout;
