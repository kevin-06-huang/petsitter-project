import React, { useState } from 'react';
import { Divider, ListItemText, Menu, MenuItem as DropdownMenuItem, Badge } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { Notification } from '../../interface/Notification';
import Avatar from '@mui/material/Avatar';
import { useStyles } from './useStyles';
import {
  getWindowDimensions,
  getResource,
  unreadNotifications,
  formatMMDDYYYY,
  getDescriptiveType,
} from '../../helpers/NoficationsMenuItemHelper';

const NotificationsMenuItem = (notifications: [Notification], readNotifications: () => void) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const classes = useStyles();
  let key = 0;
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    readNotifications();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (notification?: Notification) => {
    setAnchorEl(null);
  };
  const renderNotifications = () => {
    return notifications.length >= 1 ? (
      [
        notifications.map((notification) => {
          return (
            <NavLink key={`notification-${key++}`} className={classes.navbarItem} to={getResource(notification)}>
              <DropdownMenuItem
                onClick={() => {
                  handleClose(notification);
                }}
              >
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
                  <div className={classes.navbarItemDescription}>
                    {notification.creatorName + ' ' + notification.description}
                  </div>
                  {<br />}
                  <div className={classes.navbarItemType}>{getDescriptiveType(notification.type)}</div>
                  {<br />}
                  <div className={classes.navbarItemDate}>{formatMMDDYYYY(new Date(notification.updatedAt))}</div>
                </ListItemText>
              </DropdownMenuItem>
              {notifications.length - key > 1 && <Divider />}
            </NavLink>
          );
        }),
      ]
    ) : (
      <DropdownMenuItem
        onClick={() => {
          handleClose();
        }}
      >
        <ListItemText className={classes.navbarItemDescription}>You have no notifications.</ListItemText>
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
        onClose={() => {
          handleClose();
        }}
      >
        {notifications && renderNotifications()}
      </Menu>
    </>
  );
};

export default NotificationsMenuItem;
