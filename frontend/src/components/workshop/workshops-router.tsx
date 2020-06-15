import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Workshop from './workshop';
import WorkshopsList from './explore-workshops';

export default function WorkshopsRouter() {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.path}/:id`}>
        <Workshop />
      </Route>
      <Route path={match.path}>
        <WorkshopsList />
      </Route>
    </Switch>
  );
}
