import React from 'react';
import { Box, Text } from 'grommet';

export default function ErrorBox(props: any) {
  return (
    <Box align="center" background="#f22" pad="small" round="small" margin="small">
      <Text color="white">{props.text}</Text>
    </Box>
  );
}
