import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(15),
  },
  imageGrid: {
    height: '100vh',
  },
  imageInfo: {
    objectFit: 'cover',
    width: '100%',
    height: '100vh',
  },
  column: {
    marginTop: '20vh',
  },
  pageLabel: {
    textAlign: 'center',
  },
  dogLabel: {
    width: '12vw',
    height: '9vh',
  },
  dropInfo: {
    width: '50%',
    marginTop: 100,
  },
  dates: {
    marginTop: 10,
  },
  formLabel: {
    textTransform: 'uppercase',
  },
  input: {
    width: '4%',
    color: 'black',
  },
  box: {
    width: '50%',
    height: '50%',
  },
  submit: {
    margin: theme.spacing(3, 2, 2),
    padding: 10,
    width: 160,
    height: 56,
    borderRadius: theme.shape.borderRadius,
    marginTop: 49,
    fontSize: 16,
    fontWeight: 'bold',
  },
}));

export default useStyles;
