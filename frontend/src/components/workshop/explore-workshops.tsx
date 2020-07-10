// @ts-ignore
import axios from 'axios';
import { Box, Grid, Heading, Form, FormField, TextInput, Button, Text, Select } from 'grommet';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import api from '../../utils/api';
import WorkshopCard from '../common/workshopCard';

export default function WorkshopsList() {
  const [workshops, setWorkshops] = useState([
    {
      gallery: [],
      name: '',
      description: '',
    },
  ]);
  const [maxPages, setMaxPages] = useState(1);
  const [maxCount, setMaxCount] = useState(0);
  const [categories, setCategories] = useState(['test']);
  const pageLimit = 12;

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const allWorkshops = await axios.get(api.WORKSHOPS_COUNT);
  //     setMaxCount(allWorkshops.data.data);
  //     setMaxPages(Math.ceil(allWorkshops.data.data / pageLimit));
  //   };
  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchCount = async () => {
      const resultsCount = await axios.get(api.ALL_WORKSHOPS, {
        params: {},
      });
      setMaxCount(resultsCount.data.data);
      setMaxPages(Math.ceil(resultsCount.data.data / pageLimit));
    };
    fetchCount();
  }, []);

  async function changePageNumber(newPageNum: number) {
    const skip = newPageNum * pageLimit;
    const paginatedWorkshops = await axios.get(api.paginatedWorkshops(skip, pageLimit));
    setWorkshops(paginatedWorkshops.data.data);
    window.scrollTo({
      top: 0,
    });
  }

  return (
    <Box justify="center" width="full">
      <Heading textAlign="center" style={{ maxWidth: '100%' }}>
        Workshops Catalog
      </Heading>

      <Box width="full" margin={{ vertical: 'medium' }}>
        <Form>
          <Box direction="row" justify="center" gap="large">
            <FormField width="medium">
              <TextInput placeholder="Keyword (e.g Leadership)" />
            </FormField>
            <FormField>
              <TextInput placeholder="Location" />
            </FormField>
            <FormField>
              <Select options={categories} />
            </FormField>
            <Button label="Search" type="submit" primary />
          </Box>
        </Form>
      </Box>

      <Grid rows="small" columns="medium" gap="large" pad="medium">
        {workshops.map((workshop) => {
          return (
            <WorkshopCard
              image={`${workshop.gallery[0]}`}
              title={`${workshop.name}`}
              subtitle={`${workshop.description}`}
              rating={5}
            />
          );
        })}
      </Grid>
      <ReactPaginate
        breakLabel="..."
        breakClassName="break-me"
        pageCount={maxPages}
        initialPage={0}
        marginPagesDisplayed={5}
        pageRangeDisplayed={5}
        onPageChange={async ({ selected }) => changePageNumber(selected)}
        containerClassName="pagination"
        activeClassName="active"
      />
    </Box>
  );
}
