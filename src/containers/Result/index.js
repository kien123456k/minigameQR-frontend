import React from 'react';
import data from '../../data.json';
import { timeConvert } from '../../components/Timer/convert-time';
function titleCase(str) {
  var splitStr = str.toLowerCase().split(' ');

  for (var i = 0; i < splitStr.length; i++) {
    if (splitStr.length[i] < splitStr.length) {
      splitStr[i].charAt(0).toUpperCase();
    }

    str = splitStr.join(' ');
  }

  return str;
}
const QuizResult = () => {
  let num = 1;
  return (
    <table style={{ width: '100%' }}>
      <tbody>
        <tr>
          <th>STT</th>
          <th>Ten</th>
          <th>MSSV</th>
          <th>Diem</th>
          <th>Thoi gian</th>
        </tr>
        {data.data.user.map((e, i) => {
          if (e.name !== '') {
            return (
              <tr key={i}>
                <td>{num++}</td>
                <td>
                  {e.name.replace(/(^\w{1})|(\s+\w{1})/g, (match) =>
                    match.toUpperCase()
                  )}
                </td>
                <td>{e.studentID}</td>
                <td>{e.score}</td>
                <td>{timeConvert(e.time)}</td>
              </tr>
            );
          }
        })}
      </tbody>
    </table>
  );
};

export default QuizResult;
