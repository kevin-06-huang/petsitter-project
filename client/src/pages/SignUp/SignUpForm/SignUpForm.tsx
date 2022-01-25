import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import useStyles from './useStyles';
import FormInput from '../../../components/FormInput/FormInput';

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

const SignUpForm = ({ handleSubmit }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        name: '',
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required('Name is required').max(40, 'Name is too long'),
        email: Yup.string().required('Email is required').email('Email is not valid'),
        password: Yup.string()
          .required('Password is required')
          .max(100, 'Password is too long')
          .min(6, 'Password too short'),
      })}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <FormInput
            id="email"
            label="Email address"
            fullWidth
            margin="normal"
            name="email"
            placeholder="Your email"
            autoComplete="email"
            helperText={touched.email ? errors.email : ''}
            error={touched.email && Boolean(errors.email)}
            value={values.email}
            onChange={handleChange}
          />

          <FormInput
            id="name"
            label="Name"
            fullWidth
            margin="normal"
            name="name"
            placeholder="Your name"
            autoComplete="name"
            autoFocus
            helperText={touched.name ? errors.name : ''}
            error={touched.name && Boolean(errors.name)}
            value={values.name}
            onChange={handleChange}
          />

          <FormInput
            id="password"
            label="Password"
            fullWidth
            margin="normal"
            type="password"
            placeholder="Create a password"
            autoComplete="current-password"
            helperText={touched.password ? errors.password : ''}
            error={touched.password && Boolean(errors.password)}
            value={values.password}
            onChange={handleChange}
          />

          <Box textAlign="center" marginTop={5}>
            <Button
              type="submit"
              size="large"
              variant="contained"
              color="primary"
              className={classes.submit}
              disableElevation
            >
              {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'Sign up'}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default SignUpForm;
