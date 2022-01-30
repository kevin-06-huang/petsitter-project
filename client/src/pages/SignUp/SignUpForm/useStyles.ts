import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  label: {
    fontSize: 19,
    color: 'rgb(0,0,0,0.4)',
    paddingLeft: '5px',
  },
  inputs: {
    marginTop: '1rem',
    height: '2rem',
    padding: '5px',
  },
  forgot: {
    paddingRight: 10,
  },
  submit: {
    color: 'black',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
}));

export default useStyles;
