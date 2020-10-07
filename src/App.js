import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from './routes';
import QuizResult from './containers/Result';
import WelcomePage from './containers/WelcomePage';
const App = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const token = urlParams.get('token');
  if (token !== null) {
    localStorage.setItem('token', JSON.stringify(token));
  }
  // return <QuizResult />;
  return <BrowserRouter>{Routes}</BrowserRouter>;
};
export default App;
