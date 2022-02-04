import { LocalizationProvider, DesktopDatePicker } from '@mui/lab';
import { Button, CircularProgress, InputLabel, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { useSnackBar } from '../../context/useSnackbarContext';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import useStyle from './useStyles';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import { Profile } from '../../interface/ProfileApiData';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Rating, Grid } from '@mui/material';
import DateRangePicker, { DateRange } from '@mui/lab/DateRangePicker';
import ProfileCard from './profileCard/ProfileCard';
import { getAllSitter } from '../../helpers/APICalls/getSitter';
import moment from 'moment';
interface Props {
  location: string;
}
function ProfileList(): JSX.Element {
  const { updateSnackBarMessage } = useSnackBar();
  const classes = useStyle();
  const [value, setValue] = React.useState<DateRange<Date>>([new Date(), new Date()]);
  const [location, setLocation] = useState<string>('');
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const saveProfiles = (profiles: Profile[]) => {
    setProfiles(profiles);
    console.log(profiles);
  };
  const getAllProfiles = () => {
    getAllSitter(location).then((response) => {
      if (response.error) {
        updateSnackBarMessage(JSON.stringify(response.error));
      } else if (response.success) {
        console.log(response);
        saveProfiles(response.success.profiles as Profile[]);
      } else {
        updateSnackBarMessage('An unexpected error has occurred. Please try again later.');
      }
    });
  };
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
            value={location}
            onKeyPress={(e) => {
              if (e.charCode == 13) {
                getAllProfiles();
              }
            }}
            onChange={(e) => {
              setLocation(e.target.value);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon onClick={getAllProfiles} />
                </InputAdornment>
              ),
            }}
          />
          <DateRangePicker
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            minDate={new Date()}
            OpenPickerButtonProps={{ sx: { ml: 0, mr: 0.5 } }}
            renderInput={(startProps) => (
              <TextField
                sx={{ width: '15vw', marginTop: 1.9 }}
                {...startProps}
                placeholder="DD-DD MMM yy"
                fullWidth
                label=""
                inputProps={{
                  ...startProps.inputProps,
                  value: [moment(value[0]).format('DD MMM'), moment(value[1]).format('DD MMM yyyy')].join(' - '),
                }}
                InputProps={{
                  startAdornment: startProps.InputProps?.endAdornment,
                  endAdornment: (
                    <InputAdornment position="end">
                      {/* <IconButton onClick={handleReset}>
                        <Close color="inherit" fontSize="medium" />
                      </IconButton> */}
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
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
          {profiles.length ? (
            profiles.map(({ _id, address, description, name, rating, gender, phoneNumber, price, tagLine }) => (
              <Box key={_id} className={classes.card}>
                <ProfileCard
                  key={_id}
                  image="https://th.bing.com/th/id/R.ea1b9ab324ce1e392dab4771e9524042?rik=iHtWE4I7L9%2bcaQ&pid=ImgRaw&r=0"
                  name={name}
                  rating={rating}
                  tagLine={tagLine}
                  description={description}
                  address={address}
                  price={price}
                />
              </Box>
            ))
          ) : (
            <Box className={classes.title}>
              <Typography gutterBottom variant="h1" component="div" sx={{ fontWeight: '500', fontSize: 30 }}>
                No records found
              </Typography>
            </Box>
          )}
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
