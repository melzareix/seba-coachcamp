import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Heading, Grid } from 'grommet';
import CategoryCard from '../common/categoryCard';
import { randomArrayElements } from '../../utils/utils';

export default function HomeCategories() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:3000/workshops/categories', {});
      setCategories(randomArrayElements(result.data.data, 3));
    };
    fetchData();
  }, []);

  return (
    <Box justify="center" width="full">
      <Heading textAlign="center" style={{ maxWidth: '100%' }}>
        Explore Skills
      </Heading>
      <hr style={{ width: '50%', color: 'rgba(0, 0, 0, 0.33)' }} />

      <Grid rows="small" columns="medium" gap="large" pad="large">
        {categories.map((category) => {
          return (
            <CategoryCard
              image={`/categories/${(category as string).toLowerCase()}.jpg`}
              title={`${category}`}
              key={`${category}`}
            />
          );
        })}
      </Grid>

      {categories.length === 0 && (
        <Heading textAlign="center" style={{ maxWidth: '100%' }}>
          Loading...
        </Heading>
      )}
    </Box>
  );
}
