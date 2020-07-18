import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { GuardedRoute } from 'react-router-guards';
import WorkshopsList from './explore-workshops';
import WorkshopBooking from './workshop-booking'
import Workshop from './workshopDetails/workshop';
import CreateWorkshop from './CreteWorkshop';

interface MatchParams {
  id: string
}


export default function WorkshopsRouter() {
  const match = useRouteMatch<MatchParams>();
  return (
    <Switch>
        <Route path={`${match.path}/:id/book`}>
        <WorkshopBooking offering_id="5ef9bab5efc0ff3405f7471e" workshop_id="5ef9bab5efc0ff3405f7471d"/>
      </Route>
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
