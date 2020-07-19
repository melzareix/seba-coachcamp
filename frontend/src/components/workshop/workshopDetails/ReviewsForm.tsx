import React, {useState} from 'react';
import {Box, Text, TextArea, Button, TextInput, Form, FormField} from 'grommet';
import {Edit} from 'grommet-icons';
import StarEmptyIcon from '../../../assets/icons/star-empty.svg';
import StarFilledIcon from '../../../assets/icons/star-filled.svg';
import { Review } from './types';
import { useForm } from 'react-hook-form';

interface props {
  onSubmit: (data: Review, reset: any, setRating: any) => void;
}

const ReviewsForm = ({onSubmit}: props) => {
  const [rating, setRating] = useState<number>(0);

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
  
  const { register, handleSubmit, errors, reset } = useForm({
    defaultValues: {},
  });

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
      <Form onSubmit={handleSubmit((data: any) => onSubmit({rating, ...data}, reset, setRating) )}>
        <FormField label="Rating">
          <Box direction="row" margin={{bottom: "medium", left: "small", top: "small"}}>
            {_generateRatingStars()}
          </Box>
        </FormField>

        <FormField label="Name">
          <TextInput
            placeholder="Type your name here"
            name="name"
            style={{marginBottom: 20}}
            ref={register({ required: { value: true, message: 'name is required.' } })}
          />
        </FormField>
        <div className="errors">{errors.name && errors.name.message}</div>

        <FormField label="Email">
          <TextInput
            placeholder="Type your email here"
            name="email"
            style={{marginBottom: 20}}
            ref={register({ required: { value: true, message: 'email is required.' } })}
          />
        </FormField>
        <div className="errors">{errors.email && errors.email.message}</div>

        <FormField label="Description">
          <TextInput
            placeholder="Type your Review here"
            style={{marginBottom: 20}}
            name="description"
            ref={register({ required: { value: true, message: 'Description is required.' } })}
          />
        </FormField>
        <div className="errors">{errors.description && errors.description.message}</div>
        <Box align="end">
          <Button type="submit" primary label="Submit" style={{marginTop: 20}}/>
        </Box>
      </Form>
       
  </Box>
  );
}

export default ReviewsForm;