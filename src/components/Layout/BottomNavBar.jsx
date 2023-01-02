import {
  Box,
  Paper,
  ThemeProvider,
  createTheme,
  Stack,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import * as React from "react";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import QuestionAnswerTwoToneIcon from "@mui/icons-material/QuestionAnswerTwoTone";
import { useSelector } from "react-redux";
import AdvertButton from "../Adverts/AdvertButton/AdvertButton.component"
import { COLORS } from "../Utility/Constants/Colors";


function BottomNavBar() {
  const user = useSelector((state) => state.user);
  const theme = createTheme({
    palette: {
      primary: { main: `${COLORS.MAIN_GREEN}` },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Paper
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            background: `${COLORS.MAIN_GREEN}`,
            boxShadow: "none",
          }}
          elevation={3}
        >
          <Stack direction="row" justifyContent={"space-evenly"}>
            <Link to="/">
              <IconButton aria-label="delete">
                <HomeTwoToneIcon style={{color:"white"}} fontSize="large" />
              </IconButton>
            </Link>
            {user.isLoggedIn && (
              <>
                <AdvertButton  />
                <Link to={"/Apply"}>
                  <IconButton style={{color:"white"}} aria-label="Apply">
                    <QuestionAnswerTwoToneIcon fontSize="large" />
                  </IconButton>
                </Link>
              </>
            )}
          </Stack>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}
export default BottomNavBar;
