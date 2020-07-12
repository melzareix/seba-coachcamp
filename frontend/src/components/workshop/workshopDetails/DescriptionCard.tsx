import React from 'react';
import {Box, Text} from 'grommet';

interface Props {
  description: string;
}

const DescriptionCard = ({description}: Props) => {
  return (
    <Box pad="medium" border={{ color: 'lightgray', size: 'small' }}>
      <Text>
        {description}
      </Text>
  </Box>
  );
}

export default DescriptionCard;