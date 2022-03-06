import { useEffect, useState } from 'react';
import { Box, ListItemText, MenuItem as DropdownMenuItem } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { formatMMDDYYYY, getDescriptiveType } from '../../helpers/NoficationsMenuItemHelper';
import { Notification } from '../../interface/Notification';
import { useStyles } from './useStyles';
import { loadProfile } from '../../helpers/APICalls/loadProfile';

interface Props {
  notification: Notification;
  handleClose: () => void;
}

const NotificationComponent = ({ notification, handleClose }: Props) => {
  const classes = useStyles();
  const { createdBy } = notification;
  const [photo, setPhoto] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    loadProfile(createdBy).then((data) => {
      if (data.success) {
        const { profile } = data.success;
        setPhoto(profile.photo);
        setName(profile.name);
      }
    });
  });

  return (
    <DropdownMenuItem onClick={handleClose}>
      {photo == '' ? (
        <Avatar src={`https://robohash.org/${createdBy}.png`} sx={{ width: 50, height: 50, margin: 'auto' }} />
      ) : (
        <Avatar src={`/image/${photo}`} sx={{ width: 50, height: 50, margin: 'auto' }} />
      )}
      <ListItemText>
        <Box className={classes.navbarItemDescription}>{name + ' ' + notification.description}</Box>
        {<br />}
        <Box className={classes.navbarItemType}>{getDescriptiveType(notification.type)}</Box>
        {<br />}
        <Box className={classes.navbarItemDate}>{formatMMDDYYYY(new Date(notification.updatedAt))}</Box>
      </ListItemText>
    </DropdownMenuItem>
  );
};

export default NotificationComponent;
