import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(15),
  },
  imageGrid: {
    backgroundColor: 'red',
    height: '100vh',
  },
  imageInfo: {
    objectFit: 'cover',
    width: '100%',
    height: '100vh',
  },
  dogLabel: {
    width: '170px',
    height: '50px',
  },
  dropInfo: {
    width: '23%',
  },
  dropLabel: {
    width: '46%',
    color: 'black',
    fontWeight: 700,
    fontSize: '12px',
  },
  labelName: {
    textAlign: 'center',
    marginTop: '160px',
    fontSize: '58px',
    fontWeight: '700',
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
