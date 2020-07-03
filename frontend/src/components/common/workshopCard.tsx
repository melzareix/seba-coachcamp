import React from 'react';
import { Box, Heading, Image, Text } from 'grommet';
// @ts-ignore
import ReactStars from 'react-stars';

export default function WorkshopCard(props: any) {
  const opacity = props.opacity || '0.3';
  return (
    <Box fill className="card" background="brand">
      <Image fit="cover" opacity={opacity} src={props.image} />
      <Heading className="title" level="3">
        {props.title}
      </Heading>
      <Text className="subtitle">
        {props.subtitle}
        <ReactStars
          className="abs"
          count={5}
          value={props.rating}
          size={24}
          color1="#fff"
          color2="#ffd700"
          edit={false}
        />
      </Text>
    </Box>
  );
}
