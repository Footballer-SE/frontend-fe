import { Fragment } from "react";
import { Helpers } from "../Utility/Helpers";

import BottomNavBar from "./BottomNavBar";

const Layout = (props) => {
  const isMdDown = Helpers.useMediaQuery("down", "md");
  return (
    <Fragment>
      <main>{props.children}</main>
      {isMdDown && <BottomNavBar />}
    </Fragment>
  );
};

export default Layout;
