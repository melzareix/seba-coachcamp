import React, { useCallback, useEffect, useState } from 'react';
import { Text,Box, Grid,Heading,Button,FormField,TextInput ,Form,Table,TableHeader,TableRow,TableCell,TableBody} from 'grommet';
import { api, axios } from '../../utils/api';
import { useForm } from 'react-hook-form';
import ErrorBox from '../common/error';
import { toast } from 'react-toastify';
import {CardElement, useStripe, useElements,Elements} from '@stripe/react-stripe-js';


type Offering = {
    _id: string;
    price: string;
    startDate: string;
    endDate: string;
    location:string;
    address:string;
    capacity:number;
    occupied:number;
  };
  type Workshop = {
    _id: string;
    name: string;
    description: string;
  };
  type Inputs = {
    firstName: string;
    lastName: string;
    address: string;
    postCode: string;
    city:string;
    phoneNumber: string;
    emailAddress: string;
    _coupon:string;
    
  };

export default function Workshop(props:any) {

    const [offering, setOffering] = useState<Offering>();
    const [workshop,setWorkshop]= useState<Workshop>();
    const [apiError, setApiError] = useState(null);
    const { register, handleSubmit, errors } = useForm<Inputs>();
    const stripe = useStripe();
    const elements = useElements();

    const onSubmit = async (data: any) => {
      try {
        setApiError(null);
        if (!stripe || !elements) {
          return;
        }
      
        const cardElement = elements.getElement(CardElement);
      
      if(!cardElement){
        return;
      }

      const {token,error} = await stripe.createToken(cardElement );
        if(error){
          toast.error("Please check your credit card details");
          return;
        }
        data._workshop=workshop?._id
        data._offering=offering?._id;
        data.token=token?.id;
        console.log(data);
        const resp = await axios.post(api.BOOK_WORKSHOP, data);
        toast.success('Booking Successful!');
      } catch (error) {
        setApiError(error.response.data?.message);
      }
    };
    const fetchWorkshop = async (_id: string) => {
        try{
        const result = await (await axios.get(api.singleWorkshop(_id))).data.data;
        console.log(result);
        const offering = result.offerings.find((o:any) => o._id === props.offering_id);
        if(!offering){
            return ; //TODO:Throw Error
        }

        setWorkshop(result);
        setOffering(offering);
        return result;
    } catch(error){
        setApiError(error.response.data?.message);
    }

      };
      
    useEffect(() => {
         fetchWorkshop(props.workshop_id);
    
      },[]);


  return (
    <Box>

<Box>
<Heading size="small" textAlign="center" style={{ maxWidth: '100%' }}>
       Booking Info
      </Heading>
<Table alignSelf="center">
  <TableHeader>
    <TableRow>
      <TableCell scope="col" >
        <strong>Workshop Name</strong>
      </TableCell>
      <TableCell scope="col" >
      <strong> Start Date</strong>
      </TableCell>
      <TableCell scope="col" >
        <strong>End Date</strong>
      </TableCell>
      <TableCell scope="col" >
      <strong>Location</strong>
      </TableCell>
      <TableCell scope="col" >
      <strong>Address</strong>
      </TableCell>
      <TableCell scope="col" >
      <strong>Price</strong>
      </TableCell>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
  <TableCell>{workshop?.name}</TableCell>
  <TableCell>{offering?.startDate.substr(0,10)}</TableCell>
      <TableCell>{offering?.endDate.substr(0,10)}</TableCell>
      <TableCell>{offering?.location}</TableCell>
      <TableCell>{offering?.address}</TableCell>
      <TableCell>{offering?.price}</TableCell>
    </TableRow>
  </TableBody>
</Table>
</Box>


<Form onSubmit={handleSubmit(onSubmit)}>
    <Box
    direction="row"
    border={{ color: 'brand', size: 'large' }}
    pad="medium"
    margin="xlarge"
    >     
          <Grid rows="xsmall" columns="small" gap="small" pad="small">
          <Heading margin="none" level="2"> Billing Details </Heading>
          <FormField label="First name *">
    <TextInput name = "firstName" placeholder="" ref={register({ required: { value: true, message: 'first name is required.' } })} />
          </FormField>    
          <div className="errors">{errors.firstName && errors.firstName.message}</div>
           <FormField label="Last name*">
    <TextInput name="lastName" placeholder="" ref={register({ required: { value: true, message: 'last name is required.' } })}/>
          </FormField>
          <div className="errors">{errors.lastName && errors.lastName.message}</div>
          <FormField label="Address*">
    <TextInput name="address" placeholder="" ref={register({ required: { value: true, message: 'Address is required.' } })}/>
          </FormField>
          <div className="errors">{errors.address && errors.address.message}</div>
          <FormField label="Postcode/ZIP*">
    <TextInput name="postCode" placeholder=""ref={register({ required: { value: true, message: 'Postcode is required.' } })} />
          </FormField>
          <div className="errors">{errors.postCode && errors.postCode.message}</div>
          <FormField label="City*">
    <TextInput name="city" placeholder="" ref={register({ required: { value: true, message: 'City is required.' } })} />
          </FormField>
          <div className="errors">{errors.city && errors.city.message}</div>
          <FormField label="Phone Number*">
    <TextInput name="phoneNumber" placeholder="" ref={register({ required: { value: true, message: 'Phone Number is required.' },              pattern: {
                value: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/,
                message: 'invalid phone number.',
              }, })}/>
          </FormField>
          <div className="errors">{errors.phoneNumber && errors.phoneNumber.message}</div>
          <FormField label="Email address*">
    <TextInput name="emailAddress" placeholder="" ref={register({ required: { value: true, message: 'Email is required.' },
   pattern: {
    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: 'invalid email address.',
  }, })}/>
          </FormField>
          <div className="errors">{errors.emailAddress && errors.emailAddress.message}</div>

          <FormField label="Coupon">
    <TextInput name="_coupon" placeholder="Enter Coupon if available" ref={register()}/>
          </FormField>

<Text margin ="xsmall">Total: {offering?.price}</Text>

<Text textAlign="start" margin="small" size="medium"><u>Credit card Details</u></Text>
  <CardElement
  options={{
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  }}
/>
          <Button primary label="Book Now" type="submit" margin="small" disabled = {!stripe}size="small" />
      </Grid>
        </Box>
        <Box margin="medium">{apiError && <ErrorBox text={apiError} />}</Box>
        </Form>


        </Box>
        
  );
}
