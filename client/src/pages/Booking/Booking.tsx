import { Box, CircularProgress, Grid, List, ListItem, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import BookingCalendar from '../../components/BookingCalendar/BookingCalendar';
import { useAuth } from '../../context/useAuthContext';
import { getBookings } from '../../helpers/APICalls/bookingInfo';
import { BookingInfo } from '../../interface/BookingInfo';
import BookingSlot from './BookingSlot/BookingSlot';
import NextBooking from './NextBooking/NextBooking';
import { useStyles } from './useStyles';

export default function Booking(): JSX.Element {
  const classes = useStyles();
  const { loggedInUser } = useAuth();
  const [noBookingInfo, setNoBookingInfo] = useState<boolean>(false);
  const [nextBookingInfo, setNextBookingInfo] = useState<BookingInfo>();
  const [currentBookingInfos, setCurrentBookingInfos] = useState<BookingInfo[]>([]);
  const [pastBookingInfos, setPastBookingInfos] = useState<BookingInfo[]>([]);
  const [bookingDates, setBookingDates] = useState<Date[]>([]);

  useEffect(() => {
    if (!noBookingInfo && !currentBookingInfos.length && !pastBookingInfos.length) {
      getBookings().then((data) => {
        if (data.success) {
          const bookingInfos = data.success.bookingInfos;
          if (bookingInfos?.length) {
            const now = new Date();
            const past: BookingInfo[] = [];
            const current: BookingInfo[] = [];
            const dates: Date[] = [];

            bookingInfos.forEach((bookingInfo) => {
              bookingInfo.startDate = new Date(bookingInfo.startDate);
              bookingInfo.endDate = new Date(bookingInfo.endDate);
            });

            bookingInfos
              .sort((a, b) => {
                return a.startDate.getTime() - b.startDate.getTime();
              })
              .forEach((bookingInfo) => {
                dates.push(bookingInfo.startDate);
                if (bookingInfo.startDate.getTime() < now.getTime()) {
                  past.push(bookingInfo);
                } else {
                  current.push(bookingInfo);
                }
              });
            setBookingDates(dates);
            setCurrentBookingInfos(current);
            setPastBookingInfos(past);
          } else {
            setNoBookingInfo(true);
          }
        } else {
          // should not get here from backend but this catch is for an unknown issue
          console.error({ data });
        }
      });
    }
  }, [noBookingInfo, currentBookingInfos, pastBookingInfos, loggedInUser]);

  useEffect(() => {
    for (const booking of currentBookingInfos) {
      if (booking.status === 'accepted') {
        setNextBookingInfo(booking);
        return;
      }
    }
  }, [currentBookingInfos]);

  function updateBookingInfo(newBookingInfo: BookingInfo) {
    const bookingInfos = currentBookingInfos;
    const target = bookingInfos.findIndex((info) => info._id === newBookingInfo._id);
    bookingInfos[target].status = newBookingInfo.status;
    setCurrentBookingInfos(bookingInfos);
  }

  return currentBookingInfos.length || pastBookingInfos.length || noBookingInfo || nextBookingInfo ? (
    <Grid container direction="row" justifyContent="space-evenly" className={classes.root}>
      <Grid item md={5}>
        <Grid container direction={'column'}>
          <Grid item>
            <Paper elevation={12} className={classes.paperContainer}>
              {nextBookingInfo ? (
                <NextBooking info={nextBookingInfo} />
              ) : (
                <Typography variant="h6" sx={{ margin: '10px', fontWeight: 'bold' }}>
                  There is no booking for you.
                </Typography>
              )}
            </Paper>
          </Grid>
          <Grid item marginY={3}>
            <Paper elevation={12} className={classes.paperContainer}>
              <List className={classes.bookingList}>
                <ListItem>
                  <Box sx={{ width: '100%' }}>
                    <Typography className={classes.label} variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                      Current bookings:
                    </Typography>
                    {currentBookingInfos.length ? (
                      currentBookingInfos.map((bookingInfo) => (
                        <BookingSlot
                          bookingInfo={bookingInfo}
                          key={bookingInfo._id}
                          updatable={true}
                          updateBookingInfo={updateBookingInfo}
                        />
                      ))
                    ) : (
                      <Typography variant="h6" sx={{ margin: '10px', fontWeight: 'bold' }}>
                        {"You don't more booking."}
                      </Typography>
                    )}
                  </Box>
                </ListItem>
                <ListItem>
                  <Box marginY={3} sx={{ width: '100%' }}>
                    <Typography className={classes.label} variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                      Past bookings:
                    </Typography>
                    {pastBookingInfos.length ? (
                      pastBookingInfos.map((bookingInfo) => (
                        <BookingSlot bookingInfo={bookingInfo} key={bookingInfo._id} updatable={false} />
                      ))
                    ) : (
                      <Typography variant="h6" sx={{ margin: '10px', fontWeight: 'bold' }}>
                        {"You don't have past booking."}
                      </Typography>
                    )}
                  </Box>
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={4}>
        <Paper elevation={12} className={classes.paperContainer}>
          <BookingCalendar bookingDates={bookingDates} />
        </Paper>
      </Grid>
    </Grid>
  ) : (
    <CircularProgress />
  );
}
