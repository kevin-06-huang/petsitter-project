import SettingsIcon from '@mui/icons-material/Settings';
import { Box, Button, Card, CardContent, Grid, Menu, MenuItem, Snackbar, Typography } from '@mui/material';
import React, { Key, SyntheticEvent, useState } from 'react';
import AvatarDisplay from '../../../components/AvatarDisplay/AvatarDisplay';
import { updateBooking } from '../../../helpers/APICalls/bookingInfo';
import { BookingInfo } from '../../../interface/BookingInfo';
import { useStyles } from './useStyles';

interface Props {
  bookingInfo: BookingInfo;
  key: Key | null | undefined;
  updatable: boolean;
  updateBookingInfo?: (newBookingInfo: BookingInfo) => void;
}

const BookingSlot = (props: Props): JSX.Element => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openSetting = Boolean(anchorEl);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpenSnackbar(false);
  };

  const updateBookingInfo = (event: SyntheticEvent) => {
    event.currentTarget.textContent === 'Accept'
      ? (props.bookingInfo.status = 'accepted')
      : (props.bookingInfo.status = 'declined');

    updateBooking(props.bookingInfo._id, { status: props.bookingInfo.status }).then((data) => {
      if (props.updateBookingInfo && data.success?.bookingInfo) {
        props.updateBookingInfo(data.success.bookingInfo);
      }
      setOpenSnackbar(true);
    });
    setAnchorEl(null);
  };

  return (
    <Card variant="outlined" className={classes.card}>
      <Grid container>
        <Grid item md={8}>
          <CardContent>
            <Typography variant="h6">
              {getBookingTime(props.bookingInfo.startDate, props.bookingInfo.endDate)}
            </Typography>
            <Box display="flex" alignItems="center">
              <AvatarDisplay loggedIn={true} user={props.bookingInfo.petOwner} />
              <Typography variant="h6" sx={{ margin: '10px', fontWeight: 'bold' }}>
                {props.bookingInfo.petOwner.name}
              </Typography>
            </Box>
          </CardContent>
        </Grid>
        <Grid item md={3} alignSelf="center">
          <CardContent>
            <Typography variant="subtitle2" className={classes.status}>
              {props.bookingInfo.status}
            </Typography>
          </CardContent>
        </Grid>
        <Grid item md={1}>
          <Button
            className={classes.settingButton}
            sx={{ minWidth: '100%' }}
            onClick={handleClick}
            disabled={!props.updatable}
          >
            <SettingsIcon className={classes.settingsIcon} sx={{ fontSize: '15px' }} />
          </Button>
          <Menu open={openSetting} anchorEl={anchorEl} onClose={handleClose}>
            <MenuItem onClick={updateBookingInfo}>Accept</MenuItem>
            <MenuItem onClick={updateBookingInfo}>Decline</MenuItem>
          </Menu>
        </Grid>
      </Grid>
      <Snackbar open={openSnackbar} autoHideDuration={1000} onClose={handleClose} message="Booking status updated" />
    </Card>
  );
};

export function getBookingTime(start: Date, end: Date) {
  const day = start.toLocaleString('en-US', { day: 'numeric' });
  const month = start.toLocaleString('en-US', { month: 'long' });
  const year = start.getFullYear();
  const startAt = start.toLocaleString('en-US', { hour: 'numeric', hour12: true });
  const endAt = end.toLocaleString('en-US', { hour: 'numeric', hour12: true });

  return `${day} ${month} ${year}, ${startAt} - ${endAt}`;
}

export default BookingSlot;
