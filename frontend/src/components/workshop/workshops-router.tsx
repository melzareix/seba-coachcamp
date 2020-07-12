import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { GuardedRoute } from 'react-router-guards';
import WorkshopsList from './explore-workshops';
import Workshop from './workshopDetails/workshop';

export default function WorkshopsRouter() {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.path}/:id`}>
        <Workshop />
      </Route>
      <GuardedRoute path={match.path}>
        <WorkshopsList />
      </GuardedRoute>
    </Switch>
  );
}
