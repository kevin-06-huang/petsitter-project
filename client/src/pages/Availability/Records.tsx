import { FormLabel, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Field } from 'formik';
import makeStyle from './useStyle';
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
  const classes = makeStyle();
  return (
    <Grid container className={classes.new} sx={{ marginTop: 4 }}>
      {props.available !== undefined && (
        <>
          {Object.entries(props.available.days).map(([key, value]) => (
            <>
              {Object.entries(value as any).map(([keys, value]) => (
                <>
                  <Grid key={key} item sm={4} className={classes.selectedSchedule}>
                    {keys == 'active' && (
                      <FormControlLabel
                        control={<Checkbox key={`${key}.${keys}`} checked={value as boolean} />}
                        label={
                          <Typography
                            className={classes.checkBoxName}
                            sx={{
                              fontWeight: 700,
                            }}
                          >
                            {key as string}
                          </Typography>
                        }
                        sx={{ marginLeft: 3 }}
                      />
                    )}
                    {keys == 'startTime' && (
                      <>
                        <Typography className={classes.dropDownLabel} sx={{ fontWeight: 700, marginTop: '3vh' }}>
                          From:
                        </Typography>
                        <FormLabel
                          key={`${key}.${keys}`}
                          className={classes.dropDownSchedule}
                          sx={{
                            fontWeight: 700,
                          }}
                        >
                          {value as any}
                        </FormLabel>
                      </>
                    )}
                    {keys == 'endTime' && (
                      <>
                        <Typography className={classes.dropDownLabel} sx={{ fontWeight: 700, marginTop: '3vh' }}>
                          To:
                        </Typography>
                        <FormLabel
                          key={`${key}.${keys}`}
                          className={classes.dropDownSchedule}
                          sx={{
                            fontWeight: 700,
                          }}
                        >
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
      )}
    </Grid>
  );
}
