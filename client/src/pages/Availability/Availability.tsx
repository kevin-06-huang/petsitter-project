import { Button, InputLabel, FormControl } from '@mui/material';
import { Box } from '@mui/system';
import SettingHeader from '../../components/SettingsHeader/SettingsHeader';
import { Typography } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CreateAvailInterface from './AvailInterface';
import { Formik, FormikHelpers } from 'formik';
import React, { useState, useEffect } from 'react';
import FormInput from '../../components/FormInput/FormInput';
import CreateSchedule from '../../helpers/APICalls/createSchedule';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import GetSchedule from '../../helpers/APICalls/getSchedules';
import getSchedulesById from '../../helpers/APICalls/getScheduleById';
import { AvailabileValue } from '../../interface/AvailabilityApiData';
import Record from './Records';
const week = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

export default function Availability(): JSX.Element {
  const [schedules, setSchedules] = useState([{ name: '', id: 'Select' }]);
  const [newSchedule, setNewSchedule] = useState(false);
  const [daysInfo, setDaysInfo] = useState<any>([]);
  const { updateLoginContext } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();
  const [selectedSchedule, setSelectedSchedule] = useState('');
  const [check, setCheck] = useState(1);
  const [dropDownSelected, setDropDownSelected] = useState(false);
  const [available, setAvailable] = useState<AvailabileValue>();
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
    // available.push(data);
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
    if (check === 1) {
      GetSchedule().then((data) => {
        if (data) {
          data.forEach((element: any) => {
            schedules.push({ name: element.name as any, id: element._id });
          });
        }
        if (data.error) {
          updateSnackBarMessage(data.error.message);
        } else if (data.success) {
          updateLoginContext(data.success);
        }
      });
      setCheck(0);
    }
  }, [schedules, updateLoginContext, updateSnackBarMessage, check]);
  const handleSubmit = (
    values: {
      name: string;
      days: {
        monday: {
          active: boolean;
          startTime: string;
          endTime: string;
        };
        tuesday: {
          active: boolean;
          startTime: string;
          endTime: string;
        };
        wednesday: {
          active: boolean;
          startTime: string;
          endTime: string;
        };
        thursday: {
          active: boolean;
          startTime: string;
          endTime: string;
        };
        friday: {
          active: boolean;
          startTime: string;
          endTime: string;
        };
        saturday: {
          active: boolean;
          startTime: string;
          endTime: string;
        };
        sunday: {
          active: boolean;
          startTime: string;
          endTime: string;
        };
      };
    },
    {
      setSubmitting,
    }: FormikHelpers<{
      name: string;
      days: {
        monday: {
          active: boolean;
          startTime: string;
          endTime: string;
        };
        tuesday: {
          active: boolean;
          startTime: string;
          endTime: string;
        };
        wednesday: {
          active: boolean;
          startTime: string;
          endTime: string;
        };
        thursday: {
          active: boolean;
          startTime: string;
          endTime: string;
        };
        friday: {
          active: boolean;
          startTime: string;
          endTime: string;
        };
        saturday: {
          active: boolean;
          startTime: string;
          endTime: string;
        };
        sunday: {
          active: boolean;
          startTime: string;
          endTime: string;
        };
      };
    }>,
  ) => {
    CreateSchedule(values).then((data) => {
      setDropDownSelected(false);
      if (data.error) {
        setSubmitting(false);
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        updateLoginContext(data.success);
      } else {
        console.error({ data });
        setSubmitting(false);
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };
  return (
    <Box>
      <SettingHeader header="Your Availability" />
      <FormControl sx={{ width: '20%', height: '10%' }}>
        <InputLabel id="scheduleName">Select</InputLabel>
        <Select
          id="scheduleName"
          sx={{ marginRight: '1rem', fontWeight: 700 }}
          name="schedule"
          value={selectedSchedule}
          onChange={(e) => handleChange(e)}
        >
          {schedules.map((schedule) => generateSchedules(schedule.name, schedule.id))}
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        sx={{ height: '6vh' }}
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
                active: false,
                startTime: '10:00',
                endTime: '22:00',
              },
              tuesday: {
                active: false,
                startTime: '10:00',
                endTime: '22:00',
              },
              wednesday: {
                active: false,
                startTime: '10:00',
                endTime: '22:00',
              },
              thursday: {
                active: false,
                startTime: '10:00',
                endTime: '22:00',
              },
              friday: {
                active: false,
                startTime: '10:00',
                endTime: '22:00',
              },
              saturday: {
                active: false,
                startTime: '10:00',
                endTime: '22:00',
              },
              sunday: {
                active: false,
                startTime: '10:00',
                endTime: '22:00',
              },
            },
          }}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, handleChange, handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
              <FormInput
                id="scheduleSelect"
                label="New Schedule"
                margin="dense"
                name="name"
                sx={{ width: '20%' }}
                placeholder="Schedule name"
                autoComplete="name"
                autoFocus
                value={values.name}
                onChange={handleChange}
              />
              <Typography variant="h3" sx={{ fontWeight: 500, fontSize: '2.4em', marginTop: 4, marginBottom: 2 }}>
                Set your weekly hours
              </Typography>
              <Box sx={{ border: '1px solid #dbdbdb', borderWidth: '1px 1px 0px 1px' }}>
                {week.map((day) => CreateAvailInterface(day, values, setFieldValue))}
              </Box>
              <Box textAlign="center" marginTop={5}>
                <Button
                  type="submit"
                  onClick={() => {
                    setCheck(1);
                    window.location.reload();
                  }}
                  size="large"
                  variant="contained"
                  color="primary"
                  disableElevation
                >
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
