import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Box, TextField } from "@mui/material";
import SignupService from "../Services/Auth/Signup.service";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function RegisterModal({
  openRegisterModal,
  setOpenRegisterModal,
  setOpenLoginModal,
}) {
  const [signupRequest, setSignupRequest] = React.useState({
    name: "",
    email: "",
    password: "",
    passwordAgain: "",
  });

  const navigate = useNavigate()
  const handleClose = () => {
    setOpenRegisterModal(false);
  };
  const { enqueueSnackbar } = useSnackbar();

  function registerValidater({ name, email, password, passwordAgain }) {
    let isValid = false;
    if (!name) {
      isValid = false;
      throw new Error("isim giriniz!");
    } else if (!name.match(/^[A-Za-z\s]*$/)) {
      isValid = false;
      throw new Error("İsim yalnızca harflerden oluşmalıdır");
    } else if (name.length < 4) {
      isValid = false;
      throw new Error("isim en az 4 basamaklı olmalıdır!");
    }

    if (!email) {
      isValid = false;
      throw new Error("E-posta griniz!");
    } else if (
      !email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      isValid = false;
      throw new Error("Geçerli bir E-posta giriniz!");
    }

    if (!password) {
      isValid = false;
      throw new Error("Şifre giriniz!");
    } else if (parseInt(password.length) < 6) {
      isValid = false;
      throw new Error("Şifreniz en az 6 basamaklı olmalıdır!");
    } else if (!passwordAgain) {
      isValid = false;
      throw new Error("Şifre Tekrar alanı boş geçilemez!");
    } else if (password && passwordAgain && password !== passwordAgain) {
      isValid = false;
      throw new Error("Şifreler eşleşmiyor!");
    }

    return (isValid = true);
  }

  async function handleRegister() {
    try {
      if (registerValidater(signupRequest)) {
        const result = await SignupService.PostSignUp(
          (({ signupRequest: { name, email, password } }) => ({
            signupRequest: { name, email, password },
          }))({ signupRequest })
        );
        if (result) {
          
          enqueueSnackbar("Giriş sayfasına yönlendiriliyorsunuz!", { variant: "success" });
          enqueueSnackbar("Başarıyla kayıt yapıldı!", { variant: "success"});
          setTimeout(() => {
            setOpenRegisterModal(false)
            setOpenLoginModal(true)
            navigate("/")
          }, 1500);
          
        }
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  }

  function handleInputChange(e) {
    setSignupRequest((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <>
      <Dialog
        open={openRegisterModal}
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
        <DialogTitle alignSelf={"center"} fontWeight={"bold"} variant={"h4"}>
          {"KAYIT OL"}
        </DialogTitle>
        <DialogContent>
          <TextField
            variant="standard"
            color="primary"
            name="name"
            onChange={handleInputChange}
            fullWidth
            label={"Ad Soyad"}
          />
          <TextField
            variant="standard"
            color="primary"
            type={"email"}
            name={"email"}
            onChange={handleInputChange}
            required
            fullWidth
            label={"E-posta"}
          />
          <TextField
            variant="standard"
            color="primary"
            type={"password"}
            name={"password"}
            onChange={handleInputChange}
            fullWidth
            label={"Parola"}
          ></TextField>
          <TextField
            variant="standard"
            color="primary"
            type={"password"}
            name={"passwordAgain"}
            onChange={handleInputChange}
            fullWidth
            label={"Parola Tekrar"}
          />
        </DialogContent>
        <DialogContent>
          <Box textAlign={"center"}>
            <Button
              sx={{ borderRadius: 20, width: "200px" }}
              size={"large"}
              variant="contained"
              onClick={handleRegister}
            >
              Kayıt Ol
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
