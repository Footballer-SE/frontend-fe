import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/system";

export const Helpers = {
  useMediaQuery: (directions, category) => {
    if (!directions || !category) {
      throw Error("Parameters are missing...");
    }
    const theme = useTheme();
    return useMediaQuery(theme.breakpoints[directions](category));
  },
};
