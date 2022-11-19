import {
  Box,
  CssBaseline,
  Paper,
  ThemeProvider,
  createTheme,
  Stack,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import * as React from "react";
import HomeIcon from "@mui/icons-material/Home";
import AlarmIcon from "@mui/icons-material/Alarm";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { styled } from "@mui/material/styles";
import Fab from "@mui/material/Fab";
import SportsSoccerRoundedIcon from "@mui/icons-material/SportsSoccerRounded";

// TODO componentlara ayır app.js boşalt
function BottomNavBar() {
  const theme = createTheme({
    palette: {
      primary: { main: "#009688" },
    },
  });
  const StyledFab = styled(Fab)({
    zIndex: 1,
    top: -30,
    margin: "0 20px",
    paddingLeft: "1px",
  });

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <CssBaseline />
        <Paper
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
          elevation={3}
        >
          <Stack direction="row" justifyContent={"space-evenly"}>
            <Link to="/asd">
              <IconButton aria-label="delete">
                <HomeIcon fontSize="large" />
              </IconButton>
            </Link>
            <IconButton aria-label="delete" disabled color="primary">
              <HomeIcon fontSize="large" />
            </IconButton>
            <StyledFab size="large" color="primary">
              <SportsSoccerRoundedIcon fontSize="large" />
            </StyledFab>
            <IconButton
              size="large"
              color="secondary"
              aria-label="add an alarm"
            >
              <AlarmIcon fontSize="inherit" />
            </IconButton>
            <Link to={"/profile"}>
              <IconButton color="primary" aria-label="add to shopping cart">
                <AccountBoxIcon fontSize="large" />
              </IconButton>
            </Link>
          </Stack>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}
export default BottomNavBar;
