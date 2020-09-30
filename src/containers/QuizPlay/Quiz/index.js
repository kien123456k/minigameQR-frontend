import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { API_ROOT_URL } from '../../../configurations';
import Question from './Question';
import 'antd/dist/antd.css';
import Answer from './Answer';
import './styles.scss';
import { Tabs, Progress } from 'antd';
import { useHistory } from 'react-router-dom';
const { TabPane } = Tabs;

const Quiz = () => {
  const data = JSON.parse(localStorage.getItem('questions'));
  const token = JSON.parse(localStorage.getItem('token'));
  const name = JSON.parse(localStorage.getItem('name'));
  const studentID = JSON.parse(localStorage.getItem('studentID'));
  const history = useHistory();
  const [indexOfQuestion, setIndexOfQuestion] = useState(1);
  const [arrOfAnswer, setArrOfAnswer] = useState(
    JSON.parse(localStorage.getItem('answer')) || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  );

  useEffect(() => {
    localStorage.setItem('answer', JSON.stringify(arrOfAnswer));
  }, [arrOfAnswer]);
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
    const arrOfAnswer = JSON.parse(localStorage.getItem('answer'));
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
        localStorage.clear();
        let path = '/quiz-summary';
        history.push(path);
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 403) {
        let path = '/quiz-summary';
        history.push(path);
      } else if (ex.response && ex.response.status === 400) {
        localStorage.clear();

        let path = '/invalid-token';
        history.push(path);
      }
    }
  };
  return (
    <div className='quiz-container'>
      <div className='header-progress'>
        <p>{indexOfQuestion}/10</p>
        <Progress percent={indexOfQuestion * 10} showInfo={false} />
      </div>
      <Tabs
        className='tab-question'
        activeKey={String(indexOfQuestion - 1)}
        onChange={(e) => setIndexOfQuestion(parseInt(e) + 1)}
        tabPosition={'top'}
        style={{ width: '100%' }}
      >
        {data.map((e, i) => (
          <TabPane tab={`Câu ${i + 1}`} key={i}>
            <Question content={e.question} />
            <div className='quiz-answer'>
              <Answer
                indexOfQuestion={i + 1}
                multipleChoice={e.multipleChoice}
                nextQuestion={nextQuestion}
                arrOfAnswer={arrOfAnswer}
                setArrOfAnswer={setArrOfAnswer}
              />
            </div>
          </TabPane>
        ))}
      </Tabs>

      <div className='navigation'>
        {indexOfQuestion > 1 && (
          <button className='btn btn-prev' onClick={() => preQuestion()}>
            <i className='fa fa-arrow-left fa-lg'></i>
          </button>
        )}
        {indexOfQuestion < 10 && (
          <button className='btn btn-next' onClick={() => nextQuestion()}>
            <i className='fa fa-arrow-right fa-lg'></i>
          </button>
        )}
      </div>
      <button className='btn-submit' onClick={handleOpenDialog}>
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
