import React from 'react';
import {Heading, Text, Box, Image, Stack} from 'grommet';
import {Down} from 'grommet-icons';
import './workshop.css';
import DescriptionCard from './DescriptionCard';
import InstructorCard from './InstuctorCard';
import ReservationCard from './ReservationCard';
import ReviewsCard from './ReviewsCard';
import GalleryCard from './GalleryCard';
import StarEmptyIcon from '../../../assets/icons/star-empty.svg';
import StarFilledIcon from '../../../assets/icons/star-filled.svg';

const description = '    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' + '\n' + 
'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum';


const _generateRatingStars = (rating: number) => {
  const stars = [];
  for (let i = 1; i<=5; i++) {
    stars.push(
      <img 
        src={rating >= i? StarFilledIcon: StarEmptyIcon} 
        className="starIcon"
      />
    )
  }
  return stars;
}

export default function Workshop() {
  return (
    <>
      <Stack>
      <div className="workshopDetailsHeader">
        <Image 
          src="//v2.grommet.io/assets/IMG_4245.jpg"
          fit="cover"
          fill="horizontal"
          style={{height: 400}}
        />

        <div className="workshopDetailsHeaderTextContainer">
          <Heading color="white">Decision making</Heading>

          <Text color="white" size="25px" >Decision making</Text>

          <Box direction="row" margin={{top: "medium"}} align="center">
            {_generateRatingStars(3)}
            <Text style={{marginTop: 3, marginLeft: 20}}>0 Reviews</Text>
          </Box>
        </div>
        </div>
      </Stack>
      
      
      <div className="workshopDetailsContent" id="middle">
        <div className="firstCol">
          <DescriptionCard description={description}/>
          <ReviewsCard />
        </div>

        <div className="secondCol">
          <InstructorCard instructor={{name: 'root', id: '1', email: "root@gmail.com"}}/>
          <ReservationCard />
          <GalleryCard />
        </div>
      </div>
    </>
  );
}
