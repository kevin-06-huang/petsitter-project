import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuth } from '../../context/useAuthContext';

export const AuthRoute = (props: RouteProps) => {
  const { loggedInUser } = useAuth();
  return loggedInUser ? <Route {...props} /> : <Redirect to="/login" />;
};
