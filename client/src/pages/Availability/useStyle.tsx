import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 20,
  },
  dropDown: {
    width: '20%',
    height: '10%',
  },
  select: { marginRight: '1rem', fontWeight: 700 },
  newButton: { height: '4.2em', marginTop: 150 },
  newSchedule: { marginTop: 10 },
  scheduleName: { width: '20%' },
  label: { fontWeight: 500, fontSize: '2.4em' },
  week: {
    border: '1px solid #dbdbdb',
    borderWidth: '1px 1px 0px 1px',
  },
  new: {
    height: '4.5rem',
    display: 'flex',
    borderBottom: '1px solid #dbdbdb',
  },
  group: {
    marginTop: 'auto',
    marginBottom: 'auto',
    width: '25%',
    height: '38%',
  },
  checkBoxName: {
    fontSize: '15',
    textTransform: 'capitalize',
  },
  start: {
    fontSize: '25',
    fontWeight: 700,
    width: '35%',
  },
  selectedSchedule: {
    height: '4.5rem',
    display: 'flex',
    borderTop: '1px solid #dbdbdb',
  },
  dropDownSchedule: {
    fontSize: '25',
    marginTop: '3vh',
    marginLeft: '1vw',
  },
  dropDownLabel: {
    fontSize: '15',
    textTransform: 'capitalize',
  },
}));

export default useStyles;
