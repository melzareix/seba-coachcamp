import { Button, Header, Heading, Nav } from 'grommet';
import * as Icons from 'grommet-icons';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { RouterAnchor, RouterButton } from './routerLinks';

export default function AppHeader() {
  const history = useHistory();
  const isLoggedIn = localStorage.getItem('token');
  return (
    <Header
      pad={{ left: 'medium', right: 'medium', vertical: 'medium' }}
      border={{ side: 'bottom' }}
    >
      <Heading margin="none" level="3">
        <RouterAnchor path="/" label="COACHCAMP" />
      </Heading>

      <Nav direction="row" background="transparent">
        {!isLoggedIn && (
          <RouterButton
            icon={<Icons.Login />}
            label="Instructor Login"
            path="/auth"
            hoverIndicator
          />
        )}
        <RouterButton icon={<Icons.Catalog />} label="Explore" path="/workshops" hoverIndicator />
        {isLoggedIn && (
          <RouterButton
            icon={<Icons.Projects />}
            label="Dashboard"
            path="/instructors/dashboard"
            hoverIndicator
          />
        )}
        {isLoggedIn && (
          <Button
            icon={<Icons.Logout />}
            label="Logout"
            onClick={() => {
              window.localStorage.removeItem('token');
              history.go(0);
            }}
            hoverIndicator
          />
        )}
      </Nav>
    </Header>
  );
}
