import React from 'react';
import { Button, Form } from 'react-bootstrap';

function ProfileScreen() {
  return (
    <div className="container small-container">
      <h1 className="my-3">User Profile</h1>
      <form>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" />
        </Form.Group>
        <div className="mb-3">
          <Button variant="outline-success" type="submit">
            Update
          </Button>
          {'    '}
          <Button variant="outline-danger">Cancel</Button>
        </div>
      </form>
    </div>
  );
}

export default ProfileScreen;
