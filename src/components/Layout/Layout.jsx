import { Fragment } from "react";
import { Helpers } from "../Utility/Helpers";

import BottomNavBar from "./BottomNavBar";
import TopNavBar from "./TopNavBar";

const Layout = (props) => {
  const isMdDown = Helpers.useMediaQuery("down", "md");
  return (
    <Fragment>
      <TopNavBar />
      <main>{props.children}</main>
      {isMdDown && <BottomNavBar />}
    </Fragment>
  );
};

export default Layout;
