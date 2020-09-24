import React from 'react';

import Timer from '../../../components/Timer';

import { Progress } from 'antd';
import 'antd/dist/antd.css';
const Header = ({ indexOfQuestion }) => {
  const timeStart = JSON.parse(localStorage.getItem('timeStart'));
  return (
    <nav>
      <div className='header'>
        <img className='header-logo' src='./transparance.png' alt='' />
        <div className='header-progress'>
          <p>{indexOfQuestion}/10</p>
          <Progress percent={indexOfQuestion * 10} showInfo={false} />
        </div>

        <div className='header-timer'>
          <i className='fa fa-stopwatch'></i>
          <Timer initialTime={timeStart} />
        </div>
      </div>
    </nav>
  );
};

export default Header;
