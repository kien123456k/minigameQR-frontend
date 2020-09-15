import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import InputField from '../../components/InputField';
import './styles.scss';
import Axios from 'axios';
import { API_ROOT_URL } from '../../configurations';
import logoMiniGame from '../../assets/images/logo.png';

const WelcomePage = () => {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();
  const onSubmit = async (data) => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));
      const response = await Axios({
        method: 'POST',
        url: `${API_ROOT_URL}/user/register`,
        data: {
          token: token,
          name: data.name,
          studentID: data.studentID,
        },
      });

      if (response.data.success) {
        localStorage.setItem('name', data.name);
        localStorage.setItem('studentID', data.studentID);
        // redirect to Introduction
        let path = '/introduction';
        history.push(path);
      }
    } catch (error) {
      console.log(error.data);
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
        <input type='submit' className='login-button' value='Submit' />
      </form>
    </div>
  );
};

export default WelcomePage;
