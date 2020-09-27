import React from 'react';
import Header from '../../components/Header';
import './styles.scss';
const QuizSummary = () => {
  return (
    <div>
      <Header />
      <div className='summary-container'>
        <h2>Chúc mừng bạn đã hoàn thành bài Quiz.</h2>
        <h4>Vui lòng theo dõi Fanpage F-Code để đón nhận kết quả nhé!!</h4>
        <h4>Hẹn gặp lại các bạn vào lúc 14h chiều nay nha!!</h4>
      </div>
    </div>
  );
};

export default QuizSummary;
