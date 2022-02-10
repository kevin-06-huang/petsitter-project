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
import { styled } from '@mui/material/styles';
export default function Home(): JSX.Element {
  const Info = styled(Typography)(({ theme }) => ({
    ...theme.typography.h2,
    fontSize: '10vh',
    fontWeight: 700,
  }));
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
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid container>
        <Grid xs={6} className={classes.column}>
          <Info className={classes.pageLabel}>Find the care your dog deserves</Info>

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
              <Box className={classes.box}>
                <FormInput
                  id="where"
                  label="WHERE"
                  margin="normal"
                  fullWidth
                  InputProps={{
                    classes: { input: classes.input },
                  }}
                  name="WHERE"
                  placeholder="Anywhere"
                  autoComplete="city"
                  autoFocus
                />
                <FormLabel
                  sx={{
                    fontSize: 10,
                    color: 'black',
                    fontWeight: 700,
                    height: '20vh',
                  }}
                  className={classes.formLabel}
                >
                  drop in / drop off
                </FormLabel>
                <DateRangePicker
                  minDate={new Date()}
                  startText="mm/dd/yyyy"
                  endText="mm/dd/yyyy"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(startProps, endProps) => (
                    <Box className={classes.dates}>
                      <TextField id="dropIn" className={classes.dropInfo} {...startProps} />
                      <TextField id="dropOff" className={classes.dropInfo} {...endProps} />
                    </Box>
                  )}
                />
              </Box>
              <Box marginTop={5}>
                <Button type="submit" className={classes.dogLabel} variant="contained" color="primary">
                  find my dog sitter
                </Button>
              </Box>
            </form>
          </Formik>
        </Grid>
        <Grid xs={6} item className={classes.imageGrid}>
          <img className={classes.imageInfo} src={homeImage} alt="home image" />
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
}
