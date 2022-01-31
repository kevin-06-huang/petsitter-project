import { LocalizationProvider, DesktopDatePicker } from '@mui/lab';
import { Button, CircularProgress, InputLabel, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import useStyle from './useStyles';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Rating, Grid } from '@mui/material';
import DateRangePicker, { DateRange } from '@mui/lab/DateRangePicker';
import ProfileCard from './profileCard/ProfileCard';
function ProfileList(): JSX.Element {
  const classes = useStyle();
  const cards = [1, 2, 3, 4, 5, 6];

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box className={classes.title}>
          <Typography gutterBottom variant="h1" component="div" sx={{ fontWeight: '500', fontSize: 30 }}>
            Your search results
          </Typography>
        </Box>
        <form className={classes.form}>
          <TextField
            id="location"
            fullWidth
            margin="normal"
            type="text"
            name="location"
            placeholder="location"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField id="location" fullWidth margin="normal" type="date" name="location" placeholder="location" />
        </form>
        <Grid
          className={classes.box}
          container
          spacing={3}
          rowSpacing={1}
          columnSpacing={{ xs: 2, sm: 5, md: 5 }}
          alignItems="center"
          justifyContent="center"
        >
          {cards.map((card) => (
            <Box key={card} className={classes.card}>
              <ProfileCard />
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
      </LocalizationProvider>
    </>
  );
}

export default ProfileList;
