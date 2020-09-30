import React from 'react';
import Header from '../../components/Header';
import './styles.scss';
const QuizSummary = () => {
  return (
    <div>
      <Header />
      <div className='summary-container'>
        <h2>Chúc mừng bạn đã hoàn thành bài Quiz.</h2>
        <ul>
          <li>Vui lòng theo dõi page F-Code để đón nhận kết quả nhé!!</li>
          <li>Hẹn gặp lại các bạn vào lúc 14h chiều nay nha!!</li>
        </ul>

        <a href='https://www.facebook.com/fcodefpt'>
          <i className='fab fa fa-facebook-square'></i>
        </a>
      </div>
    </div>
  );
};

export default QuizSummary;
