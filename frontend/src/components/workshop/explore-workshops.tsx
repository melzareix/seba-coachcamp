import axios from 'axios';
import { Box, Grid, Heading } from 'grommet';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import WorkshopCard from '../common/workshopCard';
import api from '../../utils/api';

export default function WorkshopsList() {
  const [workshops, setWorkshops] = useState([
    {
      gallery: [],
      name: '',
      description: '',
    },
  ]);
  const [pageNumber, setPageNumber] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const pageLimit = 10;

  useEffect(() => {
    const fetchData = async () => {
      const allWorkshops = await axios.get(api.WORKSHOPS_COUNT);
      const skip = (pageNumber - 1) * pageLimit;
      setMaxPage(Math.ceil(allWorkshops.data.data / pageLimit));
      const paginatedWorkshops = await axios.get(api.paginatedWorkshops(skip, pageLimit));
      setWorkshops(paginatedWorkshops.data.data);
    };
    fetchData();
  }, [pageNumber]);

  async function changePageNumber(newPageNum: number) {
    if (newPageNum >= 1) {
      const skip = (newPageNum - 1) * pageLimit;
      const paginatedWorkshops = await axios.get(api.paginatedWorkshops(skip, pageLimit));
      setWorkshops(paginatedWorkshops.data.data);
      setPageNumber(newPageNum);
    }
  }

  return (
    <Box justify="center" width="full">
      <Heading textAlign="center" style={{ maxWidth: '100%' }}>
        Workshops Catalog
      </Heading>
      <Grid rows="small" columns="medium" gap="large" pad="large">
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
      {workshops.length === 0 && (
        <Heading textAlign="center" style={{ maxWidth: '100%' }}>
          Loading...
        </Heading>
      )}
      <ReactPaginate
        breakLabel="..."
        breakClassName="break-me"
        pageCount={maxPage}
        marginPagesDisplayed={5}
        pageRangeDisplayed={5}
        onPageChange={async ({ selected }) => changePageNumber(selected)}
        containerClassName="pagination"
        activeClassName="active"
      />
    </Box>
  );
}
