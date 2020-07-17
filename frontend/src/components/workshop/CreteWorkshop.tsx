import { Box, Button, Form, FormField, Heading, Text, TextInput, TextArea } from 'grommet';
import { toast } from 'react-toastify';
import { useHistory, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { useForm } from 'react-hook-form';
import { api, axios } from '../../utils/api';
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

  const { register, control, handleSubmit, errors, reset } = useForm({
    defaultValues: {},
  });

  const [apiError, setApiError] = useState(null);
  const location = useLocation();
  const [offerings, setData] = useState<Offering[]>([]); // pass initilized offerings
  const [title, setTitle] = useState('Create'); // pass initilized offerings

  useEffect(() => {
    const url_toks = location.pathname.split('/');
    if (!location.pathname.includes('edit')) {
      return;
    }
    setTitle('Edit');
    // @ts-ignore
    const id = url_toks[url_toks.length - 1];
    const fetchData = async () => {
      try {
        setApiError(null);
        // eslint-disable-next-line
        const resp = await axios.get(api.ALL_WORKSHOPS + '/' + id);

        for (let i = 0; i < resp.data.data.offerings.length; i += 1) {
          const offering = resp.data.data.offerings[i];

          const { startDate } = offering;
          let curDate = new Date(startDate);

          let dd = String(curDate.getDate());
          let mm = String(curDate.getMonth() + 1); // January is 0!
          let yyyy = curDate.getFullYear();
          resp.data.data.offerings[i].startDate = `${dd}-${mm}-${yyyy}`;

          const { endDate } = offering;
          curDate = new Date(endDate);

          dd = String(curDate.getDate());
          mm = String(curDate.getMonth() + 1); // January is 0!
          yyyy = curDate.getFullYear();
          resp.data.data.offerings[i].endDate = `${dd}-${mm}-${yyyy}`;
        }
        resp.data.data.gallery = resp.data.data.gallery.join('\n');
        reset(resp.data.data);
        setData(resp.data.data.offerings);
      } catch (error) {
        history.push(`/lost`);
      }
    };
    fetchData();
  }, [location.pathname, reset, history]);

  const onSubmit = async (data: any) => {
    const url_toks = location.pathname.split('/');
    if (location.pathname.includes('edit')) {
      try {
        // @ts-ignore
        const id = url_toks[url_toks.length - 1];
        setApiError(null);
        const token = window.localStorage.getItem('token');
        // eslint-disable-next-line
        const resp = await axios.put(api.ALL_WORKSHOPS + '/' + id, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success('Update Successful');

        history.push(`/workshops/${id}`);
      } catch (error) {
        setApiError(error.response.data?.message);
      }
    } else {
      try {
        setApiError(null);
        const token = window.localStorage.getItem('token');
        // eslint-disable-next-line
        const resp = await axios.post(
          api.ALL_WORKSHOPS,
          { ...data },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success('Create Successful');
        history.push(`/workshops/${resp.data.data._id}`);
      } catch (error) {
        setApiError(error.response.data?.message);
      }
    }
  };
  const append = () => {
    setData([...offerings, {} as Offering]);
  };

  const removeOffering = (removedIndex: number) => {
    const updatedOfferings = offerings.filter((offering, index) => removedIndex !== index);
    setData(updatedOfferings);
  };

  return (
    <Box width="full" pad={{ horizontal: '15%', vertical: 'medium' }} fill>
      <Heading size="medium" textAlign="center" style={{ maxWidth: '100%' }}>
        {title} your workshop.
      </Heading>
      <Text textAlign="center">
        <div> Add a workshop that you would like to offer </div>
      </Text>
      {apiError && <ErrorBox text={apiError} />}

      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormField label="Name">
          <TextInput
            name="name"
            // placeholder="public speaking with hady"
            ref={register({ required: { value: true, message: 'name is required.' } })}
          />
        </FormField>
        <div className="errors">{errors.name && errors.name.message}</div>

        <FormField label="Category">
          <select
            name="category"
            ref={register({ required: { value: true, message: 'Categry is required.' } })}
          >
            {Categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </FormField>
        <div className="errors">{errors.category && errors.category.message}</div>
        <FormField label="Description">
          <TextArea
            name="description"
            placeholder="Description of the workshop ex: This workshop is going to teach to publicly speak with confidence."
            rows={5}
            ref={register({ required: { value: true, message: 'description is required.' } })}
          />
        </FormField>
        <div className="errors">{errors.description && errors.description.message}</div>

        <FormField label="Gallery">
          <TextArea
            name="gallery"
            placeholder="URLs to images for the gallery. Please provide each URL on a new line."
            rows={5}
            ref={register({ required: { value: false, message: 'description is required.' } })}
          />
        </FormField>
        <div className="errors">{errors.gallery && errors.description.gallery}</div>

        {offerings ? (
          offerings.map((offering, idx) => {
            return (
              <div key={idx || offering.id}>
                <br />
                <div>offering {idx + 1}</div>
                <br />
                <Offering
                  offering={offering}
                  control={control}
                  key={idx || offering.id}
                  offeringIndex={idx}
                  register={register}
                  errors={errors}
                />
                <Button color="red" label="Delete Offering" onClick={() => removeOffering(idx)} />
              </div>
            );
          })
        ) : (
          <div />
        )}
        <br />
        <Box direction="row" gap="medium">
          <Button color="green" label="Add Offering" onClick={() => append()} />
          <Button type="submit" primary label="Submit" />
          <Button type="reset" label="Reset" />
        </Box>
      </Form>
    </Box>
  );
}
