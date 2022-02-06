import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Field } from 'formik';
import { classicNameResolver } from 'typescript';

const Time = () => {
  const output = [];
  for (let i = 0; i < 24; i++) {
    const listItem = <MenuItem value={`${i}:00`}>{`${i}:00`}</MenuItem>;
    output.push(listItem);
  }
  return output;
};

const createAvailbilityInterface = (day: string, values: any, setFieldValue: any) => (
  <Grid
    container
    columns={3}
    sx={{
      height: '4.5rem',
      display: 'flex',
      borderBottom: '1px solid #dbdbdb',
      opacity: values.days[day].active ? 1 : 0.4,
    }}
  >
    <FormGroup sx={{ marginTop: 'auto', marginBottom: 'auto', width: '25%' }}>
      <FormControlLabel
        control={
          <Field
            id={`days[${day}].active`}
            name={`days[${day}].active`}
            checked={values.days[day].active}
            onChange={(e: any) => {
              if (!e.target.checked) {
                setFieldValue(`days[${day}].startTime`, '0');
                setFieldValue(`days[${day}].endTime`, '0');
              } else {
                setFieldValue(`days[${day}].startTime`, '10');
                setFieldValue(`days[${day}].endTime`, '22');
              }
              setFieldValue(`days[${day}].active`, e.target.checked);
            }}
            sx={{ marginLeft: '1.5rem' }}
            type="checkbox"
            component={Checkbox}
          />
        }
        label={<Typography sx={{ fontSize: '15', fontWeight: 500, textTransform: 'capitalize' }}>{day}</Typography>}
        sx={{ fontSize: '25', fontWeight: 700 }}
      />
    </FormGroup>
    <FormControlLabel
      labelPlacement="start"
      control={
        <Field
          id={`days[${day}].startTime`}
          name={`days[${day}].startTime`}
          type="time"
          onChange={(e: any) => {
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
          }}
          sx={{ marginTop: 'auto', marginBottom: 'auto', width: '25%', height: '38%' }}
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
          sx={{
            fontSize: '12',
            fontWeight: 700,
            marginLeft: '1rem',
            marginRight: '0.5rem',
            textTransform: 'uppercase',
          }}
        >
          from
        </Typography>
      }
      sx={{ fontSize: '25', fontWeight: 700, width: '35%' }}
    />
    <FormControlLabel
      labelPlacement="start"
      control={
        <Field
          id={`days[${day}].endTime`}
          name={`days[${day}].endTime`}
          type="time"
          onChange={(e: any) => {
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
          }}
          sx={{ marginTop: 'auto', marginBottom: 'auto', width: '25%', height: '38%' }}
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
          sx={{
            fontSize: '12',
            fontWeight: 700,
            marginLeft: '1rem',
            marginRight: '0.5rem',
            textTransform: 'uppercase',
          }}
        >
          to
        </Typography>
      }
      sx={{ fontSize: '25', fontWeight: 700, width: '30%' }}
    />
  </Grid>
);

export default createAvailbilityInterface;
