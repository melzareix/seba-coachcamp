import React from 'react';
import { Switch, useRouteMatch } from 'react-router-dom';
import { GuardedRoute } from 'react-router-guards';
import Login from './login';
import Register from './register';

export default function AuthRouter() {
  const match = useRouteMatch();
  return (
    <Switch>
      <GuardedRoute path={`${match.path}/login`} meta={{ redirect: true }}>
        <Login />
      </GuardedRoute>
      <GuardedRoute path={`${match.path}/register`} meta={{ redirect: true }}>
        <Register />
      </GuardedRoute>
      <GuardedRoute exact path={match.path} meta={{ redirect: true }}>
        <Login />
      </GuardedRoute>
    </Switch>
  );
}
