import { FormLabel, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Field } from 'formik';

interface Props {
  name: string;
  days: {
    sunday: DayInformation;
    monday: DayInformation;
    tuesday: DayInformation;
    wednesday: DayInformation;
    thursday: DayInformation;
    friday: DayInformation;
    saturday: DayInformation;
  };
}

interface DayInformation {
  active: boolean;
  startTime: string;
  endTime: string;
}
export default function Records(props: any): JSX.Element {
  return (
    <Grid
      container
      sx={{
        height: '4.5rem',
        display: 'flex',
        borderTop: '1px solid #dbdbdb',
        opacity: 1,
      }}
    >
      {props.available !== undefined ? (
        <>
          {Object.entries(props.available.days).map(([key, value]) => (
            <>
              {Object.entries(value as any).map(([keys, value]) => (
                <>
                  <Grid
                    item
                    sm={4}
                    sx={{
                      height: '4.5rem',
                      display: 'flex',
                      borderTop: '1px solid #dbdbdb',
                      //   opacity: values.days[day].active ? 1 : 0.4,
                    }}
                  >
                    {' '}
                    {keys == 'active' && (
                      <FormControlLabel
                        control={<Checkbox checked={value as boolean} />}
                        label={
                          <Typography sx={{ fontSize: '15', fontWeight: 500, textTransform: 'capitalize' }}>
                            {key as string}
                          </Typography>
                        }
                        sx={{ fontSize: '25', fontWeight: 700 }}
                      />
                    )}
                    {keys == 'startTime' && (
                      <>
                        <Typography
                          sx={{ fontSize: '15', fontWeight: 500, textTransform: 'capitalize', marginTop: '3vh' }}
                        >
                          From:
                        </Typography>
                        <FormLabel sx={{ fontSize: '25', fontWeight: 700, marginTop: '3vh', marginLeft: '1vw' }}>
                          {value as any}
                        </FormLabel>
                      </>
                    )}
                    {keys == 'endTime' && (
                      <>
                        <Typography
                          sx={{ fontSize: '15', fontWeight: 500, textTransform: 'capitalize', marginTop: '3vh' }}
                        >
                          To:
                        </Typography>
                        <FormLabel sx={{ fontSize: '25', fontWeight: 700, marginTop: '3vh', marginLeft: '1vw' }}>
                          {value as any}
                        </FormLabel>
                      </>
                    )}
                  </Grid>
                </>
              ))}
            </>
          ))}
        </>
      ) : (
        <FormLabel sx={{ marginTop: 'auto', marginBottom: 'auto', width: '25%' }}>je</FormLabel>
      )}
    </Grid>
  );
}
