import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component, ...rest }) => {
  const studentID = localStorage.getItem('studentID');
  if (studentID !== null) {
    // TODO should check authorization here

    return <Route {...rest} component={component} />;
  }

  // We need to keep the path for first page load
  // tokenStorageService.set(pathNameKey.FIRST_LOAD, location.pathname);
  return <Redirect to='/welcome' />;
};
