import { useState, useContext, createContext, FunctionComponent, SyntheticEvent, useCallback } from 'react';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface ISnackBarContext {
  updateSnackBarMessage: (message: string) => void;
}

export const SnackBarContext = createContext<ISnackBarContext>({
  updateSnackBarMessage: () => null,
});

export const SnackBarProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [message, setMessage] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const updateSnackBarMessage = useCallback((message: string) => {
    setMessage(message);
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const snackbarHandleClose = useCallback((event: SyntheticEvent | Event, reason: SnackbarCloseReason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  }, []);

  return (
    <SnackBarContext.Provider value={{ updateSnackBarMessage }}>
      {children}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={snackbarHandleClose}
        message={message}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </SnackBarContext.Provider>
  );
};

export function useSnackBar(): ISnackBarContext {
  return useContext(SnackBarContext);
}
