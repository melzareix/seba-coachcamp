import Skeleton from '@yisheng90/react-loading';
import { Box, Grommet } from 'grommet';
import React, { useState } from 'react';
import BusProvider, { useListener } from 'react-gbus';
import LoadingOverlay from 'react-loading-overlay';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { GuardFunction, GuardProvider } from 'react-router-guards';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './app.css';
import AuthRouter from './components/auth/auth-router';
import AppFooter from './components/common/footer';
import AppHeader from './components/common/header';
import NotFound from './components/common/notfound';
import Home from './components/home/home';
import InstructorsRouter from './components/instructors/instructors-router';
import WorkshopsRouter from './components/workshop/workshops-router';
import { IS_AXIOS_LOADING } from './utils/api';
import theme from './utils/theme';

const requireLogin: GuardFunction = (to, from, next) => {
  const token = window.localStorage.getItem('token');
  if (to.meta.auth) {
    if (token) {
      next();
    }
    next.redirect('/auth/login');
  } else {
    next();
  }
};

const redirectIfLoggedIn: GuardFunction = (to, from, next) => {
  const token = window.localStorage.getItem('token');
  if (to.meta.redirect && token) {
    next.redirect('/instructors/dashboard');
  } else {
    next();
  }
};

function App() {
  const [isLoading, setIsLoading] = useState(false);
  useListener(setIsLoading, [IS_AXIOS_LOADING]);

  return (
    <Grommet theme={theme}>
      <Router>
        <BusProvider>
          <Box width="full" overflow="hidden">
            <LoadingOverlay active={isLoading} spinner text="Loading...">
              <AppHeader />
              <GuardProvider
                guards={[requireLogin, redirectIfLoggedIn]}
                loading={Skeleton}
                error={NotFound}
              >
                <Switch>
                  <Route exact path="/">
                    <Home />
                  </Route>
                  <Route path="/instructors">
                    <InstructorsRouter />
                  </Route>
                  <Route path="/workshops">
                    <WorkshopsRouter />
                  </Route>
                  <Route path="/auth">
                    <AuthRouter />
                  </Route>
                  <Route path="/lost">
                    <NotFound />
                  </Route>
                  <Route component={NotFound} />
                </Switch>
              </GuardProvider>
              <ToastContainer closeOnClick draggable autoClose={1000} position="bottom-right" />
              <AppFooter />
            </LoadingOverlay>
          </Box>
        </BusProvider>
      </Router>
    </Grommet>
  );
}

export default App;
