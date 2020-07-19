import React from 'react';
import StarEmptyIcon from '../assets/icons/star-empty.svg';
import StarFilledIcon from '../assets/icons/star-filled.svg';

export const randomInteger = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const randomArrayElements = (arr: [], count: number) => {
  const slicedArray: [] = [];

  while (slicedArray.length !== count && slicedArray.length !== arr.length) {
    const idx = randomInteger(0, arr.length - 1);
    if (slicedArray.indexOf(arr[idx]) === -1) {
      slicedArray.push(arr[idx]);
    }
  }
  return slicedArray;
};

export const generateRatingStars = (rating: number) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(<img src={rating >= i ? StarFilledIcon : StarEmptyIcon} className="starIcon" />);
  }
  return stars;
};

type Offering = {
  location: string;
};

export const getOfferingsLocations = (offerings: Offering[]) => {
  const uniqueLocations = Array.from(new Set(offerings.map(offering => offering.location)));
  if (uniqueLocations.length === 0) return [];
  return uniqueLocations.map((location: any) => location).join('/');
};
