import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Avatar, Box, Grid, Stack, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import LoginService from "../Services/Auth/Login.service";
import { useDispatch } from "react-redux";
import { login } from "../Store/UserSlice";
import GoogleIcon from "@mui/icons-material/Google";
import { ACCESS_TOKEN, Endpoints } from "../Utility/Endpoints";
import LoginWithEmail from "./LoginWithEmail.component";
import LoginWithGoogle from "./LoginWithGoogle.component";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function LoginModal({
  openLoginModal,
  setOpenLoginModal,
  setOpenRegisterModal,
}) {
  const dispatch = useDispatch();
  const [loginRequest, setLoginRequest] = React.useState({
    email: "",
    password: "",
  });
  const [userWantsEmail, setUserWantsEmail] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleClose = () => {
    setOpenLoginModal(false);
  };
  function handleNavOpen() {
    setOpenLoginModal(false);
    setOpenRegisterModal(true);
  }
  function handleInputChange(e) {
    setLoginRequest((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }
  async function handleLogin() {
    try {
      const result = await LoginService.PostLogIn({ loginRequest });
      if (result) {
        localStorage.setItem(ACCESS_TOKEN, result.data.accessToken);
        dispatch(
          login({
            token: result.data.accessToken,
            isLoggedIn: true,
          })
        );
        enqueueSnackbar("Başarıyla Giriş Yapıldı!", { variant: "success" });
        setTimeout(() => {
          setOpenLoginModal(false);
        }, 1500);
      }
    } catch (error) {
      if (!loginRequest.email || !loginRequest.password) {
        enqueueSnackbar("Lütfen Tüm Alanları Doldurunuz!", {
          variant: "error",
        });
      } else {
        enqueueSnackbar("Kullanıcı Bulunamadı!", { variant: "error" });
      }
    }
  }

  
  return (
    <Dialog
      open={openLoginModal}
      transitionDuration={750}
      PaperProps={{
        style: {
          borderRadius: 30,
          width: "100%",
          marginLeft: 0,
          marginRight: 0,
        },
      }}
      TransitionComponent={Transition}
      keepMounted
      fullWidth
      maxWidth={"sm"}
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >

      <DialogTitle  alignSelf={"center"}  variant={"h5"}>
        {"Hesabınıza giriş yapınız"}
      </DialogTitle>

      {userWantsEmail ? (
        <LoginWithEmail
          handleLogin={handleLogin}
          handleInputChange={handleInputChange}
        />
      ) : (
        <LoginWithGoogle />
      )}

      <Stack
        mt={userWantsEmail ? 0 : 2}
        textAlign={"center"}
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Typography>
          {!userWantsEmail ? "E-mail" : "Google"} ile giriş yapmak için
        </Typography>
        <Button
          sx={{ fontWeight: "bold", fontSize: "16px" }}
          variant="text"
          onClick={() => setUserWantsEmail(!userWantsEmail)}
        >
          TIKLA
        </Button>
      </Stack>

      <DialogContent>
        <Box>
          <Box
            sx={{
              width: "auto",
              borderBottom: "1px solid gray",
              marginX: 3,
            }}
          ></Box>
        </Box>
      </DialogContent>
      <DialogContent>
        <Grid
          mt={-2}
          container
          gap={1}
          justifyContent={"center"}
          direction={"row"}
          alignItems={"center"}
        >
          <Typography> Hesabın yok mu?</Typography>
          <Button onClick={handleNavOpen} variant="outlined">
            Kayıt Ol
          </Button>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
