import { Star } from '@mui/icons-material';
import { DatePicker } from '@mui/lab';
import { Autocomplete, Box, Card, Grid, InputLabel, Rating, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { Form, Formik, FormikHelpers } from 'formik';
import { Profile } from '../../interface/Profile';
import { useStyles } from './useStyles';

interface DropDateTime {
  dropInDate: Date;
  dropInTime: string;
  dropOffDate: Date;
  dropOffTime: string;
}

interface Props {
  className?: string;
  profile: Profile;
  handleSubmit: (dropDateTime: DropDateTime, { setStatus, setSubmitting }: FormikHelpers<DropDateTime>) => void;
}

const getTimes = (hour: number) => {
  const times = [];
  for (let i = hour; i < 24; i++) {
    times.push(`${i % 12 ? i % 12 : 12} ${i / 12 < 1 ? 'am' : 'pm'}`);
  }
  return times;
};

const RequestForm = ({ className, profile, handleSubmit }: Props): JSX.Element => {
  const classes = useStyles();
  const today = new Date();

  return (
    <Card elevation={8} className={className}>
      <Grid container direction="column" alignItems="center" marginTop={3}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          ${profile.price}/hr
        </Typography>
        <Rating name="rank" value={profile.rank} readOnly size="large" sx={{ color: 'gold' }} />
        <Grid item>
          <Formik
            initialValues={{
              dropInDate: new Date(),
              dropInTime: getTimes(new Date().getHours())[0],
              dropOffDate: new Date(),
              dropOffTime: getTimes(new Date().getHours())[1],
            }}
            onSubmit={handleSubmit}
          >
            {(props) => (
              <Form className={classes.form}>
                <Box display="flex" flexDirection="column">
                  <InputLabel className={classes.label} sx={{ fontWeight: 700, color: '#000' }}>
                    Drop in
                  </InputLabel>
                  <Box display="flex">
                    <DatePicker
                      onChange={(value) => props.setFieldValue('dropInDate', value)}
                      value={props.values.dropInDate}
                      renderInput={(params) => <TextField sx={{ width: '60%' }} {...params} />}
                    />
                    <Autocomplete
                      onChange={(event, value) => {
                        props.setFieldValue('dropInTime', value);
                      }}
                      defaultValue={props.values.dropInTime}
                      disableClearable
                      options={getTimes(
                        props.values.dropInDate.toDateString() === today.toDateString()
                          ? props.values.dropInDate.getHours()
                          : 0,
                      )}
                      renderInput={(params) => <TextField {...params} />}
                      sx={{ width: '40%' }}
                    />
                  </Box>
                </Box>
                <Box display="flex" flexDirection="column" marginTop={3}>
                  <InputLabel className={classes.label} sx={{ fontWeight: 700, color: '#000' }}>
                    Drop Off
                  </InputLabel>
                  <Box display="flex">
                    <DatePicker
                      onChange={(value) => props.setFieldValue('dropOffDate', value)}
                      value={props.values.dropOffDate}
                      renderInput={(params) => <TextField sx={{ width: '60%' }} {...params} />}
                    />
                    <Autocomplete
                      onChange={(event, value) => props.setFieldValue('dropOffTime', value)}
                      defaultValue={props.values.dropOffTime}
                      disableClearable
                      options={getTimes(
                        props.values.dropOffDate.toDateString() === today.toDateString()
                          ? props.values.dropOffDate.getHours() + 1
                          : 0,
                      )}
                      renderInput={(params) => <TextField {...params} />}
                      sx={{ width: '40%' }}
                    />
                  </Box>
                </Box>

                <Box textAlign="center" marginTop={5}>
                  <Button
                    type="submit"
                    size="large"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disableElevation
                  >
                    {props.isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'Send request'}
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Card>
  );
};

export default RequestForm;
