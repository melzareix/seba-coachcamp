import React from 'react';
import {Box, Paragraph} from 'grommet';
import {Review} from './types';
import { generateRatingStars } from './utils';

interface ReviewComponentProps {
  review: Review;
  last?: boolean;
}

const ReviewComponent = ({review, last}: ReviewComponentProps) => (
  <Box 
    border={!last? {color: 'lightgray', size: 'small', side: 'bottom'}: false}
    margin={!last? {bottom: 'medium'}: undefined}
  >
    <Box direction="row">
      {generateRatingStars(review.rating)}
    </Box>
    <Paragraph style={{marginLeft: 5}}>
      {review.text}
    </Paragraph>
  </Box>
)

const ReviewsCard = () => {
  return (
    <Box 
      pad={{horizontal: "medium", top: "medium"}} 
      border={{ color: 'lightgray', size: 'small' }}
      margin={{top: "medium"}}
    >
      <ReviewComponent review={{rating: 3, text: "Lorem Ipsum"}}/>
      <ReviewComponent review={{rating: 3, text: "Lorem Ipsum"}} last/>
  </Box>
  );
}

export default ReviewsCard;