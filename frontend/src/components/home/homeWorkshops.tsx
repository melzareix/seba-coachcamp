import React, { useEffect, useState } from 'react';
import { Box, Grid, Heading } from 'grommet';
import WorkshopCard from '../common/workshopCard';
import { api, axios } from '../../utils/api';
import { randomArrayElements } from '../../utils/utils';
import { Offering } from '../workshop/CreteWorkshop';

export default function HomeWorkshops() {
  const [workshops, setWorkshops] = useState([]);
  const [errorMessage, setErrorMessage] = useState('Loading...');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(api.ALL_WORKSHOPS, {});
        setWorkshops(randomArrayElements(result.data.data, 3));
      } catch (error) {
        setErrorMessage('Failed to load workshops.');
      }
    };
    fetchData();
  }, []);
  return (
    <Box justify="center" width="full">
      <Heading textAlign="center" style={{ maxWidth: '100%' }}>
        Explore Workshops
      </Heading>
      <hr style={{ width: '50%', color: 'rgba(0, 0, 0, 0.33)' }} />

      <Grid rows="small" columns="medium" gap="medium" pad="large">
        {workshops.map((workshop: any) => {
          return (
            <WorkshopCard
              image={workshop.gallery.length > 0 ? workshop.gallery[0] : '#000'}
              id={workshop._id}
              title={workshop.name}
              subtitle={workshop.offerings.map((o: Offering) => o.location).join('/')}
              rating={workshop.rating}
            />
          );
        })}
      </Grid>

      {workshops.length === 0 && (
        <Heading textAlign="center" style={{ maxWidth: '100%' }}>
          {errorMessage}
        </Heading>
      )}
    </Box>
  );
}
