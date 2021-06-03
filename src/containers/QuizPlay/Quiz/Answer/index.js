import React from 'react';
import AnswerBox from '../../../../components/Answer-box';
const Answer = ({
  multipleChoice,
  indexOfQuestion,
  trans,
  setTrans,
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
            trans={trans}
            setTrans={setTrans}
          />
        );
      })}
    </div>
  );
};

export default React.memo(Answer);
