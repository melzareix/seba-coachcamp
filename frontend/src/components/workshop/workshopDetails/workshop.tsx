import React, { useEffect, useState } from 'react';
import { Heading, Text, Box, Image, Stack } from 'grommet';
import { toast } from 'react-toastify';
import { useParams, useHistory } from 'react-router-dom';
import './workshop.css';
import DescriptionCard from './DescriptionCard';
import InstructorCard from './InstuctorCard';
import ReservationCard from './ReservationCard';
import ReviewsForm from './ReviewsForm';
import ReviewsCard from './ReviewsCard';
import GalleryCard from './GalleryCard';
import RecommendationsCard from './RecommendationsCard';
import ErrorBox from '../../common/error';
import { generateRatingStars } from '../../../utils/utils';
import { api, axios } from '../../../utils/api';
import { Workshop, Offering } from './types';

const compare = (a: Offering, b: Offering) => {
  if (a > b) {
    return 1;
  }
  return -1;
};

export default function WorkshopComponent() {
  const [workshop, setWorkshop] = useState<Workshop>({
    _instructor: { email: '', id: '', phone: '', name: '' },
    category: '',
    description: '',
    gallery: [],
    name: '',
    offerings: [],
    reviews: [],
    rating: 0,
    _id: ''
  });
  const [recommendedWorkshops, setRecommendedWorkshops] = useState<Workshop[]>([]);
  const [apiError, setApiError] = useState(null);
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const getRecommendations = async (category: any) => {
    const {data} = await axios.get(api.ALL_WORKSHOPS, {
      params: {category},
    });
    let workshopsData = data.data;
    if(workshopsData) {
      workshopsData = workshopsData.filter((workshop: any) => workshop._id !== id);
      setRecommendedWorkshops(workshopsData.slice(0, Math.min(3, workshopsData.length)))
    }
  }

  useEffect(() => {
    const getWorkshop = async () => {
      const { data } = await axios.get(api.singleWorkshop(id));
      const workshopData = data.data;
      if (workshopData) {
        workshopData.offerings = workshopData.offerings.filter(
          (offering: Offering) => offering.occupied < offering.capacity
        );
        workshopData.offerings = workshopData.offerings.sort(compare);
      }
      setWorkshop(workshopData);
      getRecommendations(workshopData.category);
    };
    getWorkshop();
  }, [id]);

  const submitReview = async (formData: any, reset: any, setRating: any) => {
    try {
      setApiError(null);
      const {data} = await axios.post(api.postReview(id), formData);
      setWorkshop({
        ...workshop,
        reviews: [...workshop.reviews, data.data]
      });
      reset();
      setRating(0);
      toast.success('Review Posted');
    } catch (error) {
      setApiError(error.response.data?.message);
    }
  }

  const redirectToBooking = (offeringId: string) => {
    history.push(`/workshops/${workshop._id}/book/${offeringId}`)
  } 
  return (
    <>
      <Stack>
        <div className="workshopDetailsHeader">
          {workshop.gallery.length > 0? (
            <Image src={workshop.gallery[0]} fit="cover" fill="horizontal" style={{ height: 400 }} />
          ) :(
            <Box style={{ height: 400, backgroundColor: "rgba(51,51,51,0.7)" }} fill="horizontal"/>
          )}
         

          <div className="workshopDetailsHeaderTextContainer">
            <Heading color="white">{workshop.name}</Heading>

            <Text color="white" size="25px">
              {workshop.category}
            </Text>

            <Box direction="row" margin={{ top: 'medium' }} align="center">
              {generateRatingStars(workshop.rating)}
              <Text
                style={{ marginTop: 3, marginLeft: 20 }}
              >{`${workshop.reviews.length} Reviews`}</Text>
            </Box>
          </div>
        </div>
      </Stack>

      <div className="workshopDetailsContent" id="middle">
        <div className="firstCol">
          <DescriptionCard description={workshop.description} />
          <ReviewsForm onSubmit={submitReview}/>
          {apiError && <ErrorBox text={apiError} />}
          <ReviewsCard reviews={workshop.reviews} />
        </div>

        <div className="secondCol">
          <InstructorCard instructor={workshop._instructor} />
          <ReservationCard offerings={workshop.offerings} onSubmit={redirectToBooking} />
          <GalleryCard gallery={workshop.gallery} />
          <RecommendationsCard workshops={recommendedWorkshops}/>
        </div>
      </div>
    </>
  );
}
