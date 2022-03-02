import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuth } from '../../context/useAuthContext';
import { CircularProgress } from '@mui/material';
import React from 'react';

export const AuthRoute = (props: RouteProps) => {
  const { loggedInUser } = useAuth();
  if (!loggedInUser) {
    return <CircularProgress />;
  }
  return loggedInUser ? <Route {...props} /> : <Redirect to="/login" />;
};
