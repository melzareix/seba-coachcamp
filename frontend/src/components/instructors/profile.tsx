import React, { useEffect, useState } from 'react';
import { Box, Grid, Heading, Text } from 'grommet';
import { useParams } from 'react-router-dom';
import { api, axios } from '../../utils/api';
import WorkshopCard from '../common/workshopCard';
import { Offering } from '../workshop/CreteWorkshop';

export default function InstructorProfile() {
  const { id } = useParams<{ id: string }>();
  const [instructor, setInstructor] = useState({
    instructor: {
      id: '',
      name: '',
      email: '',
      description: '',
      phone: '',
    },
    workshops: [],
  });

  useEffect(() => {
    const getInstructorData = async () => {
      const instructorData = await axios.get(api.singleInstructor(id), {
        params: { workshops: true },
      });
      setInstructor(instructorData.data?.data);
    };

    getInstructorData();
  }, [id]);

  return (
    <Box width="full" pad="large" fill>
      <Heading level="1" textAlign="center" style={{ maxWidth: '100%' }}>
        {instructor.instructor.name}
      </Heading>
      <Heading level="4" textAlign="center" style={{ maxWidth: '100%' }}>
        {instructor.instructor.description} <br />
        {instructor.instructor.email} <br />
        {instructor.instructor.phone}
      </Heading>
      <hr style={{ width: '90%', color: 'rgba(0, 0, 0, 0.33)' }} />
      <Grid rows="small" columns="medium" gap="medium" pad="large">
        {instructor.workshops.map((workshop: any) => {
          return (
            <WorkshopCard
              id={workshop._id}
              image="https://media.istockphoto.com/photos/hourglass-and-calendar-picture-id886661830"
              title={workshop.name}
              subtitle={workshop.offerings.map((o: Offering) => o.location).join('/')}
              rating={5}
            />
          );
        })}
      </Grid>
    </Box>
  );
}
