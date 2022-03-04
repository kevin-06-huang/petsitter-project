import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  card: {
    margin: theme.spacing(1),
  },
  settingsIcon: {
    margin: '10px',
    color: 'gray',
  },
  name: {
    margin: '10px',
  },
  status: {
    textTransform: 'uppercase',
    color: 'gray',
  },
  settingButton: {
    width: '2em',
    height: '2em',
    midWidth: '1em',
  },
}));
