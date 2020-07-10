import { Heading, Text } from 'grommet';
import { Card } from 'grommet-controls';
import React from 'react';
// @ts-ignore
import ReactStars from 'react-stars';

export default function WorkshopCard(props: any) {
  return (
    <Card background={{ image: `url(${props.image})` }} animation="fadeIn">
      <Card.CardContent background={{ color: 'rgba(51, 51, 51, 0.7)' }} onClick={props.onClick}>
        <Heading textAlign="start" level="3">
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
      </Card.CardContent>
    </Card>
  );
}
