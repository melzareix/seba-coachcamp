import React from 'react';
import { Header, Anchor, Heading, Nav, Button, Avatar } from 'grommet';
import * as Icons from 'grommet-icons';

export default function AppHeader() {
  return (
    <Header
      pad={{ left: 'medium', right: 'medium', vertical: 'medium' }}
      border={{ side: 'bottom' }}
    >
      <Heading margin="none" level="3">
        <Anchor href="/" label="COACHCAMP" />
      </Heading>

      <Nav direction="row" background="transparent">
        <Button icon={<Icons.User />} label="Signup/Login" hoverIndicator />
        <Button icon={<Icons.Catalog />} label="Explore" hoverIndicator />
        <Avatar src="//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80" />
      </Nav>
    </Header>
  );
}
