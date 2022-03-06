import { LocationOn } from '@mui/icons-material';
import { Avatar, Card, CircularProgress, Grid, Snackbar, Typography } from '@mui/material';
import { FormikHelpers } from 'formik';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProfileGallery from '../../components/ProfileGallery/ProfileGallery';
import RequestForm from '../../components/RequestForm/RequestForm';
import { useAuth } from '../../context/useAuthContext';
import { makeBooking } from '../../helpers/APICalls/bookingInfo';
import { loadProfile } from '../../helpers/APICalls/loadProfile';
import { BookingInfo } from '../../interface/BookingInfo';
import { Profile } from '../../interface/Profile';
import { useStyles } from './useStyles';

const ProfileDetail = (): JSX.Element => {
  const classes = useStyles();
  const { loggedInUser } = useAuth();
  const { profileId } = useParams<{ profileId: string }>();
  const [profile, setProfile] = useState<Profile>();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    !profile &&
      loadProfile(profileId).then((data) => {
        if (data.success) {
          setProfile(data.success.profile);
        } else {
          setSnackbarOpen(true);
        }
      });
  }, [profile, profileId]);

  const handleSubmit = (
    {
      dropInDate,
      dropInTime,
      dropOffDate,
      dropOffTime,
    }: { dropInDate: Date; dropInTime: string; dropOffDate: Date; dropOffTime: string },
    { setSubmitting }: FormikHelpers<{ dropInDate: Date; dropInTime: string; dropOffDate: Date; dropOffTime: string }>,
  ) => {
    if (dropInTime.includes('pm')) {
      dropInDate.setHours(parseInt(dropInTime) + 12, 0, 0, 0);
    } else {
      dropInDate.setHours(parseInt(dropInTime), 0, 0, 0);
    }
    if (dropOffTime.includes('pm')) {
      dropOffDate.setHours(parseInt(dropOffTime) + 12, 0, 0, 0);
    } else {
      dropOffDate.setHours(parseInt(dropOffTime), 0, 0, 0);
    }

    if (loggedInUser && profile) {
      const bookingInfo: BookingInfo = {
        _id: undefined,
        petOwner: loggedInUser,
        sitter: profile.userId,
        startDate: dropInDate,
        endDate: dropOffDate,
        status: 'pending',
        paid: false,
      };

      makeBooking(bookingInfo);
      setSubmitting(false);
    }
  };

  return profile ? (
    <Grid container justifyContent="space-evenly">
      <Grid item md={6}>
        <Card elevation={8} className={classes.card}>
          <Grid container direction="column">
            <Grid item>
              <img className={classes.userBackground} src={profile.coverImage} alt="user cover image" />
            </Grid>
            <Grid item alignSelf="center">
              <Avatar src={profile.photo} sx={{ width: 100, height: 100, border: 3 }} className={classes.avatar} />
            </Grid>
            <Grid item alignSelf="center">
              <Typography variant="h4" className={classes.name} sx={{ fontWeight: 'bold' }}>
                {profile.name}
              </Typography>
              <Typography variant="subtitle1" className={classes.name} sx={{ fontWeight: 'light' }}>
                Loving {profile.accountType.replace('_', ' ')}
              </Typography>
            </Grid>
            <Grid item alignSelf="center">
              <Typography variant="subtitle1" sx={{ fontWeight: 'light' }}>
                <LocationOn color="primary" />
                {profile.address}
              </Typography>
            </Grid>
            <Grid item display="flex" justifyContent="center">
              <Card elevation={0} className={classes.descriptionCard}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  About me
                </Typography>
                <Typography variant="body1">{profile.description}</Typography>
                <ProfileGallery images={profile.gallery} />
              </Card>
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Grid item md={3}>
        <RequestForm className={classes.card} profile={profile} handleSubmit={handleSubmit} />
      </Grid>
      <Snackbar open={snackbarOpen} autoHideDuration={1000} message="Profile not found" />
    </Grid>
  ) : (
    <CircularProgress />
  );
};

export default ProfileDetail;
