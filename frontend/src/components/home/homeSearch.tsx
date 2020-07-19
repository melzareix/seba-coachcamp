import React from 'react';
import { useSpring, animated } from 'react-spring';
import { Box, Form, FormField, TextInput, Button } from 'grommet';

export default function HomeSearch() {
  const searchFormAnimatedProps = useSpring({
    opacity: 1,
    from: { opacity: 0 }
  });
  return (
    <animated.div style={searchFormAnimatedProps}>
      <Box width="full" margin={{ vertical: 'medium' }}>
        <Form>
          <Box direction="row" justify="center" gap="large">
            <FormField width="medium">
              <TextInput placeholder="Keyword (e.g Leadership)" />
            </FormField>
            <FormField>
              <TextInput placeholder="Location" />
            </FormField>
            <Button label="Search" type="submit" primary />
          </Box>
        </Form>
      </Box>
    </animated.div>
  );
}
