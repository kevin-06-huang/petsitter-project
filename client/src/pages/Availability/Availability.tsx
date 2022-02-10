import { Button, InputLabel, FormControl } from '@mui/material';
import { Box } from '@mui/system';
import SettingHeader from '../../components/SettingsHeader/SettingsHeader';
import { Typography } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import createAvailbilityRow from './AvailInterface';
import { Formik, FormikHelpers } from 'formik';
import React, { useState, useEffect } from 'react';
import FormInput from '../../components/FormInput/FormInput';
import createSchedule from '../../helpers/APICalls/createSchedule';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import getSchedule from '../../helpers/APICalls/getSchedules';
import getSchedulesById from '../../helpers/APICalls/getScheduleById';
import { AvailabileValue } from '../../interface/AvailabilityApiData';
import Record from './Records';
import useStyles from './useStyle';
const week = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

export default function Availability(): JSX.Element {
  const classes = useStyles();
  const [schedules, setSchedules] = useState([{ name: '', id: 'Select' }]);
  const [newSchedule, setNewSchedule] = useState(false);
  const [daysInfo, setDaysInfo] = useState<any>([]);
  const { updateLoginContext } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();
  const [selectedSchedule, setSelectedSchedule] = useState('');
  const [check, setCheck] = useState(1);
  const [dropDownSelected, setDropDownSelected] = useState(false);
  const [available, setAvailable] = useState<AvailabileValue>();
  const [checkExistSchedule, setCheckExistSchedule] = useState(false);

  const initialData = {
    active: false,
    startTime: '9:00',
    endTime: '5:00',
  };
  const generateSchedules = (scheduleName: any, id: any) => {
    return (
      <MenuItem
        onClick={(e) => {
          getSelectedScheduleById(e.currentTarget.id);
          setDropDownSelected(true);
        }}
        key={id}
        id={id}
        value={scheduleName}
      >
        {scheduleName}
      </MenuItem>
    );
  };
  const handleChange = (e: any) => {
    setSelectedSchedule(e.target.value);
    setNewSchedule(false);
  };
  const fillDataInfo = async (data: AvailabileValue) => {
    setAvailable(data);
    setDaysInfo(data);
  };
  const getSelectedScheduleById = async (id: any) => {
    daysInfo.length = 0;
    await getSchedulesById(id).then(async (data) => {
      if (data) {
        await fillDataInfo(data as AvailabileValue);
      }
      if (data.error) {
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        updateLoginContext(data.success);
      }
    });
  };

  useEffect(() => {
    setDropDownSelected(false);
    const getData = async () => {
      await getSchedule().then((data) => {
        if (data) {
          data.forEach((element: any) => {
            schedules.push({ name: element.name as any, id: element._id });
          });
          setSchedules([]);
          setSchedules(schedules);
        }
        if (data.error) {
          updateSnackBarMessage(data.error.message);
        } else if (data.success) {
          updateLoginContext(data.success);
        }
      });
    };
    if (check === 1) {
      getData();
      setCheck(0);
    }
  }, [updateSnackBarMessage, updateLoginContext, schedules, check]);
  const handleSubmit = async (values: AvailabileValue, { setSubmitting }: FormikHelpers<AvailabileValue>) => {
    schedules.forEach((element) => {
      if (element.name === values.name) {
        updateSnackBarMessage('Schedule already exist');
        setCheckExistSchedule(true);
      } else setCheckExistSchedule(false);
    });
    if (checkExistSchedule == false) {
      await createSchedule(values).then((data) => {
        setDropDownSelected(false);
        if (data.error) {
          setSubmitting(false);
          updateSnackBarMessage(data.error.message);
        } else if (data.success) {
          updateLoginContext(data.success);
          setSelectedSchedule('');
          setNewSchedule(false);
          setCheck(1);
        } else {
          console.error({ data });
          setSubmitting(false);
          updateSnackBarMessage('An unexpected error occurred. Please try again');
        }
      });
    }
  };
  return (
    <Box className={classes.root}>
      <SettingHeader header="Your Availability" />
      <FormControl className={classes.dropDown}>
        <InputLabel id="scheduleName">Select</InputLabel>
        <Select id="scheduleName" name="schedule" value={selectedSchedule} onChange={(e) => handleChange(e)}>
          {schedules.map((schedule) => generateSchedules(schedule.name, schedule.id))}
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        className={classes.newButton}
        sx={{ marginLeft: 2 }}
        disableElevation
        onClick={() => {
          setNewSchedule(true);
          setDropDownSelected(false);
        }}
      >
        + New Schedule
      </Button>
      {newSchedule && (
        <Formik
          initialValues={{
            name: '',
            days: {
              monday: {
                active: initialData.active,
                startTime: initialData.startTime,
                endTime: initialData.endTime,
              },
              tuesday: {
                active: initialData.active,
                startTime: initialData.startTime,
                endTime: initialData.endTime,
              },
              wednesday: {
                active: initialData.active,
                startTime: initialData.startTime,
                endTime: initialData.endTime,
              },
              thursday: {
                active: initialData.active,
                startTime: initialData.startTime,
                endTime: initialData.endTime,
              },
              friday: {
                active: initialData.active,
                startTime: initialData.startTime,
                endTime: initialData.endTime,
              },
              saturday: {
                active: initialData.active,
                startTime: initialData.startTime,
                endTime: initialData.endTime,
              },
              sunday: {
                active: initialData.active,
                startTime: initialData.startTime,
                endTime: initialData.endTime,
              },
            },
          }}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, handleChange, handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit} className={classes.newSchedule}>
              <FormInput
                id="scheduleSelect"
                label="New Schedule"
                margin="dense"
                name="name"
                className={classes.scheduleName}
                placeholder="Schedule name"
                autoComplete="name"
                autoFocus
                value={values.name}
                onChange={handleChange}
              />
              <Typography variant="h3" className={classes.label} sx={{ marginTop: 4, marginBottom: 2 }}>
                Set your weekly hours
              </Typography>
              <Box className={classes.week}>{week.map((day) => createAvailbilityRow(day, values, setFieldValue))}</Box>
              <Box textAlign="center" marginTop={5}>
                <Button type="submit" size="large" variant="contained" color="primary" disableElevation>
                  Submit
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      )}

      {dropDownSelected && <Record available={available} />}
    </Box>
  );
}
