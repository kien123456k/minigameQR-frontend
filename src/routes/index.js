import React from 'react';
import { Switch } from 'react-router-dom';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import Introduction from '../containers/Introduction';
import Quiz from '../containers/Quiz';
import WelcomePage from '../containers/WelcomePage';

export const publicRoutes = [
  {
    path: '/welcome',
    name: 'welcome',
    component: WelcomePage,
  },
];
export const privateRoutes = [
  {
    path: '/introduction',
    name: 'introduction',
    component: Introduction,
  },
  {
    path: '/quiz',
    name: 'quiz',
    component: Quiz,
  },
  {
    path: '/',
    name: 'welcome',
    component: WelcomePage,
  },
];
export const Routes = (
  <Switch>
    {publicRoutes.map((route) => (
      <PublicRoute
        key={route.name}
        exact={true}
        path={route.path}
        component={route.component}
      />
    ))}
    {privateRoutes.map((route) => (
      <PrivateRoute
        key={route.name}
        path={route.path}
        component={route.component}
      />
    ))}
  </Switch>
);
