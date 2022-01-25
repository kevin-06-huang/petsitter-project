import React, { useEffect } from 'react';
import { useAuth } from '../../context/useAuthContext';
import { useSocket } from '../../context/useSocketContext';
import { useHistory } from 'react-router-dom';
import { CircularProgress, Grid, Typography } from '@mui/material';
import PageContainer from '../../components/PageContainer/PageContainer';

export default function Dashboard(): JSX.Element {
  const { loggedInUser } = useAuth();
  const { initSocket } = useSocket();
  const history = useHistory();

  useEffect(() => {
    initSocket();
  }, [initSocket]);

  if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser) {
    history.push('/login');
    // loading for a split seconds until history.push works
    return <CircularProgress />;
  }

  return (
    <PageContainer>
      <Grid container>
        <Grid xs={12} item>
          <Typography sx={{ textAlign: 'center' }} variant="h4">
            Search Profiles
          </Typography>
        </Grid>
      </Grid>
    </PageContainer>
  );
}
