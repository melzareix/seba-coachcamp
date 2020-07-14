import React from 'react';
import {Box, Paragraph, Text} from 'grommet';
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

interface Props {
  reviews?: Review[];
}

const ReviewsCard = ({reviews}: Props) => {
  return (
    <Box 
      pad={{horizontal: "medium", top: "medium"}} 
      border={{ color: 'lightgray', size: 'small' }}
      margin={{top: "medium"}}
    >
      {
        reviews?.length === 0? (
          <Text style={{marginBottom: 20}}>No Reviews for this workshop yet</Text>
        ) : (
          reviews?.map((review, index) => (
            <ReviewComponent review={review} last={index === reviews.length-1}/>
          ))
      )}
    </Box>
  );
}

export default ReviewsCard;