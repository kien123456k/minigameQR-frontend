import { green } from '@material-ui/core/colors';
import Axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import { API_ROOT_URL } from '../../configurations';

const QuizInstruction = () => {
  const history = useHistory();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleClick = async () => {
    const token = JSON.parse(localStorage.getItem('token'));
    const name = JSON.parse(localStorage.getItem('name'));
    const studentID = JSON.parse(localStorage.getItem('studentID'));
    try {
      setIsSubmitted(true);
      const response = await Axios({
        method: 'GET',
        url: `${API_ROOT_URL}/user/start`,
        params: {
          token: token,
          studentID: studentID,
          name: name,
        },
      });
      if (response.data.success) {
        // redirect to Quiz page
        localStorage.setItem(
          'questions',
          JSON.stringify(response.data.data.questions)
        );
        localStorage.setItem(
          'timeStart',
          JSON.stringify(response.data.data.timeStart)
        );
        let path = `/quiz`;
        history.push(path);
      }
    } catch (err) {
      setIsSubmitted(false);
      if (err.response.status === 403) {
        let path = '/quiz-summary';
        history.push(path);
      } else if (err.response.status === 400) {
        localStorage.removeItem('token');
        localStorage.removeItem('studentID');
        localStorage.removeItem('name');
        localStorage.removeItem('answer');
        localStorage.removeItem('question');
        let path = '/invalid-token';
        history.push(path);
      }
    }
  };
  return (
    <div>
      <Header />
      <div className='instructions'>
        <h1>Cách chơi</h1>
        <h3>Đọc kỹ hướng dẫn trước khi bước vào thử thách nhé! </h3>
        <ul className='browser-default' id='main-list'>
          <li>
            Các bạn phải hoàn thành 10 câu hỏi được sắp xếp theo thứ tự từ dễ
            đến khó.
          </li>
          <li>
            Mỗi câu hỏi có 4 đáp án lựa chọn, bạn có thể thay đổi đáp án bằng
            cách quay trở lại câu hỏi trước.
          </li>
          <li>Thời gian làm bài sẽ được tính khi bạn ấn vào ô Bắt đầu.</li>
          <li>Mỗi bạn chỉ được làm 1 bài Quiz duy nhất.</li>
          <li>Ấn vào nút Submit để nộp bài hoàn thành bài quiz.</li>
        </ul>
        <div>
          <button
            className='start-button'
            onClick={handleClick}
            disabled={isSubmitted}
          >
            <i
              className='fa fa-refresh fa-spin'
              style={{ display: !isSubmitted && 'none', color: green }}
            ></i>{' '}
            Bắt đầu
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizInstruction;
