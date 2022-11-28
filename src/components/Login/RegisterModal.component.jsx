import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Box, Grid, Stack, TextField, Typography } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function RegisterModal({ openRegisterModal, setOpenRegisterModal }) {
  const handleClose = () => {
    setOpenRegisterModal(false);
  };

  return (
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
          fullWidth
          label={"Ad Soyad"}
        />
        <TextField
          variant="standard"
          color="primary"
          fullWidth
          label={"E-posta"}
        />
        <TextField
          variant="standard"
          color="primary"
          fullWidth
          label={"Parola"}
        />
        <TextField
          variant="standard"
          color="primary"
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
          >
            Kayıt Ol
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
