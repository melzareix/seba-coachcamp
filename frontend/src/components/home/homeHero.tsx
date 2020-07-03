import React from 'react';
import { Box, Heading } from 'grommet';

export default function HomeHero() {
  return (
    <Box width="full" fill>
      <div>
        <Heading textAlign="center" style={{ maxWidth: '100%' }} margin="1">
          Soft Skills for Career Success.
        </Heading>
        <Heading textAlign="center" level="4" style={{ maxWidth: '100%' }} margin="0">
          Certified workshops to enhance your skills.
        </Heading>
      </div>
    </Box>
  );
}
