import React from 'react';
import './styles.scss';
const Question = ({ content }) => {
  return (
    <div className='question-box'>
      <div className='question-content'>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default Question;
