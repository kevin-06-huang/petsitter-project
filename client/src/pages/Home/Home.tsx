import React, { useState } from 'react';
import { Grid, Typography, Box, Button, FormLabel } from '@mui/material';
import homeImage from '../../images/homePage/home_page.png';
import FormInput from '../../components/FormInput/FormInput';
import TextField from '@mui/material/TextField';
import useStyles from './useStyles';
import DateRangePicker, { DateRange } from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Formik, FormikHelpers } from 'formik';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import * as Yup from 'yup';
import dropDates from '../../helpers/APICalls/dropDates';

export default function Home(): JSX.Element {
  const { updateLoginContext } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();
  const handleSubmit = (
    { where, dropIn, dropOff }: { where: string; dropIn: Date; dropOff: Date },
    { setSubmitting }: FormikHelpers<{ where: string; dropIn: Date; dropOff: Date }>,
  ) => {
    dropDates(where, dropIn, dropOff).then((data) => {
      if (data.error) {
        console.error({ error: data.error.message });
        setSubmitting(false);
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        updateLoginContext(data.success);
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });

        setSubmitting(false);
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };
  const [value, setValue] = React.useState<DateRange<Date>>([null, null]);
  const classes = useStyles();
  return (
    <Grid container>
      <Grid xs={6}>
        <Typography
          sx={{ textAlign: 'center', marginTop: '160px', fontSize: '58px', fontWeight: '700' }}
          variant="h4"
          component="h1"
        >
          Find the care your dog deserves
        </Typography>
        <Formik
          initialValues={{
            where: '',
            dropIn: new Date(),
            dropOff: new Date(),
          }}
          validationSchema={Yup.object().shape({
            location: Yup.string().required('City is required'),
            dropIn: Yup.date().required('Drop in date is required'),
            dropOff: Yup.date().required('Drop off date is required'),
          })}
          onSubmit={handleSubmit}
        >
          <form className={classes.form}>
            <FormInput
              id="where"
              label="WHERE"
              margin="normal"
              style={{ width: '46%', color: 'black' }}
              name="WHERE"
              placeholder="AnyWhere"
              autoComplete="city"
              autoFocus
            />
            <FormLabel style={{ width: '46%', color: 'black', fontWeight: 700, fontSize: '12px' }}>
              DROP IN / DROP OUT
            </FormLabel>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateRangePicker
                minDate={new Date()}
                startText="mm/dd/yyyy"
                endText="mm/dd/yyyy"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(startProps, endProps) => (
                  <React.Fragment>
                    <TextField id="dropIn" style={{ width: '23%' }} {...startProps} />
                    <TextField id="dropOff" style={{ width: '23%' }} {...endProps} />
                  </React.Fragment>
                )}
              />
            </LocalizationProvider>
            <Box marginTop={5}>
              <Button
                type="submit"
                style={{ width: '170px', height: '50px' }}
                variant="contained"
                color="primary"
                disableElevation
              >
                find my dog sitter
              </Button>
            </Box>
          </form>
        </Formik>
      </Grid>
      <Grid xs={6} item style={{ backgroundColor: 'red', height: '100vh' }}>
        <img style={{ objectFit: 'cover', width: '100%', height: '100vh' }} src={homeImage} />
      </Grid>
    </Grid>
  );
}
