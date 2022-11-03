import axios from 'axios';
import React, { useEffect, useReducer, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import LoadingBox from '../LoadingBox';
import MessageToggle from './MessageToggle';
const reducer = (state, action) => {
  switch (action.type) {
    case 'Request_fetch':
      return { ...state, loading: false };
    case 'Fetch_fail': {
      return { ...state, loading: false, error: action.payload };
    }
    case 'Fetch_success': {
      return { ...state, loading: false, fields: action.payload };
    }
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false };

    default:
      return state;
  }
};
const RegisterToggle = ({ modal, toggle, changeForm }) => {
  const [{ loading, error, fields, loadingUpdate }, dispatch] = useReducer(
    reducer,
    {
      loading: true,
      loadingUpdate: false,
      error: '',
      fields: [],
    }
  );

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'Request_fetch' });
      try {
        const { data } = await axios.get('/api/fields');
        dispatch({ type: 'Fetch_success', payload: data });
      } catch (err) {
        dispatch({ type: 'Fetch_fail', payload: err.response.data.message });
      }
    };
    fetchData();
  }, []);

  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mobNo, setMobNo] = useState(0);
  const [study_field, setStudy_field] = useState(null);

  const [modal1, setModal1] = useState(false);
  const [message, setMessage] = useState('');
  const [messageTitle, setMessageTitle] = useState('');
  const toggle1 = () => setModal1(!modal1);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessageTitle('Error In Regiastration Form.');
      setMessage('Password Cannot Match Please Fill Again...');
      toggle1();
      return;
    }
    dispatch({ type: 'UPDATE_REQUEST' });
    try {
      await axios.post('/api/new_registeration', {
        firstName,
        lastName,
        email,
        mobNo,
        study_field,
        password,
      });
      dispatch({ type: 'UPDATE_SUCCESS' });
      setMessageTitle('Successfull');
      setMessage(
        'Congartulations Your Details Stored. Now you can LogIn and explore the website. Thank you...'
      );
      toggle1();
      toggle();
    } catch (err) {
      dispatch({ type: 'UPDATE_FAIL' });
      setMessageTitle('Failuer');
      setMessage(
        err.response.data.message ? err.response.data.message : err.message
      );
      toggle1();
    }
  };

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Registeration Form</ModalHeader>
        <ModalBody>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="mobNo">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => setMobNo(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="study_field">
              <Form.Label>Study Field</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => setStudy_field(e.target.value)}
              >
                <option>Select Field</option>
                {fields.map((field) => (
                  <option key={field._id} value={field._id}>
                    {field.field}
                  </option>
                ))}
              </Form.Select>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </Form.Group>
            </Form.Group>
            <Button color="primary" type="submit">
              Register
            </Button>{' '}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </Form>
        </ModalBody>
        <ModalFooter>
          {' '}
          <div>
            Already Have Account? <Button onClick={changeForm}>LogIn</Button>
          </div>
        </ModalFooter>
      </Modal>
      <MessageToggle
        messageTitle={messageTitle}
        message={message}
        toggle={toggle1}
        modal={modal1}
      />
      <LoadingBox modal={loadingUpdate} />;
    </div>
  );
};

export default RegisterToggle;
