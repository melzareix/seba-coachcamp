import { Heading, Text, Box } from 'grommet';
import { Card } from 'grommet-controls';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { generateRatingStars } from '../../utils/utils';

export default function WorkshopCard(props: any) {
  const history = useHistory();
  const handleCard = () => {
    history.push({
      pathname: `/workshops/${props.id}`,
    });
  };

  return (
    <Card
      background={{ image: `url(${props.image})` }}
      animation="fadeIn"
      onClick={props.onClick || handleCard}
    >
      <Card.CardContent background={{ color: 'rgba(51, 51, 51, 0.7)' }}>
        <Heading textAlign="start" level="3">
          {props.title}
        </Heading>
        <Text className="subtitle">
          {props.subtitle}
          <Box direction="row" margin={{vertical: "medium"}}>
            {generateRatingStars(props.rating)}
          </Box>
        </Text>
      </Card.CardContent>
    </Card>
  );
}
