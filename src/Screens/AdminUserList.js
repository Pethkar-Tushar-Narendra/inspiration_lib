import React, { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import LoadingBox from '../Components/LoadingBox';
import MessageBox from '../Components/MessageBox';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
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
  var users1 = new Array();
  const filterHandler = () => {
    users
      .filter((user, i) => {
        return i <= 1;
      })
      .forEach((user, i) => {
        users1.push(user);
      });
    console.log(users1);
  };

  return (
    <>
      <h1>Registered Users</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <span>
            <Button
              type="button"
              variant="danger"
              onClick={() => {
                var users1 = filterHandler();
                // users = users1;
              }}
            >
              filter
            </Button>
          </span>
          <table className="table">
            <thead>
              <tr>
                <th>id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>email</th>
                <th>study</th>
                <th>Subscription</th>
                <th>date of admission</th>
                <th>Edit</th>
                <th>delete</th>
              </tr>
            </thead>
            <tbody>
              {users
                // .filter((user, i) => {
                //   return i <= 2;
                // })
                .map((user, i) => (
                  <tr key={user._id}>
                    <td>{i + 1}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>
                      {user.study_field ? user.study_field.field : 'Others'}
                    </td>
                    {console.log(
                      new Date().getMonth() + 1,
                      user.createdAt.substring(5, 7)
                    )}
                    {new Date().getMonth() + 1 <=
                      user.createdAt.substring(5, 7) &&
                    user.createdAt.substring(8, 10) < new Date().getDate() ? (
                      <td>
                        <Button variant="success" disabled>
                          {user.createdAt.substring(0, 10)}
                        </Button>
                      </td>
                    ) : (
                      <td>
                        <Button variant="danger" disabled>
                          {user.createdAt.substring(0, 10)}
                        </Button>
                      </td>
                    )}
                    <td>{user.createdAt.substring(0, 10)}</td>
                    <td>
                      {' '}
                      <Button
                        type="button"
                        variant="warning"
                        onClick={() => {
                          navigate(`/edit_user/${user._id}`);
                        }}
                      >
                        edit
                      </Button>
                    </td>
                    <td>
                      {' '}
                      <Button type="button" variant="danger">
                        delete
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
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
