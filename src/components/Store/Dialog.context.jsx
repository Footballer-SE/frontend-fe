import { createContext } from "react";

const DialogContext = createContext({
  modalOpen: false,
  title: undefined,
  description: undefined,
  callback: () => { },
  onClose: () => { },
  onCancel: () => { },
  onShow: () => { },
  primaryButtonText: false,
  buttons: [],
  showCancelBtn: false,
  setDialog: (data) => data,
  showError: (errorMessage, callback) => [errorMessage, callback],
  showSuccess: (success, callback) => [success, callback]
});

export default DialogContext;
