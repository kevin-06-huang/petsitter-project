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
  profileImage: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 18,
  },
  profileDetails: {
    textAlign: 'center',
  },
  profileName: {
    fontWeight: '600',
  },
  location: {
    marginRight: 6,
  },
  locationName: {
    marginRight: 10,
    paddingTop: 2,
  },
  price: {
    float: 'right',
  },
  footer: {
    padding: 20,
    paddingTop: 4,
    display: 'flex',
    flexDirection: 'row',
    height: '5vh',
  },
}));

export default useStyles;
