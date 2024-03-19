import React, { useState, createContext, useContext, useRef } from 'react';
import { Alert, Snackbar } from '@mui/material';

// Create a context for the snackbar
const SnackbarContext = createContext();

// Custom hook to access the snackbar
export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');

  const handleClose = () => {
    setOpen(false);
  };

  const showSnackbar = (text = '', variant = 'success') => {
    setOpen(true);
    setMessage(text);
    setSeverity(variant);
  };

  return { open, message, severity, handleClose, showSnackbar };
};

// CustomSnackbar component
const CustomSnackbar = () => {
  const { open, message, severity, handleClose } = useSnackbar();

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

// SnackbarProvider component
export const SnackbarProvider = ({ children }) => {
  const showSnackbarRef = useRef();

  const showSnackbar = (text, variant) => {
    showSnackbarRef.current(text, variant);
  };

  const value = {
    showSnackbar: showSnackbar,
  };

  return (
    <SnackbarContext.Provider value={value}>
      <>
        <CustomSnackbar ref={showSnackbarRef} />
        {children}
      </>
    </SnackbarContext.Provider>
  );
};

export default CustomSnackbar;
