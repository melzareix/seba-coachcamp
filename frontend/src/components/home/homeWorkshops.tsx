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
              image="https://media.istockphoto.com/photos/hourglass-and-calendar-picture-id886661830"
              title={workshop.name}
              subtitle={workshop.offerings.map((o: Offering) => o.location).join('/')}
              rating={5}
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
  // return (
  //   <Box justify="center" width="full">
  //     <Heading textAlign="center" style={{ maxWidth: '100%' }}>
  //       Explore Workshops
  //     </Heading>
  //     <hr style={{ width: '50%', color: 'rgba(0, 0, 0, 0.33)' }} />
  //
  //     <Grid rows="small" columns="medium" gap="medium" pad="large">
  //       <WorkshopCard
  //         image="https://media.istockphoto.com/photos/happy-female-leader-talking-to-her-colleagues-on-a-business-meeting-picture-id1038296672"
  //         title="Leadship"
  //         subtitle="Munich"
  //         rating={5}
  //       />
  //       <WorkshopCard
  //         image="https://media.istockphoto.com/photos/hourglass-and-calendar-picture-id886661830"
  //         title="Time Management"
  //         subtitle="Munich/Stuttgart"
  //         rating={5}
  //       />
  //     </Grid>
  //   </Box>
  // );
}
