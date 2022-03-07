import { TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import useStyle from './useStyles';
import moment from 'moment';
import DateRangePicker, { DateRange } from '@mui/lab/DateRangePicker';
import React, { useState } from 'react';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
function SearchBar(props: any): JSX.Element {
  const { location, getAllProfiles, changeLocation } = props;
  const classes = useStyle();
  const [value, setValue] = React.useState<DateRange<Date>>([new Date(), new Date()]);

  return (
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
          changeLocation(e);
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
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarTodayIcon />
                </InputAdornment>
              ),
            }}
          />
        )}
      />
    </form>
  );
}

export default SearchBar;
