import { Box, Button, Form, FormField, Heading, Text, TextInput, TextArea, Select } from 'grommet';
import { toast } from 'react-toastify';
import { useHistory, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm, useFieldArray } from 'react-hook-form';
import api from '../../utils/api';
import ErrorBox from '../common/error';
// eslint-disable-next-line import/no-cycle
import Offering from './offering/Offering';

export type Offering = {
  id?: string;
  startDate?: any;
  endDate?: any;
  location?: string;
  address?: string;
};

type Inputs = {
  name: string;
  category: string;
  description: string;
};

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface IProps {
  offerings: Offering[];
}

const Categories = [
  '',
  'Communications',
  'Creativity',
  'TeamWork',
  'Emotional-Intelligence',
  'Adaptability',
  'Leadership',
  'Problem-solving',
];

export default function CreateWorkshop() {
  const history = useHistory();
  const { register, control, handleSubmit, errors } = useForm();

  useFieldArray({
    control,
    name: 'offerings',
  });

  const [apiError, setApiError] = useState(null);
  const location = useLocation();
  const [offerings, setData] = useState<Offering[]>([]); // pass initilized offerings
  const [workshopData, setWorkshopData] = useState<Inputs>(); // pass initilized offerings

  useEffect(() => {
    console.log(location.pathname.split('/'));
    const url_toks = location.pathname.split('/');
    if (!location.pathname.includes('edit')) {
      console.log('woooooooooo');

      return;
    }
    // @ts-ignore
    const id = url_toks[url_toks.length - 1];
    const fetchData = async () => {
      try {
        setApiError(null);
        const token = window.localStorage.getItem('token');
        // eslint-disable-next-line
              const resp = await axios.get(api.ALL_WORKSHOPS + '/' + id, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
        // if
        setData(resp.data.data.offerings);
        setWorkshopData(resp.data.data);
        console.log(resp.data.data.name);

        console.log('----------------');
      } catch (error) {
        setApiError(error.response.data?.message);
      }
    };
    fetchData();
  }, [location.pathname]);

  const [value, setValue] = React.useState(workshopData?.category || Categories[0]);
  //   const [offerings, updateOffering] = React.useState([{} as Offering]);

  const onSubmit = async (data: any) => {
    try {
      setApiError(null);
      const token = window.localStorage.getItem('token');
      // eslint-disable-next-line
      const resp = await axios.post(api.ALL_WORKSHOPS, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Create Successful');
      console.log(resp.data);

      history.push(`/workshops/${resp.data}`);
    } catch (error) {
      setApiError(error.response.data?.message);
    }
  };
  const append = () => {
    setData([...offerings, {} as Offering]);
  };

  const remove = (removedIndex: number) => {
    const updatedOfferings = offerings.filter((offering, index) => removedIndex !== index);
    setData(updatedOfferings);
  };

  // eslint-disable-next-line no-shadow
  const updateStartDate = (modifiedIndex: number, value: Date) => {
    const updatedOfferings = offerings.map((offering, index) => {
      if (index === modifiedIndex) {
        // eslint-disable-next-line no-param-reassign
        offering.startDate = value;
        return offering;
      }
      return offering;
    });
    setData(updatedOfferings);
  };

  return (
    <Box width="full" pad={{ horizontal: '15%', vertical: 'medium' }} fill>
      <Heading size="medium" textAlign="center" style={{ maxWidth: '100%' }}>
        Create a workshop.
      </Heading>
      <Text textAlign="center">
        <div> Add a workshop that you would like to offer </div>
      </Text>
      {apiError && <ErrorBox text={apiError} />}

      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormField label="Address">
          <input
            defaultValue={workshopData?.name}
            name={`offerings[${0}].address`}
            placeholder="22 example st."
          />
        </FormField>
        <FormField label="Name">
          <TextInput
            defaultValue={workshopData?.name}
            name="startDate"
            // placeholder="public speaking with hady"
            ref={register({ required: { value: true, message: 'name is required.' } })}
          />
        </FormField>
        <div className="errors">{errors.name && errors.name.message}</div>

        <FormField label="Category">
          <Select
            name="category"
            options={Categories}
            value={value}
            onChange={({ option }) => setValue(option)}
            // ref={register()}
          />
        </FormField>
        <div className="errors">{errors.category && errors.category.message}</div>
        <FormField label="Description">
          <TextArea
            defaultValue={workshopData?.description}
            name="description"
            placeholder="Description of the workshop ex: This workshop is going to teach to publicly speak with confidence."
            rows={5}
            ref={register({ required: { value: true, message: 'description is required.' } })}
          />
        </FormField>
        <div className="errors">{errors.description && errors.description.message}</div>

        {offerings ? (
          offerings.map((offering, idx) => {
            return (
              <div>
                <br />
                <div>offering {idx + 1}</div>
                <br />
                <Offering
                  offering={offering}
                  updateStartDate={updateStartDate}
                  control={control}
                  key={idx || offering.id}
                  offeringIndex={idx}
                  register={register}
                  errors={errors}
                />
                <Button color="red" label="Delete" onClick={() => remove(idx)} />
              </div>
            );
          })
        ) : (
          <div />
        )}
        <br />
        <Box direction="row" gap="medium">
          <Button color="green" label="Add" onClick={() => append()} />
          <Button type="submit" primary label="Submit" />
          <Button type="reset" label="Reset" />
        </Box>
      </Form>
    </Box>
  );
}
