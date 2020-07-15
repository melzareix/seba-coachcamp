import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { GuardedRoute } from 'react-router-guards';
import WorkshopsList from './explore-workshops';
import Workshop from './workshop';
import WorkshopBooking from './workshop-booking'
export default function WorkshopsRouter() {
  const match = useRouteMatch();
  return (
    <Switch>
        <Route path={`${match.path}/:id/book`}>
        <WorkshopBooking offering_id="5ef9bab5efc0ff3405f7471e" workshop_id="5ef9bab5efc0ff3405f7471d"/>
      </Route>
      <Route path={`${match.path}/:id`}>
        <Workshop />
      </Route>

      <GuardedRoute path={match.path}>
        <WorkshopsList />
      </GuardedRoute>
    </Switch>
  );
}
