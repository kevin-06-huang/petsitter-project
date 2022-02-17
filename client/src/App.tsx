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
import ProfileLists from './pages/ProfileList/profileList';
import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { AuthRoute } from './components/AuthRoute/AuthRoute';

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <BrowserRouter>
          <SnackBarProvider>
            <AuthProvider>
              <SocketProvider>
                <CssBaseline />
                <Navbar />
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/signup" component={Signup} />
                  <AuthRoute exact path="/dashboard" component={Dashboard} />
                  <AuthRoute path="/profile/settings" component={Settings} />
                  <AuthRoute path="/profile-Listings" component={ProfileLists} />
                  <Route path="*">
                    <NotFound />
                  </Route>
                </Switch>
              </SocketProvider>
            </AuthProvider>
          </SnackBarProvider>
        </BrowserRouter>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
