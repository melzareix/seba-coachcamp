import React, {useState} from 'react';
import {Box, Text, TextArea, Button} from 'grommet';
import {Edit} from 'grommet-icons';
import StarEmptyIcon from '../../../assets/icons/star-empty.svg';
import StarFilledIcon from '../../../assets/icons/star-filled.svg';

const ReviewsForm = () => {
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>("");

  const _generateRatingStars = () => {
    const stars = [];
    for (let i = 1; i<=5; i++) {
      stars.push(
        <img 
          src={rating >= i? StarFilledIcon: StarEmptyIcon} 
          className="starIcon starButton"
          onClick={() => {setRating(i)}}
        />
      )
    }
    return stars;
  }

  return (
    <Box 
      pad="medium" 
      border={{ color: 'lightgray', size: 'small' }}
      margin={{top: "large"}}
    >

      {/* Header  */}
      <Box 
        pad={{bottom: "small"}}
        margin={{bottom: "medium"}}
        border={{ color: 'lightgray', size: 'small', side: 'bottom' }}
        direction="row"
        align="center"
      >
        <Edit size='16px' className="reviewCardIcon" />
        <Text>
          Rate & Write a Review about the instructor
        </Text>
      </Box>

      {/* Review Form */}
      <Box>
        <Box direction="row" margin={{bottom: "medium"}}>
          {_generateRatingStars()}
        </Box>

        <TextArea
          placeholder="type here"
          value={review}
          onChange={(event: any) => setReview(event.target.value)}
          style={{height: 200, fontWeight: 400}}
        />

        <Button 
          label="Submit Review" 
          alignSelf="end" 
          margin={{top: "medium"}}
          
        />
      </Box>
  </Box>
  );
}

export default ReviewsForm;