import React, { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import LoadingBox from '../Components/LoadingBox';
import MessageBox from '../Components/MessageBox';
import { Button, Form } from 'react-bootstrap';
import { Col, Input, Row } from 'reactstrap';
import UserEditToggle from '../Components/models/UserEditToggle';

function AdminUserList() {
  const [user, setUser] = useState([]);
  const [users, setUsers] = useState([]);
  const [users1, setUsers1] = useState([]);
  const [message, setMessage] = useState('');
  const [messageTitle, setMessageTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('/api/registered_users');
        const { registered_users } = data;
        setUsers(registered_users);
        setUsers1(registered_users);
        setLoading(false);
      } catch (err) {
        setMessageTitle('Error...');
        setMessage(err.response ? err.response.data.message : err.message);
        setError(true);
      }
    };
    fetchData();
  }, []);
  const [modal, setModal] = useState(false);
  const [query, setQuery] = useState('');
  const toggle = () => setModal(!modal);
  var array = [];
  var array1 = [];
  const submitHandler = (e) => {
    e.preventDefault();
    if (query.length < 1) {
      setUsers(users1);
    } else {
      for (var i = 0; i < users.length; i++) {
        if (
          query.trim().length > users[i].lastName.length &&
          query.trim().length > users[i].firstName.length
        ) {
          array1 = query.trim().toUpperCase().split(' ');
          if (
            users[i].firstName.toUpperCase() === array1[0] &&
            users[i].lastName.toUpperCase() === array1[1]
          ) {
            array.push(users[i]);
          }
        } else if (
          query.trim().length <= users[i].lastName.length ||
          query.trim().length <= users[i].firstName.length
        ) {
          for (
            var j = 0;
            j <= users[i].firstName.length - query.trim().length;
            j++
          ) {
            if (
              users[i].firstName
                .substr(j, query.trim().length)
                .toUpperCase() === query.trim().toUpperCase() ||
              users[i].lastName.substr(j, query.trim().length).toUpperCase() ===
                query.trim().toUpperCase()
            ) {
              array.push(users[i]);
            }
          }
        } else if (
          query.trim().length === users[i].lastName.length ||
          query.trim().length === users[i].firstName.length
        ) {
          if (
            users[i].lastName.toUpperCase() === query.trim().toUpperCase() ||
            users[i].firstName.toUpperCase() === query.trim().toUpperCase()
          ) {
            array.push(users[i]);
          }
        }
        setUsers(array);
        setQuery('');
      }
    }
  };
  return (
    <>
      {error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <Row>
            <Col>
              <h1>Registered Users</h1>
            </Col>
            <Col className="text-end">
              <Button className="me-2" variant="success">
                filter
              </Button>
            </Col>
            <Col className="text-end">
              <Form className="d-flex" onSubmit={submitHandler}>
                <Form.Control
                  type="search"
                  value={query}
                  placeholder="Name"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => setQuery(e.target.value)}
                  required
                />
                <Button className="me-2" variant="success" type="submit">
                  Search
                </Button>
              </Form>
            </Col>
          </Row>
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
                  new Date().getDate() <= user.createdAt.substring(8, 10) ? (
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
