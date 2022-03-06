import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/useAuthContext';
import { useSocket } from '../../context/useSocketContext';
import { useHistory } from 'react-router-dom';
import { CircularProgress, Grid, Typography, Box, Button } from '@mui/material';
import PageContainer from '../../components/PageContainer/PageContainer';
import SearchBar from '../ProfileList/searchBar';
import ProfileCard from '../ProfileList/profileCard/ProfileCard';
import useStyle from './useStyles';

export default function Dashboard(): JSX.Element {
  const { loggedInUser } = useAuth();
  const { initSocket } = useSocket();
  const history = useHistory();
  const classes = useStyle();
  //const [profiles, setProfiles] = useState<[Profile] | undefined>(undefined);

  useEffect(() => {
    console.log('test');
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
        <Box className={classes.title}> </Box>
        <SearchBar />
        <Grid
          className={classes.box}
          container
          spacing={3}
          rowSpacing={1}
          columnSpacing={{ xs: 2, sm: 5, md: 5 }}
          alignItems="center"
          justifyContent="center"
        >
          {[1, 2, 3, 4, 5, 6].map((card) => (
            <Box key={card} className={classes.card}>
              <ProfileCard name={`${card}`} />
            </Box>
          ))}
        </Grid>
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
