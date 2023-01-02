import React, { useState } from 'react';
import { Modal, TextField, Button, Paper, makeStyles } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import LoginService from '../Services/Auth/Login.service';
import { Helpers } from '../Utility/Helpers';
import { setUserData } from '../Store/UserSlice';

const UpdatePhoneModal = (props) => {
  const { open, onClose } = props;
  const [phone, setPhone] = useState('');
  const headers = Helpers.useHeader();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const useStyles = {
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: 'white',
      border: '2px solid #000',
      boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.25)',
      width: 400,
      borderRadius:"20px",
      padding:"20px"
    },
  }; 

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  async function handleSubmit() {
    try {
      const result = await LoginService.UpdateUser({id:user.data.data.id,telephoneNumber:phone},headers)
      const data = result.data
      if (data) {
        dispatch(setUserData({data }));
      }
      
    } catch (error) {
      
      console.log("Err:",error);
    }    
    onClose();
  };

  return (
    <Modal   open={open} onClose={onClose} sx={useStyles.modal}>
      <Paper   sx={useStyles.paper}>
        <h2>Telefon Numaranı Güncelle</h2>
        <TextField
          label="Telefon Numarası"
          type={"number"}
          value={phone}
          onChange={handlePhoneChange}
          fullWidth
        />
        <Button onClick={handleSubmit}>Kaydet</Button>
      </Paper>
    </Modal>
  );
};

export default UpdatePhoneModal;
