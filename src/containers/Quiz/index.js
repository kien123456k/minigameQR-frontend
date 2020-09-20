import React, { useState } from 'react';
import Axios from 'axios';
import { API_ROOT_URL } from '../../configurations';
import Question from './Question';
import Answer from './Answer';
import './styles.scss';
import Header from './Header';
const Quiz = () => {
  const data = JSON.parse(localStorage.getItem('questions'));
  const token = JSON.parse(localStorage.getItem('token'));
  const name = localStorage.getItem('name');
  const studentID = localStorage.getItem('studentID');
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
      console.log(response);
    } catch (error) {
      console.log(error);
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
