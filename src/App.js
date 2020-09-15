import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from './routes';
const App = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const token = urlParams.get('token');
  if (token !== null) {
    localStorage.setItem('token', token);
  }

  return <BrowserRouter> {Routes} </BrowserRouter>;
};
export default App;