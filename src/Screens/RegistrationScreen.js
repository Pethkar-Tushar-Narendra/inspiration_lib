import axios from 'axios';
import React, { useEffect, useReducer, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';

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
    default:
      return state;
  }
};

function RegistrationScreen() {
  const [{ loading, error, fields }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    fields: [],
  });

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
  const [mobNo, setMobNo] = useState(0);
  const [study_field, setStudy_field] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/new_registeration', {
        firstName,
        lastName,
        email,
        mobNo,
        study_field,
      });
    } catch (err) {}
  };

  return (
    <Container className="small-container">
      <h1 className="my-3">Register</h1>
      <Form>
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
        </Form.Group>
        <div className="mb-3">
          <Button type="submit" onClick={submitHandler}>
            Register
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default RegistrationScreen;
