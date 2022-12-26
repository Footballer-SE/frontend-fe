import React, {useEffect, useState} from "react";
import DialogContext from "../Dialog.context";
import DialogComponent from "../../Dialog/Dialog.component";
import { DialogIcon } from "../../Utility/Constants/Dialog";

const DialogProviders = ({children}, setDialog) => {

  const getErrorMessage = (err) => {
    if (typeof(err) == 'string') return err;
    else return err?.errors?.[0] ? err?.errors?.[0] : err?.message ? err.message : "Bir hata oluştu.";
  };

  const [value, setValue] = useState({
    modalOpen: false,
    title: undefined,
    description: undefined,
    callback: () => {},
    onClose: ()=>{},
    buttons: [],
    showCancelBtn: undefined,
    onCancel: () =>{},
    onShow: () =>{},
    primaryButtonText: "",
    icon: DialogIcon.info,
    setDialog: (data) => {
      setValue(prevState => ({
        ...prevState,
        ...data
      }))
    },
    showSuccess(success, callback) {
      setValue(prevState => ({
        ...prevState,
        modalOpen: true,
        showCancelBtn: false,
        title: "Başarılı",
        icon: DialogIcon.success,
        description: success || "Başarılı",
        callback: callback
      }))
    },
    showError(error, callback) {
      setValue(prevState => ({
        ...prevState,
        modalOpen: true,
        showCancelBtn: false,
        title: "Hata",
        icon: DialogIcon.danger,
        description: getErrorMessage(error),
        callback: callback
      }))
    },
  });

  useEffect(() => {
    if (!value.modalOpen) {
      value.onClose();
    }
    if (value.modalOpen) {
      value.onShow();
    }
    return () => {
      value.callback = undefined;
      value.primaryButtonText = undefined;
      value.title = undefined;
      value.description = undefined;
      value.showCancelBtn = undefined;
      value.icon = DialogIcon.info
    };
  }, [value]);


  return (
    <DialogContext.Provider value={value} key="dialogProviders">
      {value.modalOpen && <DialogComponent {...value} /> }
      {children}
    </DialogContext.Provider>
  );
};

export default DialogProviders;

