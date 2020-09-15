import React, { Fragment, useEffect, useState } from 'react';
import { API_ROOT_URL } from '../../configurations';
import InvalidToken from '../InvalidToken';
import Axios from 'axios';

const TokenCheck = (props) => {
  const [isValid, setIsValid] = useState(false);
  console.log('tokencheck');
  const tokenCheck = async () => {
    const token = JSON.parse(localStorage.getItem('token'));
    try {
      const response = await Axios({
        method: 'GET',
        url: `${API_ROOT_URL}/check/${token}`,
      });

      if (response.data.success) {
        setIsValid(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    tokenCheck();
  }, []);
  return (
    <Fragment>
      {console.log(isValid)}
      {isValid ? props.component : <InvalidToken />}
    </Fragment>
  );
};

export default TokenCheck;
