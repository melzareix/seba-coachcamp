// @ts-ignore
import { Box, Grid, Heading } from 'grommet';
import qs from 'query-string';
import React, { useCallback, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useHistory, useLocation } from 'react-router-dom';
import { api, axios } from '../../utils/api';
import SearchForm from '../common/searchForm';
import WorkshopCard from '../common/workshopCard';
import { getOfferingsLocations } from '../../utils/utils';

type SearchFilters = {
  text: string;
  location: string;
  category: string;
};

type Offering = {
  location: string;
};

type Workshop = {
  _id: string;
  gallery: string[];
  name: string;
  description: string;
  rating: number;
  offerings: Offering[];
};

const defaultSearchFilters = {
  name: '',
  location: '',
  category: ''
};

const fetchWorkshopsCount = async (params: SearchFilters) => {
  const resultsCount = await axios.get(api.WORKSHOPS_COUNT, {
    params
  });
  return resultsCount.data.data;
};

export default function WorkshopsList() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [errorMessage, setErrorMessage] = useState('Loading...');

  const [maxPages, setMaxPages] = useState(-1);

  const pageLimit = 9;
  const loc = useLocation();
  const history = useHistory();

  const changePageNumber = useCallback(
    async (newPageNum: number) => {
      try {
        const skip = newPageNum * pageLimit;
        const queryParams = qs.parse(loc.search);
        const paginatedWorkshops = await axios.get(api.ALL_WORKSHOPS, {
          params: {
            ...queryParams,
            skip,
            limit: pageLimit
          }
        });
        setWorkshops(paginatedWorkshops.data.data);
        window.scrollTo({
          top: 0
        });
      } catch (error) {
        setErrorMessage('Failed to load workshops.');
      }
    },
    [loc.search]
  );

  useEffect(
    () => {
      const getInitialCount = async () => {
        try {
          const queryParams = qs.parse(loc.search) as SearchFilters;
          const count = await fetchWorkshopsCount(queryParams);
          setMaxPages(Math.ceil(count / pageLimit));
          if (count === 0) {
            setErrorMessage('No Workshops found :(');
          }
          changePageNumber(0);
        } catch (error) {
          setErrorMessage('Failed to load workshops.');
        }
      };
      getInitialCount();
    },
    [loc.search, changePageNumber]
  );

  async function search({ value: params }: any) {
    history.push({
      pathname: '/workshops',
      search: qs.stringify(params)
    });
  }

  return (
    <Box justify="center" fill>
      <Heading textAlign="center" style={{ maxWidth: '100%' }}>
        Workshops Catalog
      </Heading>

      <SearchForm
        onSubmit={search}
        defaultState={{ ...defaultSearchFilters, ...qs.parse(loc.search) }}
        workshops
      />

      <Grid rows="small" columns="medium" gap="large" pad="medium">
        {workshops.map(workshop => {
          return (
            <WorkshopCard
              key={`${workshop._id}`}
              id={workshop._id}
              image={`${workshop.gallery[0]}`}
              title={`${workshop.name}`}
              subtitle={getOfferingsLocations(workshop.offerings)}
              rating={workshop.rating}
              onClick={() => history.push(`/workshops/${workshop._id}`)}
            />
          );
        })}
      </Grid>

      {workshops.length === 0 && (
        <Heading textAlign="center" style={{ maxWidth: '100%' }}>
          {errorMessage}
        </Heading>
      )}

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
