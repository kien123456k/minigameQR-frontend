import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = (props) => {
  const studentID = localStorage.getItem('studentID');
  if (studentID === null) {
    // TODO should check authorization here
    return <Route {...props} />;
  }
  return <Redirect to='/quiz-instruction' />;
};
