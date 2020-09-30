import React from 'react';
const AnswerBox = ({
  answer,
  setArrOfAnswer,
  arrOfAnswer,
  index,
  indexOfQuestion,
}) => {
  const handleClick = () => {
    let arr = arrOfAnswer;
    if (arr[indexOfQuestion - 1] !== index + 1) {
      arr[indexOfQuestion - 1] = index + 1;
      setArrOfAnswer([...arr]);
    }
  };

  return (
    <div
      className={
        arrOfAnswer[indexOfQuestion - 1] === index + 1
          ? 'choosing-container container'
          : 'container'
      }
      onClick={handleClick}
    >
      {answer}
    </div>
  );
};

export default AnswerBox;
