import React from 'react';
import { Box, Heading } from 'grommet';

export default function NotFound() {
  return (
    <Box fill justify="center" alignContent="center">
      <Heading color="dark-2" textAlign="center" size="medium" style={{ maxWidth: '100%' }}>
        Oops! This page doesn&#39;t exist (yet).
      </Heading>

      <img
        style={{ margin: '10px auto' }}
        width="400"
        src="https://media1.tenor.com/images/e2596cca38475616d6d9170d0801a366/tenor.gif?itemid=5799547"
        alt="404 not found"
      />
    </Box>
  );
}
