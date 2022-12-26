import { Button, IconButton, Paper, styled, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import * as React from "react";
import { Helpers } from "../../Utility/Helpers";
import { useNavigate } from "react-router-dom";
import DialogContext from "../../Store/Dialog.context";
import { useSelector } from "react-redux";
import { DialogIcon } from "../../Utility/Constants/Dialog";
import { COLORS } from "../../Utility/Constants/Colors";

export default function AdvertButton({setOpenLoginModal}) {
  const isMdDown = Helpers.useMediaQuery("down", "md");
  const [clicked, setClicked] = React.useState(false);
  const dialogContext = React.useContext(DialogContext);
  const [StyledFabProps, setStyledFabProps] = React.useState({});
  const user = useSelector((state) => state.user);
  const StyledFab = styled(IconButton)(StyledFabProps);

  React.useEffect(() => {
    if (isMdDown) {
      setStyledFabProps({
        zIndex: 2,
        top: clicked ? -30 : 0,
        scale: "1.4",
        background: clicked ? "white" : "#00000000",
        color: !clicked ? `white`  : `${COLORS.MAIN_GREEN}`
      });
    } else {
      setStyledFabProps({
        position: "fixed",
        bottom: 16,
        right: 16,
        zIndex: 1,
        scale: "1.8",
        animation: clicked && "spin 0.5s linear",
        "@keyframes spin": {
          "100%": {
            transform: "rotate(330deg)",
          },
        },
      });
    }
  }, [isMdDown, clicked]);

  const buttonTexts = [
    { name: "Takım", value: "team" },
    { name: "Oyuncu", value: "player" },
    { name: "Rakip", value: "opponent" },
  ];

  const navigate = useNavigate();
  function handleAdvert(text) {
    if (!user.isLoggedIn) {
      dialogContext.setDialog({
        modalOpen: true,
        showCancelBtn: true,
        callback: () => { setOpenLoginModal(true)
        },
        icon: DialogIcon.info,
        title: "Önce giriş yapmalısın",
        description:
          `${text.name} arama ilanı vermek istiyorsanız önce giriş yapmalısınız`,
        primaryButtonText: "Giriş yap",
      });
    } else {
      navigate(`/advert?type=${text.value}`);
    }
    setClicked(!clicked);
  }

  const StyledPaper = styled(Paper)({
    position: "fixed",
    zIndex: 1,
    bottom: 100,
    border: `1px solid ${COLORS.MAIN_GREEN}`,
    borderRadius: "20px",
    padding: "10px",
    right: !isMdDown && "10px",
  });

  function showPaper() {
    return (
      <StyledPaper>
        <Typography fontWeight={"bold"} variant={"h6"} textAlign={"center"}>
          Ne Arıyorsun?
        </Typography>
        <Stack spacing={1} direction={isMdDown ? "row" : "column"} pt={2}>
          {buttonTexts.map((text) => {
            return (
              <Button
                variant="contained"
                onClick={() => handleAdvert(text)}
                key={text.value}
                size={isMdDown ? "large" : "medium"}
              >
                {text.name}
              </Button>
            );
          })}
        </Stack>
      </StyledPaper>
    );
  }

  return (
    <>
      {clicked && showPaper()}
      <StyledFab
        size="large"
        color="primary"
        onClick={(e) => setClicked(!clicked)}
      >
        <SportsSoccerIcon fontSize="large" />
      </StyledFab>
    </>
  );
}
