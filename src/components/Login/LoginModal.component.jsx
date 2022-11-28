import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Box, Grid, Stack, TextField, Typography } from "@mui/material";
import RegisterModal from "./RegisterModal.component";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function LoginModal({ openLoginModal, setOpenLoginModal,setOpenRegisterModal }) {
  const handleClose = () => {
    setOpenLoginModal(false);
  };

  function handleNavOpen(){
    setOpenLoginModal(false)
    setOpenRegisterModal(true)
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
      <DialogTitle alignSelf={"center"} fontWeight={"bold"} variant={"h4"}>
        {"HOŞGELDİNİZ"}
      </DialogTitle>
      <DialogTitle alignSelf={"center"} variant={"body1"}>
        {"Devam Etmek İçin Giriş Yapınız."}
      </DialogTitle>
      <DialogContent >
        <TextField
          variant="standard"
          color="primary"
          fullWidth
          label={"E-posta Adresi"}
        />
        <TextField
          variant="standard"
          color="primary"
          fullWidth
          label={"Parola"}
        />
      </DialogContent>
      <DialogContent>
        <Box textAlign={"center"}>
          <Button
            sx={{ borderRadius: 20, width: "200px" }}
            size={"large"}
            variant="contained"
          >
            {" "}
            Giriş Yap
          </Button>
        </Box>
      </DialogContent>
      <DialogContent>
        <Box textAlign={"center"}>
          <Grid container gap={1} justifyContent={"center"} direction={"row"}>
            <Typography> Hesabın yok mu?</Typography>
            <Button onClick={handleNavOpen} sx={{padding:0}} variant="text" >Kayıt Ol</Button>
            {/**todo link kayıt ol */}
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
