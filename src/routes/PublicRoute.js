import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = (props) => {
  const studentID = localStorage.getItem('studentID');
  console.log(studentID);
  if (studentID === null) {
    // TODO should check authorization here
    return <Route {...props} />;
  }
  return <Redirect to='/introduction' />;
};
