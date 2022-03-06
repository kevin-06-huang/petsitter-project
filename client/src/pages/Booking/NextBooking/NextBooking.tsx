import SettingsIcon from '@mui/icons-material/Settings';
import { Box, Button, Grid, Typography } from '@mui/material';
import AvatarDisplay from '../../../components/AvatarDisplay/AvatarDisplay';
import { BookingInfo } from '../../../interface/BookingInfo';
import { getBookingTime } from '../BookingSlot/BookingSlot';
import { useStyles } from '../useStyles';

const NextBooking = ({ info }: { info: BookingInfo }): JSX.Element => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item md={11}>
        <Typography className={classes.label} variant="subtitle2" sx={{ fontWeight: 'bold' }}>
          Your next booking:
        </Typography>
        <Typography className={classes.label} variant="h6">
          {getBookingTime(info.startDate, info.endDate)}
        </Typography>
        <Box display="flex" flexDirection="row" alignItems="center">
          <AvatarDisplay loggedIn={true} user={info.petOwner} />
          <Typography variant="h6" sx={{ margin: '10px', fontWeight: 'bold' }}>
            {info.petOwner.name}
          </Typography>
        </Box>
      </Grid>
      <Grid item md={1}>
        <Button className={classes.settingButton} sx={{ minWidth: '100%' }}>
          <SettingsIcon sx={{ color: 'gray' }} />
        </Button>
      </Grid>
    </Grid>
  );
};

export default NextBooking;
