import React, { useState } from 'react';
import Axios from 'axios';
import { API_ROOT_URL } from '../../configurations';
import Question from './Question';
import Answer from './Answer';
import './styles.scss';
import Header from './Header';
import { useHistory } from 'react-router-dom';
const Quiz = () => {
  const data = JSON.parse(localStorage.getItem('questions'));
  const token = JSON.parse(localStorage.getItem('token'));
  const name = JSON.parse(localStorage.getItem('name'));
  const studentID = JSON.parse(localStorage.getItem('studentID'));
  const history = useHistory();
  const [indexOfQuestion, setIndexOfQuestion] = useState(1);
  const [arrOfAnswer, setArrOfAnswer] = useState([
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const preQuestion = () => {
    if (indexOfQuestion > 1) setIndexOfQuestion(indexOfQuestion - 1);
  };
  const nextQuestion = () => {
    if (indexOfQuestion < 10) setIndexOfQuestion(indexOfQuestion + 1);
  };
  const handleOpenDialog = () => {
    setIsOpen(true);
  };
  const handleCloseDialog = () => {
    setIsOpen(false);
  };
  const handleSubmit = async () => {
    setIsOpen(false);
    try {
      const response = await Axios({
        method: 'POST',
        url: `${API_ROOT_URL}/user/end`,
        data: {
          token: token,
          name: name,
          studentID: studentID,
          answer: arrOfAnswer,
        },
      });
      if (response.data.success) {
        let path = '/quiz-summary';
        history.push(path);
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 403) {
        let path = '/quiz-summary';
        history.push(path);
      } else if (ex.response && ex.response.status === 400) {
        localStorage.removeItem('token');
        localStorage.removeItem('studentID');
        localStorage.removeItem('name');
        let path = '/invalid-token';
        history.push(path);
      }
    }
  };
  return (
    <div>
      <Header indexOfQuestion={indexOfQuestion} />
      <Question content={data[indexOfQuestion - 1].question} />
      <Answer
        indexOfQuestion={indexOfQuestion}
        multipleChoice={data[indexOfQuestion - 1].multipleChoice}
        arrOfAnswer={arrOfAnswer}
        setArrOfAnswer={setArrOfAnswer}
        nextQuestion={nextQuestion}
      />
      <div className='navigation'>
        {indexOfQuestion > 1 && (
          <button className='btn btn-prev' onClick={() => preQuestion()}>
            <i className='fa fa-arrow-left'></i>
          </button>
        )}
        {indexOfQuestion < 10 && (
          <button className='btn btn-next' onClick={() => nextQuestion()}>
            <i className='fa fa-arrow-right'></i>
          </button>
        )}
      </div>
      <button className='btn btn-submit' onClick={handleOpenDialog}>
        Submit
      </button>
      <div
        className={isOpen ? 'dialog-container' : 'dialog-container-none'}
        onClick={handleCloseDialog}
      >
        <div className='dialog'>
          <div className='dialog-title'>Bạn đã chắc chắn nộp bài?</div>
          <div className='dialog-action'>
            <button className='btn btn-dialog' onClick={handleCloseDialog}>
              Không
            </button>
            <button className='btn btn-dialog' onClick={handleSubmit}>
              Có
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
