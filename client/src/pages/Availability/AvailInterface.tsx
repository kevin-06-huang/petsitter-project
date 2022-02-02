import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Field } from 'formik';
import FormInput from '../../components/FormInput/FormInput';

const twentyFourHours = () => {
  const output = [];
  for (let i = 0; i < 24; i++) {
    const listItem = <MenuItem value={`${i}:00`}>{`${i}:00`}</MenuItem>;
    output.push(listItem);
  }
  return output;
};

const GenerateFormInterface = (day: string, values: any, setFieldValue: any, handleSubmit: any, newSchedule: any) => (
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
    {/* {console.log(`days.${day}.endTime`.)} */}
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
        label={<Typography sx={{ fontSize: '15px', fontWeight: 500, textTransform: 'capitalize' }}>{day}</Typography>}
        sx={{ fontSize: '25px', fontWeight: 700 }}
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
            console.log('vaaaaaaaaaaaaaaa', e.target.value);
            if (values.days[day].active) {
              const val = e.target.value;

              if (val == '23') {
                setFieldValue(`days[${day}].endTime`, '0');
              } else if (val >= parseInt(values.days[day].endTime)) {
                setFieldValue(`days[${day}].endTime`);
              }
              setFieldValue(`days[${day}].startTime`, val);
            }
          }}
          sx={{ marginTop: 'auto', marginBottom: 'auto', width: '100px', height: '30px' }}
          MenuProps={{
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'right',
            },
          }}
          as={Select}
        >
          {twentyFourHours()}
        </Field>
      }
      label={
        <Typography
          sx={{
            fontSize: '12px',
            fontWeight: 700,
            marginLeft: '1rem',
            marginRight: '0.5rem',
            textTransform: 'uppercase',
          }}
        >
          from
        </Typography>
      }
      sx={{ fontSize: '25px', fontWeight: 700, width: '35%' }}
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
              if (val == '0') {
                setFieldValue(`days[${day}].startTime`, '23');
              } else if (val <= parseInt(values.days[day].startTime)) {
                setFieldValue(`days[${day}].startTime`);
              }
              setFieldValue(`days[${day}].endTime`, val);
            }
          }}
          sx={{ marginTop: 'auto', marginBottom: 'auto', width: '100px', height: '30px' }}
          MenuProps={{
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'right',
            },
          }}
          as={Select}
        >
          {twentyFourHours()}
        </Field>
      }
      label={
        <Typography
          sx={{
            fontSize: '12px',
            fontWeight: 700,
            marginLeft: '1rem',
            marginRight: '0.5rem',
            textTransform: 'uppercase',
          }}
        >
          to
        </Typography>
      }
      sx={{ fontSize: '25px', fontWeight: 700, width: '30%' }}
    />
  </Grid>
);

export default GenerateFormInterface;
