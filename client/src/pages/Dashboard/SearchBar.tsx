import { TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import useStyle from './useStyles';
import moment from 'moment';
import DateRangePicker, { DateRange } from '@mui/lab/DateRangePicker';
import React, { useState } from 'react';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Formik, FormikHelpers } from 'formik';

interface Props {
  handleSubmit: (
    {
      searchString,
    }: {
      searchString: string;
    },
    {
      setSubmitting,
    }: FormikHelpers<{
      searchString: string;
    }>,
  ) => void;
}

function SearchBar({ handleSubmit }: Props): JSX.Element {
  const classes = useStyle();
  const [value, setValue] = React.useState<DateRange<Date>>([new Date(), new Date()]);
  const [searchString, setSearchString] = React.useState<string>('');

  return (
    <Formik
      initialValues={{
        searchString: '',
      }}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, values }) => (
        <form className={classes.form}>
          <TextField
            id="location"
            fullWidth
            margin="normal"
            name="location"
            placeholder="Type in a city..."
            autoFocus
            value={searchString}
            onKeyPress={(e) => {
              if (e.key == 'Enter') {
                values.searchString = searchString;
                handleSubmit();
              }
            }}
            onChange={(e) => {
              setSearchString(e.target.value);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon
                    onClick={() => {
                      values.searchString = searchString;
                      handleSubmit();
                    }}
                  />
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
                InputLabelProps={{ shrink: false }}
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
      )}
    </Formik>
  );
}

export default SearchBar;
