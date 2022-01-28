import { Button, CircularProgress, InputLabel } from '@mui/material';
import { Box } from '@mui/system';
import SettingHeader from '../../../components/SettingsHeader/SettingsHeader';
import { User } from '../../../interface/User';
import { makeStyles } from '@mui/styles';
import postPhoto from '../../../helpers/APICalls/postPhoto';
import { useSnackBar } from '../../../context/useSnackbarContext';
import { useState } from 'react';

const useStyles = makeStyles({
  dateInput: {
    borderRadius: 8,
    border: '1px solid #dbdbdb',
    fontSize: 16,
    width: '100%',
    padding: '15px',
  },
});

interface ProfilePhotoProps {
  header: string;
  currentUser?: User; // set to optional but always passed in from settings
  currentProfile?: any;
}

const ProfilePhoto: React.FC<ProfilePhotoProps> = ({ header, currentUser, currentProfile }) => {
  const classes = useStyles();
  const { updateSnackBarMessage } = useSnackBar();

  const [file, setFile] = useState();
  const [images, setImages] = useState([]);
  const [isSubmitting, setSubmitting] = useState(false);

  console.log(currentProfile);

  const fileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    //setFile(file);
    setSubmitting(true);
    postPhoto(file).then((data) => {
      if (data.error) {
        console.error({ error: data.error.message });
        setSubmitting(false);
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        setSubmitting(false);
        //setImages([data.image, ...images])
        updateSnackBarMessage('Photo updated!');
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });
        setSubmitting(false);
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };

  return (
    <Box
      sx={{
        width: 600,
        margin: '0 auto',
      }}
    >
      <SettingHeader header={header} />
      <Box textAlign="center" marginTop={5}>
        <form>
          <input
            id="fileInput"
            style={{ display: 'none' }}
            onChange={fileSelected}
            type="file"
            accept="image/*"
          ></input>
          <Button
            sx={{
              padding: '20px 50px',
            }}
            size="large"
            variant="contained"
            color="primary"
            disableElevation
            onClick={() => {
              document.getElementById('fileInput')!.click();
            }}
          >
            {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'Upload a file from your device'}
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default ProfilePhoto;
