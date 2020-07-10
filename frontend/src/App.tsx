// @ts-ignore
import Skeleton from '@yisheng90/react-loading';
import { Box, Grommet } from 'grommet';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { GuardProvider, GuardFunction } from 'react-router-guards';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './app.css';
import AuthRouter from './components/auth/auth-router';
import AppFooter from './components/common/footer';
import AppHeader from './components/common/header';
import NotFound from './components/common/notfound';
import Home from './components/home/home';
import WorkshopsRouter from './components/workshop/workshops-router';
import theme from './utils/theme';
import InstructorsRouter from './components/instructors/instructors-router';
// @ts-ignore
import LoadingBar from 'react-top-loading-bar';

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
    next.redirect('/');
  } else {
    next();
  }
};

function App() {
  return (
    <Grommet theme={theme}>
      <Router>
        <Box height="high" width="full" overflow="hidden">
          <LoadingBar
            progress={20}
            height={3}
            color="#333"
            // onLoaderFinished={() => this.onLoaderFinished()}
          />
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
        </Box>
      </Router>
    </Grommet>
  );
}

export default App;
