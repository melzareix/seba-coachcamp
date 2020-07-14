import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { GuardedRoute } from 'react-router-guards';
import InstructorDashboard from './dashboard';

export default function InstructorsRouter() {
  const match = useRouteMatch();
  return (
    <Switch>
      <GuardedRoute path={`${match.path}/dashboard`} meta={{ auth: true }}>
        <InstructorDashboard />
      </GuardedRoute>

      <Route exact path={`${match.path}/:id`}>
        <InstructorDashboard />
      </Route>
    </Switch>
  );
}
