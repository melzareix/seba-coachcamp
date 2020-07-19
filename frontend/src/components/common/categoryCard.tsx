import { Heading } from 'grommet';
import { Card } from 'grommet-controls';
import React from 'react';
import { useHistory } from 'react-router-dom';
import qs from 'query-string';

export default function WorkshopCard(props: any) {
  const history = useHistory();
  return (
    <Card
      background={{ image: `url(${props.image})` }}
      animation="fadeIn"
      onClick={() => {
        history.push({
          pathname: '/workshops',
          search: qs.stringify({
            category: props.title
          })
        });
      }}
    >
      <Card.CardContent background={{ color: 'rgba(51, 51, 51, 0.5)' }}>
        <Heading textAlign="center" className="workshop-title" level="2">
          {props.title}
        </Heading>
      </Card.CardContent>
    </Card>
  );
}
