import React, { useState } from 'react';
import { Box, Divider, ListItemText, Menu, MenuItem as DropdownMenuItem, Badge } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { Notification } from '../../interface/Notification';
import { useStyles } from './useStyles';
import { getResource, getWindowDimensions, unreadNotifications } from '../../helpers/NoficationsMenuItemHelper';
import NotificationComponent from './NotificationComponent';

const NotificationsMenuItem = (notifications: [Notification], readNotifications: () => void) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const classes = useStyles();
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    readNotifications();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const renderNotifications = () => {
    return notifications.length ? (
      [
        notifications.map((notification, index) => {
          return (
            <NavLink key={notification._id} className={classes.navbarItem} to={getResource(notification)}>
              <NotificationComponent notification={notification} handleClose={handleClose} />
              {notifications.length - index > 1 && <Divider />}
            </NavLink>
          );
        }),
      ]
    ) : (
      <DropdownMenuItem onClick={handleClose}>
        <ListItemText className={classes.navbarItemDescription}>You have no notifications.</ListItemText>
      </DropdownMenuItem>
    );
  };
  return (
    <>
      <Box onClick={handleMenuOpen}>
        <Badge color="success" variant="dot" invisible={unreadNotifications(notifications).length == 0}>
          Notifications
        </Badge>
      </Box>
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
