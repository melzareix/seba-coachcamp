import React from 'react';
import { Box, Heading, Grid } from 'grommet';
import WorkshopCard from '../common/workshopCard';

export default function HomeWorkshops() {
  return (
    <Box justify="center" width="full">
      <Heading textAlign="center" style={{ maxWidth: '100%' }}>
        Top Workshops
      </Heading>
      <hr style={{ width: '50%', color: 'rgba(0, 0, 0, 0.33)' }} />

      <Grid rows="small" columns="medium" gap="large" pad="large">
        <WorkshopCard
          image="https://media.istockphoto.com/photos/happy-female-leader-talking-to-her-colleagues-on-a-business-meeting-picture-id1038296672"
          title="Leadship"
          subtitle="Munich"
          rating={5}
        />
        <WorkshopCard
          image="https://media.istockphoto.com/photos/hourglass-and-calendar-picture-id886661830"
          title="Time Management"
          subtitle="Munich/Stuttgart"
          rating={5}
        />
      </Grid>
    </Box>
  );
}
