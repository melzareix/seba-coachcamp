import { Avatar, Header, Heading, Nav, RoutedAnchor, RoutedButton } from 'grommet';
import * as Icons from 'grommet-icons';
import React from 'react';

export default function AppHeader() {
  return (
    <Header
      pad={{ left: 'medium', right: 'medium', vertical: 'medium' }}
      border={{ side: 'bottom' }}
    >
      <Heading margin="none" level="3">
        <RoutedAnchor path="/" label="COACHCAMP" />
      </Heading>

      <Nav direction="row" background="transparent">
        <RoutedButton icon={<Icons.User />} label="Signup/Login" path="/auth" hoverIndicator />
        <RoutedButton icon={<Icons.Catalog />} label="Explore" path="/workshops" hoverIndicator />
        <Avatar src="//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80" />
      </Nav>
    </Header>
  );
}
