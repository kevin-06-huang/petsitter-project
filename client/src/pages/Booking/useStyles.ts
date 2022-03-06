import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: theme.palette.background.default,
    padding: '50px',
    height: 'calc(100% - 106px)',
  },

  paperContainer: {
    padding: '30px',
  },

  label: {
    margin: '15px 0',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },

  settingButton: {
    width: '1em',
    height: '2em',
    maxWidth: '1em',
  },

  bookingList: {
    height: 'calc(100vh - 450px)',
    width: '100%',
    maxHeight: '100%',
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      width: '0.3em',
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px #EAEAEA',
      webkitBoxShadow: 'inset 0 0 6px #EAEAEA',
      borderRadius: '10px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#A9A9A9',
      borderRadius: '10px',
    },
  },
}));
