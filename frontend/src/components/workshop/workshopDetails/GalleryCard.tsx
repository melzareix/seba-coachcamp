import React from 'react';
import {Box, Image, Carousel} from 'grommet';

interface Props {
  gallery: string[];
}

const GalleryCard = ({gallery}: Props) => {
  return (
    <Box 
      border={{ color: 'lightgray', size: 'small' }}
      margin={{top: "large"}}
      style={{height: 400}}
    >
      <Carousel fill >
        {gallery?.map((image) => (
            <Image fit="cover" src={image} />
          ))
        }
      </Carousel>
    </Box>
  );
}

export default GalleryCard;