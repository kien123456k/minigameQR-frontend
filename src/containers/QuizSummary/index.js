import React from 'react';
import Header from '../../components/Header';
import './styles.scss';
import { timeConvert } from '../../components/Timer/convert-time';
const QuizSummary = () => {
  const data = JSON.parse(localStorage.getItem('data'));
  return (
    <div>
      <Header />
      <div className='summary-container'>
        <h2>Chúc mừng bạn đã hoàn thành bài Quiz.</h2>
        <ul>
          <li>Số câu làm đúng là {data.score}/10 câu</li>
          <li>Thời gian: {timeConvert(data.time)}</li>
          <li>Bạn đứng thứ {data.rank} trên 300 người tham gia minigame.</li>
        </ul>

        <a href='https://www.facebook.com/fcodefpt'>
          <i className='fab fa fa-facebook-square'></i>
        </a>
      </div>
    </div>
  );
};

export default QuizSummary;
