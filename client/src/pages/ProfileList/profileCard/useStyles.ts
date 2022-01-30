import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
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
