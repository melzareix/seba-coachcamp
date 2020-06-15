import React from 'react';
import { Box, Heading } from 'grommet';
import { animated, useSpring } from 'react-spring';

export default function HomeHero() {
  const heroAnimation = useSpring({
    transform: `translateY(0px)`,
    from: { transform: `translateY(-600px)` },
  });
  return (
    <Box width="full" fill>
      <animated.div style={heroAnimation}>
        <Heading textAlign="center" style={{ maxWidth: '100%' }} margin="1">
          Soft Skills for Career Success.
        </Heading>
        <Heading textAlign="center" level="4" style={{ maxWidth: '100%' }} margin="0">
          Certified workshops to enhance your skills.
        </Heading>
      </animated.div>
    </Box>
  );
}
