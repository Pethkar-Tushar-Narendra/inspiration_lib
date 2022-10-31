import React, { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import LoadingBox from '../Components/LoadingBox';
import MessageBox from '../Components/MessageBox';
import { Button } from 'react-bootstrap';

const reducer = (state, action) => {
  switch (action.type) {
    case 'Request_fetch':
      return { ...state, loading: false };
    case 'Fetch_fail': {
      return { ...state, loading: false, error: action.payload };
    }
    case 'Fetch_success': {
      const { registered_users } = action.payload;
      return { ...state, loading: false, users: registered_users };
    }
    default:
      return state;
  }
};

function AdminUserList() {
  const [{ loading, error, users }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    users: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'Request_fetch' });
      try {
        const { data } = await axios.get('/api/registered_users');
        dispatch({ type: 'Fetch_success', payload: data });
      } catch (err) {
        dispatch({ type: 'Fetch_fail', payload: err.response.data.message });
      }
    };
    fetchData();
  }, []);

  var date = new Date();
  var CurrentDate = date.getMonth();
  var dt = date.toDateString();

  const [selectedDate, setSelectedDate] = useState(null);
  return (
    <>
      <h1>AdminUserList AdminUserList{' ' + CurrentDate + 1 + ' ' + dt}</h1>
      <h1>Registered Users</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <th>id</th>
            <th>name</th>
            <th>email</th>
            <th>study</th>
            <th>Subscription</th>
            <th>year</th>
            <th>month</th>
            <th>day</th>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.study_field}</td>

                {new Date().getMonth() + 1 <= user.createdAt.substring(5, 7) &&
                user.createdAt.substring(8, 10) < new Date().getDate() ? (
                  <td>
                    <Button variant="danger">Sub Ended</Button>
                  </td>
                ) : (
                  <td>
                    <Button variant="success">Sub not Ended</Button>
                  </td>
                )}
                <td>{user.createdAt.substring(0, 4)}</td>
                <td>{user.createdAt.substring(5, 7)}</td>
                <td>{user.createdAt.substring(8, 10)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          minDate={new Date()}
          filterDate={(date) => date.getDay() !== 6 && date.getDay() !== 0}
          placeholderText="date"
          // showYearDropdown
          // scrollableMonthYearDropdown
        />
      </div>
    </>
  );
}

export default AdminUserList;
