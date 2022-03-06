import Calendar from 'react-calendar';
import { useStyles } from './useStyles';

const BookingCalendar = ({ bookingDates }: { bookingDates: Date[] }): JSX.Element => {
  const classes = useStyles();

  bookingDates.sort((a, b) => a.getTime() - b.getTime());
  const nextDate =
    bookingDates[bookingDates.length - 1].getTime() >= new Date().getTime()
      ? bookingDates.find((bookingDate) => bookingDate.getTime() >= new Date().getTime())
      : bookingDates[bookingDates.length - 1];

  return (
    <Calendar
      className={classes.calendar}
      value={nextDate}
      locale="en-US"
      tileClassName={({ date }) => {
        return bookingDates.find((bookingDate) => bookingDate.toLocaleDateString() === date.toLocaleDateString())
          ? classes.activeDate
          : classes.inactiveDate;
      }}
    />
  );
};

export default BookingCalendar;
