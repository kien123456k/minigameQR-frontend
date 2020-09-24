import React, { useState, useEffect } from 'react';
import AnswerBox from '../../../components/Answer-box';

const Answer = ({ multipleChoice, indexOfQuestion }) => {
  const [arrOfAnswer, setArrOfAnswer] = useState(
    JSON.parse(localStorage.getItem('answer')) || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  );
  useEffect(() => {
    localStorage.setItem('answer', JSON.stringify(arrOfAnswer));
  }, [arrOfAnswer]);
  return (
    <div className='answer-container'>
      {multipleChoice.map((ele, index) => {
        return (
          <AnswerBox
            key={index}
            answer={ele}
            arrOfAnswer={arrOfAnswer}
            setArrOfAnswer={setArrOfAnswer}
            index={index}
            indexOfQuestion={indexOfQuestion}
          />
        );
      })}
    </div>
  );
};

export default Answer;
