import React, { useEffect } from 'react';
import {Box, Button, DialogActions, DialogContent, DialogContentText,DialogTitle} from "@mui/material";
import Dialog from '@mui/material/Dialog';
import {
  CheckCircleRounded,
  DangerousRounded,
  InfoRounded,
} from "@mui/icons-material";
import { DialogIcon } from '../Utility/Constants/Dialog';



export default function DialogComponent(props) {

  const {
    maxWidth = "sm",
    children,
    modalOpen,
    title,
    description,
    callback,
    primaryButtonText,
    setDialog,
    onCancel,
    buttons,
    showCancelBtn = false,
    icon = DialogIcon.info,
   } = props;

  function handleClose(event, reason){
    if (reason && reason === "backdropClick") return;
    onCancel();
    clear();
  }

  useEffect(() => {
    return () => {
      clear();
    }
  })

  function clear(){
    setDialog({
      modalOpen: false,
      showCancelBtn: false,
      title: undefined,
      description: undefined,
      callback: undefined,
      primaryButtonText: undefined
    })
  }

  function triggerCallback(){
    if (callback) {
      callback(window.open);
    }
    clear();
  }

  const icons = {
    "success": <CheckCircleRounded color={"success"} className={`success`} style={{fontSize:"50px"}}/>,
    "info": <InfoRounded color={"info"} className={`info`} style={{fontSize:"50px"}} />,
    "danger": <DangerousRounded color={"error"} className={`warning`} style={{fontSize:"50px"}}/>
  }

  const titles = {
    "success": "Başarılı",
    "info": "Bilgilendirme",
    "danger": "Uyarı!"
  }

  function renderViewDescription(){
    if (typeof description == "string") {
      return (
        <div dangerouslySetInnerHTML={{__html: (children ? children : description).toString()}}></div>
      )
    }

    return description
  }

  return (
    <div>
      <Dialog
      PaperProps={{
        style: {
          borderRadius: 25,
          width: "100%",
          marginLeft: 0,
          marginRight: 0,
        },
      }}
        open={modalOpen}
        fullWidth={true}
        maxWidth={maxWidth || "sm"}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{textAlign: "center", fontWeight: 600}}>
          {
            icon && icons[icon] && (
              <Box>
                {icons[icon]}
              </Box>
            )
          }
          {title ? title : titles[icon]}
        </DialogTitle>
        <DialogContent>
          <DialogContentText component="div" id="alert-dialog-description" sx={{textAlign: "center", fontWeight: 400, overflowWrap: "break-word"}}>
            {
              renderViewDescription()
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {
            Array.isArray(buttons) && buttons.length > 0 ? buttons : (
              <>
                {showCancelBtn && <Button onClick={handleClose} color="error" variant="outlined">İptal</Button>}
                <Button onClick={triggerCallback} autoFocus color="primary" variant="contained">
                  {primaryButtonText ? primaryButtonText : "Tamam"}
                </Button>
              </>
            )
          }
        </DialogActions>
      </Dialog>
    </div>
  );
}
