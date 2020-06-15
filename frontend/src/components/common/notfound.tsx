import React from 'react';
import { Box, Heading } from 'grommet';

export default function NotFound() {
  return (
    <Box fill justify="center" alignContent="center" className="full-height">
      <Heading color="dark-2" textAlign="center" size="medium" style={{ maxWidth: '100%' }}>
        Oops! This page doesn't exist (yet).
      </Heading>
    </Box>
  );
}
