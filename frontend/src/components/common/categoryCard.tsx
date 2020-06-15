import { Box, Heading, Image } from 'grommet';
import React from 'react';

export default function WorkshopCard(props: any) {
  const opacity = props.opacity || '0.2';
  return (
    <Box fill className="card" background="dark-1" onClick={() => alert(1)}>
      <Image fit="cover" opacity={opacity} src={props.image} />
      <Heading textAlign="center" className="workshop-title" level="2">
        {props.title}
      </Heading>
    </Box>
  );
}
