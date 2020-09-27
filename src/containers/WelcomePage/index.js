import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import InputField from '../../components/InputField';
import './styles.scss';
import logoMiniGame from '../../assets/images/logo.png';
import { post } from '../../utils/ApiCaller';

const WelcomePage = () => {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);
  const onSubmit = async (data) => {
    try {
      setIsSubmitted(true);
      setIsError(false);
      const token = JSON.parse(localStorage.getItem('token'));
      const response = await post('/user/register', {
        token: token,
        name: data.name,
        studentID: data.studentID.toUpperCase(),
      });
      if (response.data.success) {
        localStorage.setItem('name', JSON.stringify(data.name));
        localStorage.setItem(
          'studentID',
          JSON.stringify(data.studentID.toUpperCase())
        );
        // redirect to Introduction
        let path = '/quiz-instruction';
        history.push(path);
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 403) {
        setIsSubmitted(false);
        setIsError(true);
      } else if (ex.response && ex.response.status === 400) {
        localStorage.clear();
        let path = '/invalid-token';
        history.push(path);
      }
    }
  };
  return (
    <div>
      <Header />
      <img className='logoMiniGame' src={logoMiniGame} alt='' />
      <form className='form-wrapper' onSubmit={handleSubmit(onSubmit)}>
        <InputField
          register={register}
          icon={<i className='fa fas fa-user'></i>}
          name='name'
          type='text'
          label='Họ và tên'
          errors={errors}
          valid={register({
            required: `Họ và tên không được bỏ trống`,
          })}
        />
        <InputField
          register={register}
          icon={<i className='fa fas fa-user'></i>}
          name='studentID'
          type='text'
          label='MSSV'
          errors={errors}
          valid={register({
            required: `MSSV không được bỏ trống`,
          })}
        />
        <span className='error' style={{ display: !isError && 'none' }}>
          MSSV này đã được sử dụng để đăng kí với mã QR khác.
        </span>
        <button className='login-button' disabled={isSubmitted}>
          <i
            className='fa fa-refresh fa-spin'
            style={{ display: !isSubmitted && 'none' }}
          ></i>{' '}
          Submit
        </button>
      </form>
    </div>
  );
};

export default WelcomePage;
