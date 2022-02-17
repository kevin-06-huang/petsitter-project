import { FormControl, InputBase, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react';
import {
  Button,
  Divider,
  Grid,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem as DropdownMenuItem,
  styled,
  Badge,
} from '@mui/material';
import { Notification } from '../../interface/Notification';
import Avatar from '@mui/material/Avatar';
import { NotificationImportant } from '@mui/icons-material';

const StyledInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 8,
    border: '1px solid #dbdbdb',
    fontSize: 16,
    width: '100%',
    padding: '15px',
  },
}));

const NotificationsMenuItem = (notifications: [Notification]) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const renderNotifications = () => {
    return [
      notifications.map((notification) => {
        return (
          <>
            <DropdownMenuItem onClick={handleClose}>
              {notification.creatorPhotoKey == '' ? (
                <Avatar
                  src={`https://robohash.org/${'currentUser!.email'}.png`}
                  sx={{ width: 125, height: 125, margin: 'auto' }}
                />
              ) : (
                <Avatar
                  src={`/image/${notification.creatorPhotoKey}`}
                  sx={{ width: 125, height: 125, margin: 'auto' }}
                />
              )}
              <ListItemText>
                {' ' + notification.description + ' ' + notification.createdBy + ' ' + notification.updatedAt}
              </ListItemText>
            </DropdownMenuItem>
            <Divider />
          </>
        );
      }),
    ];
  };
  return (
    <>
      <div onClick={handleMenuOpen}>
        <Badge badgeContent={notifications ? notifications.length : 0} color="primary">
          Notifications
        </Badge>
      </div>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        {notifications && renderNotifications()}
      </Menu>
    </>
  );
};

export default NotificationsMenuItem;
