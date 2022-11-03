import React, { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import LoadingBox from '../Components/LoadingBox';
import MessageBox from '../Components/MessageBox';
import { Button } from 'react-bootstrap';
import { Col, Row } from 'reactstrap';
import UserEditToggle from '../Components/models/UserEditToggle';

const reducer = (state, action) => {
  switch (action.type) {
    case 'Request_fetch':
      return { ...state, loading: true };
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
  const [user, setUser] = useState([]);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  return (
    <>
      <Row>
        <Col>
          <h1>Registered Users</h1>
        </Col>
        <Col className="text-end">
          <Button className="me-3" variant="success">
            Filter
          </Button>
        </Col>
      </Row>
      {error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <LoadingBox modal={loading}></LoadingBox>
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
              {users.map((user, i) => (
                <tr key={user._id}>
                  <td>{i + 1}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.study_field ? user.study_field.field : 'Others'}
                  </td>

                  {new Date().getMonth() + 1 <=
                    user.createdAt.substring(5, 7) &&
                  user.createdAt.substring(8, 10) <= new Date().getDate() ? (
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
                        setUser(user);
                        toggle();
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
        <UserEditToggle modal={modal} toggle={toggle} user={user} />
      </div>
    </>
  );
}

export default AdminUserList;
