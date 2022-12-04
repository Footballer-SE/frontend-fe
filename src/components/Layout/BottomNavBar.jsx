import {
  Box,
  CssBaseline,
  Paper,
  ThemeProvider,
  createTheme,
  Stack,
  IconButton,
  Slide,
  Button,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import * as React from "react";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import QuestionAnswerTwoToneIcon from "@mui/icons-material/QuestionAnswerTwoTone";
import { useSelector } from "react-redux";
import AdvertButton from "../AdvertButton/AdvertButton.component";


function BottomNavBar() {
  const user = useSelector((state) => state.user);
  const theme = createTheme({
    palette: {
      primary: { main: "#148c32" },
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
            background: "#f0f0f0",
            boxShadow: "none",
          }}
          elevation={3}
        >
          <Stack direction="row" justifyContent={"space-evenly"}>
            <Link to="/">
              <IconButton aria-label="delete">
                <HomeTwoToneIcon sx={{ color: "#148c32" }} fontSize="large" />
              </IconButton>
            </Link>
            {true&& (
              <>
                <AdvertButton  />
                <Link to={"/messages"}>
                  <IconButton color="primary" aria-label="Messages">
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
