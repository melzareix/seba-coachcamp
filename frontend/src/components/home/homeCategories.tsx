import React from 'react';
import { Box, Heading, Grid } from 'grommet';
import CategoryCard from '../common/categoryCard';

export default function HomeCategories() {
  return (
    <Box justify="center" width="full">
      <Heading textAlign="center" style={{ maxWidth: '100%' }}>
        Explore Skills
      </Heading>
      <hr style={{ width: '50%', color: 'rgba(0, 0, 0, 0.33)' }} />

      <Grid rows="small" columns="medium" gap="large" pad="large">
        <CategoryCard
          image="https://media.istockphoto.com/photos/brain-left-and-right-creativity-functions-sketch-concept-picture-id1044908342"
          title="Creativity"
        />
        <CategoryCard
          image="https://media.istockphoto.com/photos/brain-left-and-right-creativity-functions-sketch-concept-picture-id1044908342"
          title="Creativity"
        />
        <CategoryCard
          image="https://media.istockphoto.com/photos/brain-left-and-right-creativity-functions-sketch-concept-picture-id1044908342"
          title="Creativity"
        />
      </Grid>
    </Box>
  );
}
