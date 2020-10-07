import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import InputField from '../../components/InputField';
import './styles.scss';
import logoMiniGame from '../../assets/images/logo.png';
import { get } from '../../utils/ApiCaller';
const WelcomePage = () => {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);
  const onSubmit = async (data) => {
    try {
      setIsSubmitted(true);
      setIsError(false);

      const response = await get(`/api/user/${data.studentID.toUpperCase()}`);
      if (response.data.success) {
        console.log(response.data.data);
        localStorage.setItem('data', JSON.stringify(response.data.data));

        // redirect to Introduction
        let path = '/quiz-summary';
        history.push(path);
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        setIsSubmitted(false);
      } else if (ex.response && ex.response.status === 400) {
        setIsSubmitted(false);
        setIsError(true);
      } else if (ex.response && ex.response.status === 500) {
        setIsSubmitted(false);
      }
    }
  };
  return (
    <div>
      <Header />
      <img className='logoMiniGame' src={logoMiniGame} alt='' />
      <form className='form-wrapper' onSubmit={handleSubmit(onSubmit)}>
        <p>Vui lòng nhập MSSV để tra cứu kết quả</p>
        <InputField
          register={register}
          icon={<i className='fa fas fa-user'></i>}
          name='studentID'
          type='text'
          label='MSSV'
          errors={errors}
          valid={register({
            required: `MSSV không được bỏ trống`,
            pattern: {
              value: /^[a-zA-Z]{2}[0-9]{6}$/i,
              message: 'MSSV không hợp lệ!',
            },
          })}
        />
        <span className='error' style={{ display: !isError && 'none' }}>
          MSSV không tồn tại.
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
