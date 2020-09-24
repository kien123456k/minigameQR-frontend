import React from 'react';
import { useState, useEffect } from 'react';
import { timeConvert } from './convert-time';

const Timer = ({ initialTime }) => {
  const startTime = initialTime;
  const [time, setTime] = useState(0);

  useEffect(() => {
    let timer = setInterval(() => {
      setTime(Date.now() - startTime);
    }, 1000);
    return () => clearInterval(timer);
  });
  return <span>{timeConvert(time)}</span>;
};

export default Timer;
