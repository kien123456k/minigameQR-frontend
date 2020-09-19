import React from 'react';
import Header from '../../components/Header';
import errorPic from '../../assets/images/error.jpg';
import './styles.scss';
const InvalidToken = () => {
  return (
    <div className='error-container'>
      <Header />
      <img className='error-pic' src={errorPic} alt='error' width={'30%'} />
      <h1 className='alert-text'>
        Mã QR không hợp lệ. Vui lòng đến quầy để nhận mã QR khác.
      </h1>
    </div>
  );
};

export default InvalidToken;
