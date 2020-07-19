import qs from 'query-string';
import React from 'react';
import { useHistory } from 'react-router-dom';
import SearchForm from '../common/searchForm';
import HomeCategories from './homeCategories';
import HomeHero from './homeHero';
import HomeWorkshops from './homeWorkshops';

export default function Home() {
  const history = useHistory();
  return (
    <>
      <HomeHero />
      <SearchForm
        onSubmit={({ value: params }: any) => {
          history.push({
            pathname: '/workshops',
            search: qs.stringify(params)
          });
        }}
      />
      <HomeCategories />
      <HomeWorkshops />
    </>
  );
}
