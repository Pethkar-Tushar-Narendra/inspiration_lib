import React, { useContext, useReducer, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import LoadingBox from '../LoadingBox';
import MessageToggle from './MessageToggle';
import axios from 'axios';
import { Store } from '../../Store';

const LogInToggle = ({ modal, toggle, changeForm }) => {
  const { dispatch: ctxDispatch } = useContext(Store);
  const [message, setMessage] = useState('');
  const [messageTitle, setMessageTitle] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginModal, SetLoginModal] = useState(false);
  const [loading, SetLoading] = useState(false);
  const loginToggle = () => SetLoginModal(!loginModal);
  const submitHandler = async (e) => {
    e.preventDefault();
    SetLoading(true);
    try {
      const { data } = await axios.post('/api/login', {
        email,
        password,
      });
      SetLoading(false);
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('inspiration_userInfo', JSON.stringify(data));
      setMessage('Login Successfull press "Continue" To Explore');
      setMessageTitle('Successfull');
      loginToggle();
      toggle();
    } catch (err) {
      SetLoading(false);
      setMessage(
        err.response.data.message
          ? err.response.data.message
          : 'Something Went Wrong'
      );
      setMessageTitle('Error...');
    }
  };
  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>LogIn Form</ModalHeader>
        <ModalBody>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button color="primary" type="submit">
              LogIn
            </Button>{' '}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </Form>
        </ModalBody>
        <ModalFooter>
          <div>
            Don't Have an Account? <Button onClick={changeForm}>Sign In</Button>
          </div>
        </ModalFooter>
      </Modal>
      <MessageToggle
        modal={loginModal}
        toggle={loginToggle}
        messageTitle={messageTitle}
        message={message}
      />
      <LoadingBox modal={loading} />
    </div>
  );
};

export default LogInToggle;
