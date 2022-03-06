import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  calendar: {
    width: '100%',
    minWidth: '245px',
    display: 'flex',
    flexDirection: 'column',
    lineHeight: '2em',

    '& button': {
      border: 'none',
      fontFamily: theme.typography.fontFamily,
    },

    '& .react-calendar__navigation': {
      display: 'flex',

      '& button': {
        fontSize: '30px',
        color: 'lightgray',
        background: theme.palette.background.paper,
      },

      '& [class*=prev2-button]': {
        visibility: 'hidden',
      },
      '& [class*=next2-button]': {
        visibility: 'hidden',
      },

      '& [class*=label]': {
        color: theme.palette.primary.main,
        fontSize: '20px',
      },
    },

    '& [class*=weekdays]': {
      display: 'none',
    },

    '& [class*=days]': {
      margin: '10px',
      lineHeight: '2.5em',

      '& [class*=--neighboringMonth]': {
        color: 'lightgray',
      },

      '& button': {
        width: '35px',
        maxWidth: '35px',
        height: '35px',
        margin: '0.5em calc((100% - 245px) / 14)',
      },
    },
  },

  activeDate: {
    background: theme.palette.primary.main,
    color: 'white',
    borderRadius: '50%',
  },

  inactiveDate: {
    background: theme.palette.background.paper,
  },
}));
