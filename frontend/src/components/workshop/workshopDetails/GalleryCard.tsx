import React from 'react';
import {Box, Image, Carousel} from 'grommet';

const GalleryCard = () => {
  return (
    <Box 
      border={{ color: 'lightgray', size: 'small' }}
      margin={{top: "large"}}
      style={{height: 400}}
    >
      <Carousel fill >
        <Image fit="cover" src="//v2.grommet.io/assets/Wilderpeople_Ricky.jpg" />
        <Image fit="cover" src="//v2.grommet.io/assets/IMG_4245.jpg" />
        <Image fit="cover" src="//v2.grommet.io/assets/IMG_4210.jpg" />
      </Carousel>
    </Box>
  );
}

export default GalleryCard;