import React from 'react';
import AnswerBox from '../../../components/Answer-box';

const Answer = ({
  multipleChoice,
  indexOfQuestion,
  arrOfAnswer,
  setArrOfAnswer,
}) => {
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
