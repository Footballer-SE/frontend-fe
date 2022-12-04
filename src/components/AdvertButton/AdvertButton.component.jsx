import { Button, IconButton, Paper, styled, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import * as React from "react";
import { Helpers } from "../Utility/Helpers";

export default function AdvertButton() {
    const isMdDown = Helpers.useMediaQuery("down", "md");
    const [clicked, setClicked] = React.useState(false);
  


const[StyledFabProps,setStyledFabProps] = React.useState({});

const StyledFab = styled(IconButton)(StyledFabProps);

React.useEffect(() => {
  if (isMdDown) {
    setStyledFabProps({
        zIndex: 2,
        top: clicked ? -30 : 0,
        scale: "1.4",
        background: clicked ? "white" : "#00000000",
    })
  }
  else{
    setStyledFabProps({
        position: "fixed",
        bottom: 16,
        right: 16,
        zIndex: 1,
        scale: "1.8",
        animation:  clicked && "spin 1s linear",
        "@keyframes spin": {
          "0%": {
            transform: "rotate(180deg)",
          },
          "50%": {
            transform: "rotate(0deg)",
          },
        },
    })
  }

  
}, [isMdDown,clicked])


  const StyledPaper = styled(Paper)({
    position: "fixed",
    zIndex: 1,
    bottom: 100,
    border: "1px solid #148c32",
    borderRadius: "20px",
    padding:"10px",
    right:!isMdDown && "10px"
  });
  function showPaper() {
    return (
      <StyledPaper>
        <Typography fontWeight={"bold"} variant={"h6"} textAlign={"center"}>Ne Arıyorsun?</Typography>
        <Stack spacing={1} direction={isMdDown ?  "row":"column"} pt={2}>
          <Button variant="contained" size={isMdDown ? "large": "medium"} >Takım</Button>
          <Button variant="contained" size={isMdDown ? "large": "medium"} >Oyuncu</Button>
          <Button variant="contained" size={isMdDown ? "large": "medium"} >Rakip</Button>
        </Stack>
      </StyledPaper>
    );
  }

  return (
    <>
    {clicked && showPaper()}
    <StyledFab size="large" color="primary" onClick={()=>setClicked(!clicked)}>
      <SportsSoccerIcon fontSize="large" />
    </StyledFab>
    </>
  );
}
