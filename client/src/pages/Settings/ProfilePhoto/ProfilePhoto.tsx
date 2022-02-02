import { Button, CircularProgress, Typography, ListItemIcon, Link } from '@mui/material';
import { Box } from '@mui/system';
import SettingHeader from '../../../components/SettingsHeader/SettingsHeader';
import { User } from '../../../interface/User';
import { makeStyles } from '@mui/styles';
import postPhoto from '../../../helpers/APICalls/postPhoto';
import deletePhoto from '../../../helpers/APICalls/deletePhoto';
import { useSnackBar } from '../../../context/useSnackbarContext';
import { useState } from 'react';
import { Input } from '@mui/material';
import Avatar from '@mui/material/Avatar';

import editProfilePhotoKey from '../../../helpers/APICalls/editProfilePhotoKey';
import { DeleteOutline } from '@mui/icons-material';

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
  const [isSubmitting, setSubmitting] = useState(false);
  const [imageKey, setImagesKey] = useState(currentProfile.photoKey);

  const fileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files!;
    setSubmitting(true);
    const promises = [];
    for (let i = 0; i < files.length; i++) {
      promises.push(postPhoto(files[i]));
      Promise.all(promises)
        .then((dataArray) => {
          for (let j = 0; j < dataArray.length; j++) {
            const data = dataArray[j];
            if (data.error) {
              console.error({ error: data.error.message });
              updateSnackBarMessage(data.error.message);
            } else if (data.success) {
              const values = { photoKey: data.success.image as string };
              editProfilePhotoKey(values);
              setImagesKey(data.success.image as string);
              updateSnackBarMessage('Photo updated!');
            } else {
              // should not get here from backend but this catch is for an unknown issue
              console.error({ data });
              updateSnackBarMessage('An unexpected error occurred. Please try again');
            }
          }
        })
        .then(() => {
          setSubmitting(false);
        });
    }
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
        {imageKey == '' ? (
          <Avatar
            src={`https://robohash.org/${currentUser!.email}.png`}
            sx={{ width: 125, height: 125, margin: 'auto' }}
          />
        ) : (
          <Avatar src={`/image/${imageKey}`} sx={{ width: 125, height: 125, margin: 'auto' }} />
        )}
        <Typography sx={{ textAlign: 'center', marginTop: '50px' }} variant="body1">
          Be sure to use a photo that
          <br />
          clearly shows your face
        </Typography>
        <form>
          <Input
            id="fileInput"
            style={{ display: 'none' }}
            onChange={fileSelected}
            type="file"
            inputProps={{ accept: 'image/*', multiple: false }}
          ></Input>
          <Button
            sx={{
              marginTop: '50px',
              padding: '20px 50px',
            }}
            size="large"
            variant="outlined"
            color="primary"
            disableElevation
            onClick={() => {
              document.getElementById('fileInput')!.click();
            }}
          >
            {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'Upload a file from your device'}
          </Button>
          <br></br>
          <Link
            component="button"
            onClick={() => {
              if (imageKey !== '') {
                deletePhoto(imageKey);
                setImagesKey('');
                editProfilePhotoKey({ photoKey: '' });
              }
            }}
          >
            <ListItemIcon>
              <DeleteOutline sx={{ marginTop: '20px' }} />
            </ListItemIcon>
            <Typography variant="body1" display="inline" sx={{ zIndex: 'tooltip' }}>
              Delete photo
            </Typography>
          </Link>
        </form>
      </Box>
    </Box>
  );
};

export default ProfilePhoto;
