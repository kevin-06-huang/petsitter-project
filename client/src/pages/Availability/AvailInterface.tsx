import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Field } from 'formik';
import { classicNameResolver } from 'typescript';
import testStyles from './useStyle';
const Time = () => {
  const output = [];
  for (let i = 0; i < 24; i++) {
    const listItem = <MenuItem value={`${i}:00`}>{`${i}:00`}</MenuItem>;
    output.push(listItem);
  }
  return output;
};
const createAvailbilityRow = (day: string, values: any, setFieldValue: any): JSX.Element => {
  const classes = testStyles();
  const handleCheckBox = (e: any) => {
    if (!e.target.checked) {
      setFieldValue(`days[${day}].startTime`, '0');
      setFieldValue(`days[${day}].endTime`, '0');
    } else {
      setFieldValue(`days[${day}].startTime`, '10');
      setFieldValue(`days[${day}].endTime`, '22');
    }
    setFieldValue(`days[${day}].active`, e.target.checked);
  };
  const handleStartTime = (e: any) => {
    if (values.days[day].active) {
      const val = e.target.value;
      const startHour = val.split(':')[0];
      const endHour = values.days[day].endTime.split(':')[0];
      if (startHour == '23') {
        setFieldValue(`days[${day}].endTime`, '0:00');
      } else if (parseInt(startHour) >= parseInt(endHour)) {
        setFieldValue(`days[${day}].endTime`);
      }
      setFieldValue(`days[${day}].startTime`, val);
    }
  };
  const handleEndTime = (e: any) => {
    if (values.days[day].active) {
      const val = e.target.value;
      const endHour = val.split(':')[0];
      const startHour = values.days[day].startTime.split(':')[0];
      if (val == '0:00') {
        setFieldValue(`days[${day}].startTime`, '23:00');
      } else if (parseInt(endHour) <= parseInt(startHour)) {
        setFieldValue(`days[${day}].startTime`);
      }
      setFieldValue(`days[${day}].endTime`, val);
    }
  };
  return (
    <Grid key={day} container columns={3} className={classes.new}>
      <FormGroup className={classes.group}>
        <FormControlLabel
          control={
            <Field
              key={`days[${day}].active`}
              id={`days[${day}].active`}
              name={`days[${day}].active`}
              checked={values.days[day].active}
              onChange={handleCheckBox}
              sx={{ marginLeft: '1.5rem' }}
              type="checkbox"
              component={Checkbox}
            />
          }
          label={
            <Typography
              className={classes.checkBoxName}
              sx={{
                fontWeight: 700,
              }}
            >
              {day}
            </Typography>
          }
        />
      </FormGroup>
      <FormControlLabel
        labelPlacement="start"
        control={
          <Field
            key={`days[${day}].startTime`}
            id={`days[${day}].startTime`}
            name={`days[${day}].startTime`}
            type="time"
            onChange={handleStartTime}
            className={classes.group}
            MenuProps={{
              anchorOrigin: {
                vertical: 'top',
                horizontal: 'right',
              },
            }}
            as={Select}
          >
            {Time()}
          </Field>
        }
        label={
          <Typography
            className={classes.checkBoxName}
            sx={{
              fontWeight: 700,
              marginLeft: '1rem',
              marginRight: '0.5rem',
            }}
          >
            from
          </Typography>
        }
        className={classes.start}
      />
      <FormControlLabel
        labelPlacement="start"
        control={
          <Field
            key={`days[${day}].endTime`}
            id={`days[${day}].endTime`}
            name={`days[${day}].endTime`}
            type="time"
            onChange={handleEndTime}
            className={classes.group}
            MenuProps={{
              anchorOrigin: {
                vertical: 'top',
                horizontal: 'right',
              },
            }}
            as={Select}
          >
            {Time()}
          </Field>
        }
        label={
          <Typography
            className={classes.checkBoxName}
            sx={{
              fontWeight: 700,
              marginLeft: '0.2rem',
              marginRight: '0.5rem',
            }}
          >
            to
          </Typography>
        }
        className={classes.start}
      />
    </Grid>
  );
};

export default createAvailbilityRow;
