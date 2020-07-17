import React from 'react';
import StarEmptyIcon from '../../../assets/icons/star-empty.svg';
import StarFilledIcon from '../../../assets/icons/star-filled.svg';

export const generateRatingStars = (rating: number) => {
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