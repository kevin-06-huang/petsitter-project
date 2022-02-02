import { Button, CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import SettingHeader from '../../components/SettingsHeader/SettingsHeader';
import { Typography } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import GenerateFormInterface from './FormInterface';
import { Formik, FormikHelpers, Field, validateYupSchema } from 'formik';
import React, { useState, useEffect } from 'react';
import FormInput from '../../components/FormInput/FormInput';
import CreateSchedule from '../../helpers/APICalls/createSchedule';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import GetSchedule from '../../helpers/APICalls/getSchedules';
const week = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

const generateSchedules = (scheduleName: string): JSX.Element => {
  return (
    <MenuItem key={scheduleName} value={scheduleName}>
      {scheduleName}
    </MenuItem>
  );
};

interface AvailabilityProps {
  header: string;
}

interface Values {
  name: string;
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
}

export default function Availability(): JSX.Element {
  const [schedules, setSchedules] = useState(['Select']);
  const [newSchedule, setNewSchedule] = useState(false);
  const [daysInfo, setdaysInfo] = useState([0]);
  const { updateLoginContext } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();
  useEffect(() => {
    GetSchedule().then((data) => {
      if (data) {
        schedules.length = 0;
        daysInfo.length = 0;
        data.forEach((element: any) => {
          schedules.push(element.name);
        });
        // setdaysInfo(data[data.length - 1].days);
        daysInfo.push(data[data.length - 1].days);
        console.log(data[data.length - 1].days);
      }
      if (data.error) {
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        updateLoginContext(data.success);
      }
    });
  });
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
      console.log(values);
      if (data.error) {
        setSubmitting(false);
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        updateLoginContext(data.success);
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });

        setSubmitting(false);
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };
  return (
    <Box>
      <SettingHeader header="Your Availability" />

      <Select
        id="scheduleSelect"
        sx={{ height: '35px', width: 'auto', marginRight: '1rem', fontWeight: 700 }}
        name="scheduleSelect"
      >
        <option selected defaultValue={10}>
          Select
        </option>
        {schedules.map((schedule) => generateSchedules(schedule))}
      </Select>
      <Button
        variant="contained"
        color="primary"
        sx={{ height: '35px' }}
        disableElevation
        onClick={() => {
          setSchedules(schedules.concat(['New Schedule']));
          setNewSchedule(true);
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
            <form onSubmit={handleSubmit}>
              <FormInput
                id="scheduleSelect"
                fullWidth
                label="New Schedule"
                margin="normal"
                name="name"
                placeholder="Schedulename"
                autoComplete="name"
                autoFocus
                value={values.name}
                onChange={handleChange}
              />
              <Typography variant="h3" sx={{ fontWeight: 500, fontSize: '18px', marginTop: 4, marginBottom: 2 }}>
                Set your weekly hours
              </Typography>
              <Box sx={{ border: '1px solid #dbdbdb', borderWidth: '1px 1px 0px 1px' }}>
                {week.map((day) => GenerateFormInterface(day, values, setFieldValue, handleSubmit, newSchedule))}
              </Box>
              <Box textAlign="center" marginTop={5}>
                <Button type="submit" size="large" variant="contained" color="primary" disableElevation>
                  Submit
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      )}
    </Box>
  );
}
