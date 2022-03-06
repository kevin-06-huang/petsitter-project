import './App.css';
import './index.css';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './themes/theme';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/SignUp';
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import { AuthProvider } from './context/useAuthContext';
import { SocketProvider } from './context/useSocketContext';
import { SnackBarProvider } from './context/useSnackbarContext';
import { Navbar } from './components/Navbar/Navbar';
import Settings from './pages/Settings/Settings';
import NotFound from './pages/NotFound/NotFound';
import Booking from './pages/Booking/Booking';
import ProfileDetail from './pages/ProfileDetail/ProfileDetail';
import Availability from './pages/Availability/Availability';
import ProfileLists from './pages/ProfileList/profileList';
import { NotificationContextProvider } from './context/useNotificationContext';
import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { AuthRoute, RedirectRoute } from './components/CustomRoute/CustomRoute';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(
  'pk_test_51KQDqrIlSwacevY48OGJzMxzFSsnrt3d9yLzew3qfWeR2wlvLW9cFFedYhqPd22Z5uJ6go2UD9NxZewm3LzZ6Oct00jUI7iNwA',
  { locale: 'en' },
);

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <BrowserRouter>
          <SnackBarProvider>
            <AuthProvider>
              <SocketProvider>
                <NotificationContextProvider>
                  <Elements stripe={stripePromise}>
                    <CssBaseline />
                    <Navbar />
                    <Switch>
                      <RedirectRoute exact path="/" component={Home} />
                      <Route exact path="/login" component={Login} />
                      <Route exact path="/signup" component={Signup} />
                      <AuthRoute exact path="/dashboard" component={Dashboard} />
                      <AuthRoute path="/profile/settings" component={Settings} />
                      <AuthRoute path="/booking" component={Booking} />
                      <AuthRoute path="/profile/:profileId" component={ProfileDetail} />
                      <AuthRoute path="/profile-Listings" component={ProfileLists} />
                      <Route path="/availability" component={Availability} />
                      <Route path="*">
                        <NotFound />
                      </Route>
                    </Switch>
                  </Elements>
                </NotificationContextProvider>
              </SocketProvider>
            </AuthProvider>
          </SnackBarProvider>
        </BrowserRouter>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
