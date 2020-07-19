import React, { useEffect, useState } from 'react';
import { Box, Grid, Heading } from 'grommet';
import WorkshopCard from '../common/workshopCard';
import { api, axios } from '../../utils/api';
import { randomArrayElements, getOfferingsLocations } from '../../utils/utils';

export default function HomeWorkshops() {
  const [workshops, setWorkshops] = useState([]);
  const [errorMessage, setErrorMessage] = useState('Loading...');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(api.ALL_WORKSHOPS, {});
        if (result.data.data.length === 0) {
          setErrorMessage('No workshops found.');
        }
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

      {workshops.length > 0 && (
        <Grid rows="small" columns="medium" gap="medium" pad="large">
          {workshops.map((workshop: any) => {
            return (
              <WorkshopCard
                image={workshop.gallery.length > 0 ? workshop.gallery[0] : '#000'}
                id={workshop._id}
                title={workshop.name}
                subtitle={getOfferingsLocations(workshop.offerings)}
                rating={workshop.rating}
              />
            );
          })}
        </Grid>
      )}

      {workshops.length === 0 && (
        <Heading textAlign="center" style={{ maxWidth: '100%' }}>
          {errorMessage}
        </Heading>
      )}
    </Box>
  );
}
