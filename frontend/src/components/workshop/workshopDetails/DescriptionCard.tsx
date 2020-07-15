import React from 'react';
import {Box, Paragraph} from 'grommet';

interface Props {
  description: string;
}

const DescriptionCard = ({description}: Props) => {
  return (
    <Box pad="medium" border={{ color: 'lightgray', size: 'small' }}>
      <Paragraph fill>
        {description}
      </Paragraph>
  </Box>
  );
}

export default DescriptionCard;