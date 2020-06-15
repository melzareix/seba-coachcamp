import { Box, Grommet } from 'grommet';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './app.css';
import AppFooter from './components/common/footer';
import AppHeader from './components/common/header';
import Home from './components/home/home';
import WorkshopsList from './components/workshop/explore-workshops';
import Workshop from './components/workshop/workshop';
import WorkshopsRouter from './components/workshop/workshops-router';
import NotFound from './components/common/notfound';

const theme = {
  global: {
    colors: {
      brand: '#333',
    },
    font: {
      family: 'Work Sans',
      size: '18px',
      height: '20px',
    },
  },
  anchor: {
    color: 'dark-1',
    hover: {
      extend: () => {
        return {
          color: '#555555',
        };
      },
      textDecoration: 'none',
    },
  },
};

function App() {
  return (
    <Grommet theme={theme}>
      <Box height="high" width="full" overflow="hidden">
        <AppHeader />
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/workshops">
              <WorkshopsRouter />
            </Route>
            <Route path="/lost">
              <NotFound />
            </Route>
            <Route component={NotFound} />
          </Switch>
        </Router>
        <AppFooter />
      </Box>
    </Grommet>
  );
}

export default App;
