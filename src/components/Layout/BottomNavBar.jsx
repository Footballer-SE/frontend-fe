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
import AlarmIcon from "@mui/icons-material/Alarm";
import QuestionAnswerTwoToneIcon from "@mui/icons-material/QuestionAnswerTwoTone";
import { styled } from "@mui/material/styles";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";

// TODO componentlara ayır app.js boşalt
function BottomNavBar() {
  const [clicked, setClicked] = React.useState(false);
  const theme = createTheme({
    palette: {
      primary: { main: "#148c32" },
    },
  });
  const StyledFab = styled(IconButton)({
    zIndex: 2,
    top: clicked ? -30 : 0,
    scale: "1.4",
    background: clicked ? "white" : "#00000000",
  });
  const StyledPaper = styled(Paper)({
    position: "fixed",
    height: "100px",
    width: "250px",
    zIndex: 1,
    bottom: 100,
    display: clicked,
  });
  //TODO STyled paper component yap topnav a da alcan çünkü
  const showAdvertPanel = () => {
    return (
      <StyledPaper>
        <Typography textAlign={"center"}>Ne Arıyorsun?</Typography>
        <Stack direction={"row"} pt={2}>
          <IconButton background={"black"}>Takım</IconButton>
          <IconButton>Oyuncu</IconButton>
          <IconButton>Rakip</IconButton>
        </Stack>
      </StyledPaper>
    );
  };
  const buttonClicked = () => {
    setClicked(!clicked);
  };

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
            {clicked ? showAdvertPanel() : null}
            <StyledFab size="large" color="primary" onClick={buttonClicked}>
              <SportsSoccerIcon fontSize="large" />
            </StyledFab>
            <Link to={"/messages"}>
              <IconButton color="primary" aria-label="Messages">
                <QuestionAnswerTwoToneIcon fontSize="large" />
              </IconButton>
            </Link>
          </Stack>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}
export default BottomNavBar;
