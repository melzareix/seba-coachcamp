import React, {useEffect, useState} from 'react';
import {Heading, Text, Box, Image, Stack} from 'grommet';
import { useParams } from 'react-router-dom'
import './workshop.css';
import DescriptionCard from './DescriptionCard';
import InstructorCard from './InstuctorCard';
import ReservationCard from './ReservationCard';
import ReviewsForm from './ReviewsForm';
import ReviewsCard from './ReviewsCard';
import GalleryCard from './GalleryCard';
import {generateRatingStars} from './utils';
import { api, axios } from '../../../utils/api';
import {Workshop, Offering} from './types';
import { Database } from 'grommet-icons';

const fetchWorkshopDetails = async (id: string) => {
  const result = await axios.get(api.singleWorkshop(id))
  result.data.data['offerings'] = result.data.data.offerings.filter((offering: Offering) => 
    offering.occupied < offering.capacity
  )
  return result.data.data;
}

const compare = ((a: Offering, b: Offering) => {
  if (a > b) {
    return 1;
  }
  return -1;
})

export default function WorkshopComponent() {
  const [workshop, setWorkshop] = useState<Workshop>({
    _instructor: {email: "", id: "", phone: "", name: ""},
    category: "",
    description: "",
    gallery: [],
    name: "",
    offerings: [],
    reviews: [],
  });
  const { id } = useParams<{id: string}>();

  useEffect(() => {
    const getWorkshop = async () => {
      const data = await fetchWorkshopDetails(id);
      data['offerings'] = data.offerings.filter((offering: Offering) => 
        offering.occupied < offering.capacity
      )
      data['offerings'] = data.offerings.sort(compare)
      setWorkshop(data);
    }
    getWorkshop();
  }, [id])

  return (
    <>
      <Stack>
        <div className="workshopDetailsHeader">
          <Image 
            src={workshop.gallery[0]}
            fit="cover"
            fill="horizontal"
            style={{height: 400}}
          />

          <div className="workshopDetailsHeaderTextContainer">
            <Heading color="white">{workshop.name}</Heading>

            <Text color="white" size="25px" >{workshop.category}</Text>

            <Box direction="row" margin={{top: "medium"}} align="center">
              {generateRatingStars(3)}
              <Text style={{marginTop: 3, marginLeft: 20}}>{`${workshop.reviews.length} Reviews`}</Text>
            </Box>
          </div>
        </div>
      </Stack>
      
      
      <div className="workshopDetailsContent" id="middle">
        <div className="firstCol">
          <DescriptionCard description={workshop.description}/>
          <ReviewsForm />
          <ReviewsCard reviews={workshop.reviews}/>
        </div>

        <div className="secondCol">
          <InstructorCard instructor={workshop._instructor}/>
          <ReservationCard offerings={workshop.offerings}/>
          <GalleryCard gallery={workshop.gallery} />
        </div>
      </div>
    </>
  );
}
