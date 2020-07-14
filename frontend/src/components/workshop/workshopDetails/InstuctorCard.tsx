import React from 'react';
import {Box, Text, RoutedButton} from 'grommet';
import * as Icons from 'grommet-icons';
import {Instructor} from './types';

interface Props {
  instructor?: Instructor;
}

const InstructorCard = ({instructor}: Props) => {
  return (
    <Box 
      pad="small" 
      border={{ color: 'lightgray', size: 'small' }}
      align="center"
    >
      <Text size="xxlarge">
        offered by
      </Text>

      <Text margin="small" size="xlarge">
        {instructor?.name}
      </Text>

      <Text margin={{bottom: "medium"}}>
        {instructor?.email}
      </Text>

      <RoutedButton 
        primary 
        icon={<Icons.User />} 
        label="Profile" 
        path={`/instructors/${instructor?.id}`} 
      />

  </Box>
  );
}

export default InstructorCard;