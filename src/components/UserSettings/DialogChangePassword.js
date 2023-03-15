import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import FormChangePassword from './FormChangePassword'
import User from '../../scripts/User'

const DialogChangePassword = () => {
  const [open, setOpen] = useState(false)
  return (
    <div>
      {/* <Button onClick={() => setOpen(true)}>Zmień hasło</Button> */}
      <Button variant="outlined" style={{ marginTop: '10px' }} onClick={() => setOpen(true)}>Zmień hasło</Button>

      <Dialog aria-labeledby='dialog-title' arida-describedby='dialog-description' open={open} onClose={() => setOpen(false)}>
        <DialogTitle id='dialog-title'>Zmiana hasła</DialogTitle>
        <DialogContent>
          <FormChangePassword />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Zamknij</Button>
          <Button variant="contained" onClick={() => {User.changePassword(window.formChangePassword)}} autoFocus>Zapisz</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogChangePassword
