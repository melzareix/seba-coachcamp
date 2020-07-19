import React from 'react';
import { Box, Text } from 'grommet';
import { useHistory } from 'react-router-dom';
import { Workshop } from './types';
import WorkshopCard from '../../common/workshopCard';
import { getOfferingsLocations } from '../../../utils/utils';

interface Props {
  workshops: Workshop[];
}

const DescriptionCard = ({ workshops }: Props) => {
  const history = useHistory();
  if (workshops.length === 0) return null;
  return (
    <Box margin={{ top: 'medium' }}>
      <Text textAlign="center" size="large">
        We also recommend
      </Text>
      {workshops.map(workshop => {
        return (
          <Box margin={{ top: 'small' }}>
            <WorkshopCard
              key={`${workshop._id}`}
              id={workshop._id}
              image={`${workshop.gallery[0]}`}
              title={`${workshop.name}`}
              subtitle={getOfferingsLocations(workshop.offerings)}
              rating={workshop.rating}
              onClick={() => history.push(`/workshops/${workshop._id}`)}
            />
          </Box>
        );
      })}
    </Box>
  );
};

export default DescriptionCard;
