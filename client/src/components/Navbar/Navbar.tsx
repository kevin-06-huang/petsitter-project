import React, { useState } from 'react';
import clsx from 'clsx';
import { useAuth } from '../../context/useAuthContext';
import { useNotificationContext } from '../../context/useNotificationContext';
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
import { AccountType } from '../../types/AccountType';

import lovingSitterLogo from '../../images/logo.svg';
import { useStyles } from './useStyles';
import { NavLink, useLocation } from 'react-router-dom';
import { Settings, Logout, Person } from '@mui/icons-material';
import { Notification } from '../../interface/Notification';

const NavbarButton = styled(Button)({
  padding: '15px 0',
});

const NotificationsMenuItem = (notifications?: [Notification]) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <span onClick={handleMenuOpen}>
        <Badge badgeContent={notifications ? notifications.length : 0} color="primary">
          Notifications
        </Badge>
      </span>
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
      </Menu>
    </>
  );
};

const menuItems = [
  {
    item: 'Become a Sitter',
    resource: '/dashboard',
    canView: [AccountType.PET_OWNER],
    authenticated: true,
  },
  {
    item: 'Become a sitter',
    resource: '/signup?accountType=pet_sitter',
    canView: null,
    authenticated: false,
  },
  {
    item: NotificationsMenuItem,
    resource: '/notifications',
    canView: [AccountType.PET_SITTER, AccountType.PET_OWNER],
    authenticated: true,
  },
  {
    item: 'My Jobs',
    resource: '/my-jobs',
    canView: [AccountType.PET_SITTER],
    authenticated: true,
  },
  {
    item: 'My Sitters',
    resource: '/sitters',
    canView: [AccountType.PET_OWNER],
    authenticated: true,
  },
  {
    item: 'Messages',
    resource: '/messages',
    canView: [AccountType.PET_SITTER, AccountType.PET_OWNER],
    authenticated: true,
  },
  {
    item: (
      <NavbarButton variant="outlined" size="large" fullWidth>
        Login
      </NavbarButton>
    ),
    resource: '/login',
    canView: null,
    authenticated: false,
  },
  {
    item: (
      <NavbarButton variant="contained" size="large" fullWidth disableElevation>
        Sign up
      </NavbarButton>
    ),
    resource: '/signup',
    canView: null,
    authenticated: false,
  },
];

const MenuItem: React.FC<{
  resource: string;
  item: string | JSX.Element | { (notifications: [Notification]): JSX.Element };
  notifications?: [Notification];
}> = ({ resource, item, notifications }) => {
  const classes = useStyles();

  return (
    <Grid key={resource} sx={{ textAlign: 'center' }} xs={2} justifySelf="flex-end" item>
      <NavLink className={classes.navbarItem} to={resource}>
        {item instanceof Function ? item(notifications as any) : item}
      </NavLink>
    </Grid>
  );
};

const Navbar: React.FC = () => {
  const location = useLocation();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { loggedInUser, profile, logout } = useAuth();
  const open = Boolean(anchorEl);
  const { notifications, pushNotification } = useNotificationContext();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };

  const renderMenuItems = (notifications?: [Notification]) => {
    // TODO: conditionally render based on profile type
    return menuItems
      .filter((menu) => {
        return menu.canView?.includes(profile?.accountType);
      })
      .map((menu) => {
        if (menu.authenticated) {
          return loggedInUser && <MenuItem key={menu.resource} notifications={notifications} {...menu} />;
        } else {
          return !loggedInUser && <MenuItem key={menu.resource} {...menu} />;
        }
      });
  };

  return (
    <Grid
      className={clsx(classes.navbar, location.pathname === '/' && classes.transparentNavbar)}
      justifyContent="space-between"
      alignItems="center"
      container
    >
      <Grid xs={4} md={6} item>
        <img className={classes.navbarLogo} src={lovingSitterLogo} />
      </Grid>
      <Grid xs={8} md={6} item>
        <Grid container alignItems="center" gap={2} justifyContent="flex-end">
          {renderMenuItems(notifications)}
          {loggedInUser && (
            <Grid xs={2} item>
              <>
                <IconButton
                  size="large"
                  aria-label="account profile picture"
                  aria-controls="menu-navbar"
                  arais-haspopup="true"
                  onClick={handleMenuOpen}
                  color="inherit"
                >
                  <img style={{ width: 50 }} src={`https://robohash.org/${loggedInUser.email}`} />
                </IconButton>
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
                  <DropdownMenuItem component={NavLink} to="/profile/settings" onClick={handleClose}>
                    <ListItemIcon>
                      <Settings fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Settings</ListItemText>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <Person fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Profile</ListItemText>
                  </DropdownMenuItem>
                  <Divider />
                  <DropdownMenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                  </DropdownMenuItem>
                </Menu>
              </>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export { Navbar };
