import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/system";
import { ACCESS_TOKEN } from "./Constants/EndpointConstants";
import dayjs from "dayjs";
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
  },
  Date(date , format = "YYYY-MM-DD@HH:mm:ss") {
    if (!date) { return; }
    return dayjs(date).format(format);
  },


};
