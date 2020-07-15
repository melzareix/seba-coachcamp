import React, { useCallback, useEffect, useState } from 'react';
import { Box, Grid,Heading,Button,FormField,TextInput ,Form,Table,TableHeader,TableRow,TableCell,TableBody} from 'grommet';
import { api, axios } from '../../utils/api';
import ErrorBox from '../common/error';

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

export default function Workshop(props:any) {
    const [offering, setOffering] = useState<Offering>();
    const [Workshop,setWorkshop]= useState<Workshop>();
    const [apiError, setApiError] = useState(null);
    const fetchWorkshop = async (_id: string) => {
        try{
        const result = await (await axios.get(api.singleWorkshop(_id))).data.data;
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
        // const setVars = async () => {
        //     let temp_offering={
        //     _id:"sdasd",
        //     price:"213123",
        //     startDate:"11/11/11",
        //     endDate:"11/11/11",
        //     location:"somewhere",
        //     address:"somewhere",
        //     capacity:50,
        //     occupied:60
        //     }
        //     let temp_workshop={
        //         _id:"asd",
        //         name:'sdasda',
        //         description:"Sdsd"
        //     }
        //     setOffering(temp_offering);
        //     setWorkshop(temp_workshop);
        // };
         fetchWorkshop(props.workshop_id);
    
      },[]);


  return (
    <Form>

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
  <TableCell>{Workshop?.name}</TableCell>
  <TableCell>{offering?.startDate}</TableCell>
      <TableCell>{offering?.endDate}</TableCell>
      <TableCell>{offering?.location}</TableCell>
      <TableCell>{offering?.address}</TableCell>
      <TableCell>{offering?.price}</TableCell>
    </TableRow>
  </TableBody>
</Table>
</Box>

    <Box
    direction="row"
    border={{ color: 'brand', size: 'large' }}
    pad="medium"
    margin="xlarge"
    >     
          <Grid rows="xsmall" columns="small" gap="small" pad="small">
          <Heading margin="none" level="2"> Billing Details </Heading>
          <FormField label="First name *">
    <TextInput placeholder="" />
          </FormField>    
           <FormField label="Last name*">
    <TextInput placeholder="" />
          </FormField>
          <FormField label="Address*">
    <TextInput placeholder="" />
          </FormField>
          <FormField label="Postcode/ZIP*">
    <TextInput placeholder="" />
          </FormField>
          <FormField label="City*">
    <TextInput placeholder="" />
          </FormField>
          <FormField label="Phone Number*">
    <TextInput placeholder="" />
          </FormField>
          <FormField label="Email address*">
    <TextInput placeholder="" />
          </FormField>
<div>   <p>Total :</p>
  <p>{offering?.price}</p>
  </div>

      
          <Button primary label="Book Now" margin="small" size="small" />
      </Grid>
        </Box>
        <Box margin="medium">{apiError && <ErrorBox text={apiError} />}</Box>
        </Form>
        
  );
}
