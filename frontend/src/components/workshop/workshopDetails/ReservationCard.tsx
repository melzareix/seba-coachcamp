import React from 'react';
import {Box, Text, Calendar} from 'grommet';

const ReservationCard = () => {
  return (
    <Box 
      pad="medium" 
      border={{ color: 'lightgray', size: 'small' }}
      align="center"
      margin={{top: "large"}}
    >
      <Box 
        pad={{bottom: "small"}}
        margin={{bottom: "medium"}}
        border={{ color: 'lightgray', size: 'small', side: 'bottom' }}
      >
        <Text>
          Make an online reservation
       </Text>
      </Box>

      <Calendar
        size="small"
        date={(new Date()).toISOString()}
      />
  </Box>
  );
}

export default ReservationCard;