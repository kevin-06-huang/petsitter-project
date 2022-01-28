import { LocalizationProvider, DesktopDatePicker } from '@mui/lab';
import { Button, CircularProgress, InputLabel } from '@mui/material';
import { Box } from '@mui/system';
import { Formik, FormikHelpers } from 'formik';
import FormInput from '../../../components/FormInput/FormInput';
import SettingHeader from '../../../components/SettingsHeader/SettingsHeader';
import { User } from '../../../interface/User';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { makeStyles } from '@mui/styles';
import editProfile from '../../../helpers/APICalls/editProfile';
import { useSnackBar } from '../../../context/useSnackbarContext';

const useStyles = makeStyles({
  dateInput: {
    borderRadius: 8,
    border: '1px solid #dbdbdb',
    fontSize: 16,
    width: '100%',
    padding: '15px',
  },
});

interface EditProfileProps {
  header: string;
  currentUser?: User; // set to optional but always passed in from settings
  currentProfile?: any;
}

const EditProfile: React.FC<EditProfileProps> = ({ header, currentUser, currentProfile }) => {
  const classes = useStyles();
  const { updateSnackBarMessage } = useSnackBar();

  console.log(currentProfile);

  const handleSubmit = (
    values: {
      name: string;
      email: string;
      gender: string;
      birthday: Date;
      telephone: string;
      address: string;
      description: string;
    },
    {
      setSubmitting,
    }: FormikHelpers<{
      name: string;
      email: string;
      gender: string;
      birthday: Date;
      telephone: string;
      address: string;
      description: string;
    }>,
  ) => {
    editProfile(values).then((data) => {
      if (data.error) {
        console.error({ error: data.error.message });
        setSubmitting(false);
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        setSubmitting(false);
        updateSnackBarMessage('Profile updated!');
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });

        setSubmitting(false);
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };

  return (
    <Box
      sx={{
        width: 600,
        margin: '0 auto',
      }}
    >
      <SettingHeader header={header} />
      <Formik
        initialValues={{
          name: currentUser?.name || '',
          email: currentUser?.email || '',
          gender: currentProfile.gender || 'none',
          birthday: currentProfile.birthday || new Date(),
          telephone: currentProfile.telephone || '',
          address: currentProfile.address || '',
          description: currentProfile.description || '',
        }}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
          <form onSubmit={handleSubmit} noValidate>
            <FormInput
              id="name"
              label="Name"
              fullWidth
              margin="normal"
              name="name"
              placeholder="Your name"
              autoComplete="name"
              helperText={touched.name ? errors.name : ''}
              error={touched.name && Boolean(errors.name)}
              value={values.name}
              onChange={handleChange}
            />

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
              id="gender"
              label="Gender"
              margin="dense"
              name="gender"
              placeholder="Gender"
              helperText={touched.gender ? errors.gender : ''}
              error={touched.gender && Boolean(errors.gender)}
              onChange={handleChange}
              select
              selectValue={values.gender}
              selectOptions={[
                {
                  label: 'Select a gender',
                  value: 'none',
                },
                {
                  label: 'Male',
                  value: 'male',
                },
                {
                  label: 'Female',
                  value: 'female',
                },
                {
                  label: 'Other (Non-binary)',
                  value: 'other',
                },
              ]}
              fullWidth
            />

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Custom input"
                value={values.birthday}
                onChange={(birthday) => {
                  setFieldValue('birthday', birthday);
                }}
                renderInput={({ inputRef, inputProps, InputProps }) => (
                  <>
                    <InputLabel
                      sx={{
                        fontSize: 16,
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        color: '#000',
                      }}
                      shrink
                      htmlFor="birthday"
                    >
                      Birthday
                    </InputLabel>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                      <input className={classes.dateInput} id="birthday" ref={inputRef} {...inputProps} />
                      {InputProps?.endAdornment}
                    </Box>
                  </>
                )}
              />
            </LocalizationProvider>

            <FormInput
              id="telephone"
              label="Telephone"
              fullWidth
              margin="normal"
              name="telephone"
              placeholder="Your phone"
              autoComplete="telephone"
              helperText={touched.telephone ? errors.telephone : ''}
              error={touched.telephone && Boolean(errors.telephone)}
              value={values.telephone}
              onChange={handleChange}
            />

            <FormInput
              id="address"
              label="Address"
              fullWidth
              margin="normal"
              name="address"
              placeholder="Where you live"
              autoComplete="address"
              helperText={touched.address ? errors.address : ''}
              error={touched.address && Boolean(errors.address)}
              value={values.address}
              onChange={handleChange}
            />

            <FormInput
              id="description"
              label="Description"
              fullWidth
              margin="normal"
              name="description"
              placeholder="Tell us about yourself"
              autoComplete="description"
              helperText={touched.description ? errors.description : ''}
              error={touched.description && Boolean(errors.description)}
              value={values.description}
              onChange={handleChange}
            />

            <Box textAlign="center" marginTop={5}>
              <Button
                sx={{
                  padding: '20px 50px',
                }}
                type="submit"
                size="large"
                variant="contained"
                color="primary"
                disableElevation
              >
                {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'Save'}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default EditProfile;
