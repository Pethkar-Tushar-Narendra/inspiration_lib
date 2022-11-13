import React from 'react';
import { Form } from 'react-bootstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ProfileUpdateToggle = ({ modal, toggle, messageTitle, message }) => {
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Profile Edit</ModalHeader>
      <ModalBody>
        <Form>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="email" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="password" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="email" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control type="password" required />
          </Form.Group>
          <Button color="primary" type="submit">
            Update
          </Button>{' '}
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ProfileUpdateToggle;
