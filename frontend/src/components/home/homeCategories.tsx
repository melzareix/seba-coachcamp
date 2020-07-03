import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Heading, Grid } from 'grommet';
import CategoryCard from '../common/categoryCard';
import { randomArrayElements } from '../../utils/utils';

export default function HomeCategories() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:3000/admin/systems', {
        headers: {
          Authorization:
            'Bearer eyJraWQiOiJSRWJBNzNHc0VlcWZZaDhVRnpna204NnNoVlVjSzJlU0Q5RWpLcWsyc3lFPSIsImFsZyI6IlJTMjU2In0.eyJjdXN0b206Y3VzdG9tZXJfaWQiOiI3ZjI0OTAxMC1iYzRjLTRkYmItYWJlMy04NjgxMThjNzdkNjEiLCJzdWIiOiIyZDIyYWE3NC1hMzIwLTQyOTYtOGQ1NS1lYmVlNzY2YzNiNzIiLCJhdWQiOiI1cGlyZHBpYzlvOHRxMGlrcTZkNGFkcm01cyIsImNvZ25pdG86Z3JvdXBzIjpbImF1ZGktZXVyZWYtb3BlcmF0b3JzIl0sImV2ZW50X2lkIjoiNjc1MmFlNTktODliZS00MzQzLTgwYmYtZDQwYjcxY2FjYjg4IiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE1OTIzOTYxODUsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX3F2OVE4OEk1TyIsImNvZ25pdG86dXNlcm5hbWUiOiJjMDAxMDEyQHR3YWljZS5jb20iLCJleHAiOjE1OTIzOTk3ODUsImlhdCI6MTU5MjM5NjE4NX0.euAYZZE9tb3NXAjsJSY9sNRC6EU3UWRKAWKY52KtNSyB94UoNcuoMN_ul_U3dYvL3YSuz4AaNj-Q-ZQPjJk26ItYJBvLa3BLn9AypSaE1l3vN9pEKAY24H0dAC7bqfugec2iDxpaEj3MVTZ2ilSChA425hKszOPW5Jg518tz3D3Gyfs38GZ7XfuXPw48TueyQJar52St3TNksfVP88MZ-j3nm3mw823TE6RsrngcqKMalIJbRtGXbHl_tcV-w8SDT_KJU-7zDmULoKMTxdGcL8wkulyy8WY7zRJsnh5YJNwlaaUEqQ640IwuwLi4tSF7N5Pw_lHijo_ISx-4yrmFjA',
        },
      });
      console.log(result);
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
