import { Button, Header, Heading, Nav, RoutedAnchor, RoutedButton } from 'grommet';
import * as Icons from 'grommet-icons';
import jwt_decode from 'jwt-decode';
import React from 'react';
import { useHistory } from 'react-router';

export default function AppHeader() {
  const history = useHistory();
  const isLoggedIn = localStorage.getItem('token');
  let user;
  if (isLoggedIn) {
    user = jwt_decode(isLoggedIn);
  }
  console.log(user);
  return (
    <Header
      pad={{ left: 'medium', right: 'medium', vertical: 'medium' }}
      border={{ side: 'bottom' }}
    >
      <Heading margin="none" level="3">
        <RoutedAnchor path="/" label="COACHCAMP" />
      </Heading>

      <Nav direction="row" background="transparent">
        {!isLoggedIn && (
          <RoutedButton
            icon={<Icons.Login />}
            label="Instructor Login"
            path="/auth"
            hoverIndicator
          />
        )}
        <RoutedButton icon={<Icons.Catalog />} label="Explore" path="/workshops" hoverIndicator />
        {isLoggedIn && (
          <RoutedButton
            icon={<Icons.Projects />}
            label="Dashboard"
            path="/workshops"
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
