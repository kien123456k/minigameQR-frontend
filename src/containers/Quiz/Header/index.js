import React from 'react';
import Timer from 'react.timer';
import { Progress } from 'antd';
import 'antd/dist/antd.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
const Header = ({ indexOfQuestion }) => {
  return (
    <nav>
      <div className='header'>
        <img className='header-logo' src='./transparance.png' alt='' />
        <div className='header-progress'>
          <p>{indexOfQuestion}/10</p>
          <Progress percent={indexOfQuestion * 10} showInfo={false} />
        </div>
        <div className='header-timer'>
          <FontAwesomeIcon icon={faClock} />
          <Timer />
        </div>
      </div>
    </nav>
  );
};

export default Header;
