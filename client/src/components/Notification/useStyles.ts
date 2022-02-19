import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  navbarItem: {
    textDecoration: 'none',
    transition: 'color 120ms ease-in-out',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  navbarItemDescription: {
    color: theme.palette.grey[900],
    marginLeft: '10px',
    fontWeight: 900,
    textDecoration: 'none',
  },
  navbarItemType: {
    color: theme.palette.grey[500],
    marginLeft: '10px',
    marginTop: '-20px',
    fontSize: '12px',
    fontWeight: 900,
    textDecoration: 'none',
  },
  navbarItemDate: {
    color: theme.palette.grey[900],
    marginLeft: '10px',
    marginTop: '-12px',
    fontWeight: 900,
    textDecoration: 'none',
  },
}));
