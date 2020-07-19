import React, { useEffect, useState } from 'react';
import { 
  Text,
  Box,
  Heading,
  Button,
  FormField,
  TextInput,
  Form,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody
} from 'grommet';
import { api, axios } from '../../utils/api';
import { useForm } from 'react-hook-form';
import ErrorBox from '../common/error';
import { toast } from 'react-toastify';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import { useParams, useHistory } from 'react-router-dom';
import moment from 'moment';

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

export default function Workshop() {
  const [offering, setOffering] = useState<Offering>();
  const [workshop,setWorkshop]= useState<Workshop>();
  const [apiError, setApiError] = useState(null);
  const { register, handleSubmit, errors, reset } = useForm<Inputs>();
  const stripe = useStripe();
  const elements = useElements();
  const { offeringId, workshopId } = useParams<{ offeringId: string, workshopId: string }>();
  const history = useHistory();

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
        toast.error("Please check your credit card details",{autoClose:2000});
        return;
      }
      data._workshop=workshop?._id
      data._offering=offering?._id;
      data.token=token?.id;
      const resp = await axios.post(api.BOOK_WORKSHOP, data);

      if(!resp.data.data){
        toast.error("The Coupon you entered does not exist",{autoClose:2000});
        return;
      }
      toast.success('Booking Successful!');
      reset();
      history.push(`/workshops/${workshopId}`)
    } catch (error) {
      setApiError(error.response.data?.message);
    }
  };
  const fetchWorkshop = async (_id: string) => {
    try {
      const result = await (await axios.get(api.singleWorkshop(_id))).data.data;
      const offering = result.offerings.find((o:any) => o._id === offeringId);
      if(!offering) {
        window.location.href = "/lost";
        return ; 
      }
      setWorkshop(result);
      setOffering(offering);
      return result;
    } catch(error) {
      setApiError(error.response.data?.message);
    }
  };
    
  useEffect(() => {
    fetchWorkshop(workshopId);
  },[]);

  if(offering && offering.occupied === offering.capacity) {
    return <Heading style={{ maxWidth: '100%' }} className="full-height" textAlign="center">Sorry, this offering is fully booked</Heading>
  }

  return (
    <Box>
      <Box>
        <Heading size="small" textAlign="center" style={{ maxWidth: '100%' }}>
          Booking Info
        </Heading>
        <Box margin={{horizontal: "large"}}>
          <Table>
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
                <TableCell>{moment(offering?.startDate).format("DD/MM/YYYY")}</TableCell>
                <TableCell>{moment(offering?.endDate).format("DD/MM/YYYY")}</TableCell>
                <TableCell>{offering?.location}</TableCell>
                <TableCell>{offering?.address}</TableCell>
                <TableCell>{offering?.price} USD</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </Box>

      <Box margin="large"> 
        <Heading margin="small" level="2"> Billing Details</Heading>

        <Form onSubmit={handleSubmit(onSubmit)}>
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
              }, })}
            />
          </FormField>
          <div className="errors">{errors.emailAddress && errors.emailAddress.message}</div>

          <FormField label="Coupon">
            <TextInput name="_coupon" placeholder="Enter Coupon if available" ref={register()}/>
          </FormField>

          <FormField label="Payment">
            <Box margin="small">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#424770',
                      '::placeholder': {
                        color: '#aab7c4',
                      },
                      padding: 40
                    },
                    invalid: {
                      color: '#9e2146',
                    },
                  },
                }}
              />
            </Box> 
          </FormField>
          <Box style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
            alignItems: "center"
          }}>
            <h2>Total: {offering?.price} USD</h2>
            <Button 
              primary
              label="Book Now"
              type="submit"
              disabled={!stripe}
            />
          </Box>
          
          <Box margin="medium">{apiError && <ErrorBox text={apiError} />}</Box>
        </Form>
      </Box>
    </Box>       
  );
}