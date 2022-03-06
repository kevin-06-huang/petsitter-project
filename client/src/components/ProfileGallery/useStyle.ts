import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  image: {
    width: '100px',
    height: '100px',

    '& img': {
      width: '100%',
    },
  },
}));
