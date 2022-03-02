import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: '2%',
    marginLeft: '4%',
    width: '60%',
    borderRadius: '50%',
  },
  avatar: {
    position: 'relative',
    top: '-45px',
  },
  userBackground: {
    width: '100%',
    borderRadius: '8px',
  },
  name: {
    textAlign: 'center',
    position: 'relative',
    top: '-20px',
  },
  descriptionCard: {
    margin: '20px',
    width: '95%',
    padding: '5px',
  },
}));
