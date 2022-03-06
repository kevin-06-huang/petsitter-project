import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  card: {
    marginTop: '2%',
  },
  avatar: {
    position: 'relative',
    top: '-45px',
  },
  userBackground: {
    width: '100%',
    height: '300px',
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
