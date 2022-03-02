import { Avatar, Card, CircularProgress, Grid, Paper, Typography } from '@mui/material';
import { useAuth } from '../../context/useAuthContext';
import React from 'react';
import { useStyles } from './useStyles';
import { LocationOn } from '@mui/icons-material';

const ProfileDetail = (): JSX.Element => {
  const classes = useStyles();
  const { profile } = useAuth();

  const title = () => {
    return profile.accountType === 'pet_owner' ? 'Kind pet owner' : 'Loving pet sitter';
  };

  return profile ? (
    <Paper elevation={8} className={classes.paper}>
      <Grid container direction="column">
        <Grid item>
          <img
            className={classes.userBackground}
            src="http://pic.616pic.com/bg_w1180/00/03/56/J9aghMknMg.jpg"
            alt="user background"
          />
        </Grid>
        <Grid item alignSelf="center">
          <Avatar src={profile.photo} sx={{ width: 100, height: 100, border: 3 }} className={classes.avatar} />
        </Grid>
        <Grid item alignSelf="center">
          <Typography variant="h4" className={classes.name} sx={{ fontWeight: 'bold' }}>
            {profile.name}
          </Typography>
          <Typography variant="subtitle1" className={classes.name} sx={{ fontWeight: 'light' }}>
            {title()}
          </Typography>
        </Grid>
        <Grid item alignSelf="center">
          <Typography variant="h6" sx={{ fontWeight: 'light' }}>
            <LocationOn color="primary" />
            {profile.address}
          </Typography>
        </Grid>
        <Grid item display="flex" justifyContent="center">
          <Card elevation={2} className={classes.descriptionCard}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              About me
            </Typography>
            <Typography variant="body1">description</Typography>
          </Card>
        </Grid>
      </Grid>
    </Paper>
  ) : (
    <CircularProgress />
  );
};

export default ProfileDetail;
