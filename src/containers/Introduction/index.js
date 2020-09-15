import Axios from 'axios';
import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import { API_ROOT_URL } from '../../configurations';

const Introduction = () => {
  const history = useHistory();
  const handleClick = async () => {
    const token = JSON.parse(localStorage.getItem('token'));
    const name = localStorage.getItem('name');
    const studentID = localStorage.getItem('studentID');
    try {
      const response = await Axios({
        method: 'GET',
        url: `${API_ROOT_URL}/user/start`,
        params: {
          token: token,
          studentID: studentID,
          name: name,
        },
      });
      if (response.data.success) {
        // redirect to Quiz page
        localStorage.setItem(
          'questions',
          JSON.stringify(response.data.data.questions)
        );
        let path = `/quiz`;
        history.push(path);
      }
    } catch (err) {
      console.log(err);
      let path = `/error`;
      history.push(path);
    }
  };
  return (
    <div>
      <Header />
      <button onClick={handleClick}>Start</button>
    </div>
  );
};

export default Introduction;
