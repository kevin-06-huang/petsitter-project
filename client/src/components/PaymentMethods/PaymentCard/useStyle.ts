import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

export const useStyles = makeStyles((theme: Theme) => ({
  paymentCard: {
    margin: '20px 5px',
    width: '250px',
    height: '150px',
    padding: '15px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
}));
