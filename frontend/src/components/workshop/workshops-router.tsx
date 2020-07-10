import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { GuardedRoute } from 'react-router-guards';
import WorkshopsList from './explore-workshops';
import Workshop from './workshop';
import CreateWorkshop from './CreteWorkshop';

export default function WorkshopsRouter() {
  const match = useRouteMatch();
  return (
    <Switch>
      <GuardedRoute path={`${match.path}/create`}>
        <CreateWorkshop />
      </GuardedRoute>
      <GuardedRoute path={`${match.path}/edit/:id`}>
        <CreateWorkshop />
      </GuardedRoute>
      <Route path={`${match.path}/:id`}>
        <Workshop />
      </Route>
      <GuardedRoute path={match.path}>
        <WorkshopsList />
      </GuardedRoute>
    </Switch>
  );
}
