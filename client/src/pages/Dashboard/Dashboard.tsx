import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/useAuthContext';
import { useSocket } from '../../context/useSocketContext';
import { useHistory } from 'react-router-dom';
import { CircularProgress, Grid, Typography, Box, Button } from '@mui/material';
import PageContainer from '../../components/PageContainer/PageContainer';
import SearchBar from './SearchBar';
import SearchDisplay from './SearchDisplay';
import useStyle from './useStyles';
import { Profile } from '../../interface/Profile';
import searchProfiles from '../../helpers/APICalls/searchProfiles';
import { FormikHelpers } from 'formik';

export default function Dashboard(): JSX.Element {
  const { loggedInUser } = useAuth();
  const { initSocket } = useSocket();
  const history = useHistory();
  const classes = useStyle();
  const [profiles, setProfiles] = useState<Profile[]>([]);

  useEffect(() => {
    initSocket();
  }, [initSocket, profiles]);

  if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser) {
    history.push('/login');
    // loading for a split seconds until history.push works
    return <CircularProgress />;
  }

  const handleSubmit = (
    { searchString }: { searchString: string },
    { setSubmitting }: FormikHelpers<{ searchString: string }>,
  ) => {
    searchProfiles(searchString).then((data) => {
      if (data.error) {
        console.error({ error: data.error.message });
        setSubmitting(false);
      } else if (data.success) {
        const { profiles } = data.success;
        setProfiles(profiles as Profile[]);
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });
        setSubmitting(false);
      }
    });
  };

  return (
    <PageContainer>
      <Grid container>
        <Grid xs={12} item>
          <Typography sx={{ textAlign: 'center' }} variant="h4">
            Search Profiles
          </Typography>
        </Grid>
        <Box className={classes.title}> </Box>
        <SearchBar handleSubmit={handleSubmit} />
        {profiles && <SearchDisplay profiles={profiles} />}
        <Box textAlign="center" marginTop={5} className={classes.showMore}>
          <Button
            sx={{ background: 'none', color: 'black', border: '1px solid #dbdbdb' }}
            type="submit"
            size="large"
            variant="contained"
            className={classes.submit}
            disableElevation
          >
            show more
          </Button>
        </Box>
      </Grid>
    </PageContainer>
  );
}
