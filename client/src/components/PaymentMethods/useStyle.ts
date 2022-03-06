import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  button: {
    alignSelf: 'start',
  },

  paymentCards: {
    margin: '5vh',
    paddingTop: '2vh',
    width: '90%',
  },

  label: {
    alignSelf: 'center',
    color: 'grey',
  },

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
