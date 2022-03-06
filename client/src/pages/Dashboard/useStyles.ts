import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  title: {
    textAlign: 'center',
    marginTop: 40,
  },
  form: {
    textAlign: 'center',
    width: '40vw',
    display: 'flex',
    margin: 'auto',
  },
  submit: {
    textTransform: 'uppercase',
    borderRadius: 8,
    border: '1px solid #dbdbdb',
  },
  searchIcon: {
    position: 'absolute',
  },
  showMore: {
    paddingBottom: 40,
    display: 'none',
  },
  box: {
    paddingLeft: 170,
    paddingRight: 170,
    margin: 'auto',
  },
  card: {
    margin: 30,
  },
}));

export default useStyles;
