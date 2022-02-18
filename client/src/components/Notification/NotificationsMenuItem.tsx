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
import { NavLink, useLocation } from 'react-router-dom';
import { Notification } from '../../interface/Notification';
import Avatar from '@mui/material/Avatar';
import { useStyles } from './useStyles';
import { NotificationResourceType } from '../../types/NotificationType';

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};
const getResource = (notification: Notification) => {
  switch (notification.type) {
    case 'account': {
      return NotificationResourceType.account;
    }
    case 'appointment': {
      return NotificationResourceType.appointment;
    }
    case 'message': {
      return NotificationResourceType.message;
    }
    case 'payment': {
      return NotificationResourceType.payment;
    }
    default: {
      return '#';
    }
  }
};

const NotificationsMenuItem = (notifications: [Notification]) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const classes = useStyles();
  let key = 0;
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const unreadNotifications = (notifications: [Notification]) => {
    return notifications
      ? notifications.filter((notification) => {
          return !notification.read;
        })
      : [];
  };
  const renderNotifications = () => {
    return notifications.length >= 1 ? (
      [
        notifications.map((notification) => {
          return (
            <NavLink key={`notification-${key++}`} className={classes.navbarItem} to={getResource(notification)}>
              <DropdownMenuItem onClick={handleClose}>
                {notification.creatorPhotoKey == '' ? (
                  <Avatar
                    src={`https://robohash.org/${notification.createdBy}.png`}
                    sx={{ width: 50, height: 50, margin: 'auto' }}
                  />
                ) : (
                  <Avatar
                    src={`/image/${notification.creatorPhotoKey}`}
                    sx={{ width: 50, height: 50, margin: 'auto' }}
                  />
                )}
                <ListItemText>
                  {' ' + notification.description}
                  {<br />}
                  {' ' + notification.type}
                  {<br />}
                  {' ' + notification.updatedAt}
                </ListItemText>
              </DropdownMenuItem>
              <Divider />
            </NavLink>
          );
        }),
      ]
    ) : (
      <DropdownMenuItem onClick={handleClose}>
        <ListItemText>You have no notifications.</ListItemText>
      </DropdownMenuItem>
    );
  };
  return (
    <>
      <div onClick={handleMenuOpen}>
        <Badge color="success" variant="dot" invisible={unreadNotifications(notifications).length == 0}>
          Notifications
        </Badge>
      </div>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        sx={{
          marginTop: '20px',
          maxHeight: getWindowDimensions().height * 0.7,
          width: getWindowDimensions().width * 0.7,
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
