import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/system";
import { ACCESS_TOKEN } from "./Endpoints";



export const Helpers = {
  useMediaQuery: (directions, category) => {
    if (!directions || !category) {
      throw Error("Parameters are missing...");
    }
    const theme = useTheme();
    return useMediaQuery(theme.breakpoints[directions](category));
  },
    useHeader:() => { 
    if (localStorage.getItem(ACCESS_TOKEN)) {
      const headers = {'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}
      return  {headers};
    }
    else{
      return null
    }
  }


};
