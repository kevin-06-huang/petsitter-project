import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import useStyles from './useStyles';

interface Props {
  handleSubmit: (
    {
      name,
      email,
      password,
    }: {
      email: string;
      password: string;
      name: string;
    },
    {
      setStatus,
      setSubmitting,
    }: FormikHelpers<{
      email: string;
      password: string;
      name: string;
    }>,
  ) => void;
}

const DemoSignUpButton = ({ handleSubmit }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        email: 'hery@gmail.com',
        password: '123456',
        name: 'hery',
      }}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <Box textAlign="center" marginTop={5}>
            <Button
              type="submit"
              size="large"
              variant="contained"
              color="primary"
              className={classes.submit}
              disableElevation
            >
              {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'Demo Sign up'}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default DemoSignUpButton;
