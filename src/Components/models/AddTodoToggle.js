import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';

const AddTodoToggle = ({ modal, toggle, save }) => {
  const [taskName, setTaskName] = useState('');
  const [disc, setDisc] = useState('');
  let taskObj = {};
  const submitHandler = (e) => {
    e.preventDefault();
    taskObj = {};
    taskObj['TaskName'] = taskName;
    taskObj['Discription'] = disc;
    save(taskObj);
    toggle();
  };
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Add Your ToDo</ModalHeader>
      <ModalBody>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Task Title</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setTaskName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Discription</Form.Label>
            <Form.Control
              as="textarea"
              rows="6"
              aria-label="With textarea"
              onChange={(e) => setDisc(e.target.value)}
              required
            />
          </Form.Group>
          <Button color="primary" type="submit">
            Save
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </Form>
      </ModalBody>
      <ModalFooter>
        <div></div>
      </ModalFooter>
    </Modal>
  );
};

export default AddTodoToggle;
