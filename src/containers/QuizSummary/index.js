import React from 'react';
import Header from '../../components/Header';
import './styles.scss';
const QuizSummary = () => {
  return (
    <div>
      <Header />
      <div className='summary-container'>
        <h1>Chúc mừng bạn đã hoàn thành bài Quiz.</h1>
        <h3>Vui lòng theo dõi Fanpage F-Code để đón nhận kết quả nhé!!</h3>
      </div>
    </div>
  );
};

export default QuizSummary;
