import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import DatePicker from 'react-datepicker';
import LoadingBox from '../LoadingBox';
import MessageToggle from './MessageToggle';
import { Store } from '../../Store';
import 'react-datepicker/dist/react-datepicker.css';

const UserEditToggle = ({ modal, toggle, id, user }) => {
  const { state } = useContext(Store);
  const { inspiration_userInfo } = state;
  const [admission_date, setAdmission_date] = useState(null);
  const [subscription_end_date, setSubscription_end_date] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [messageTitle, setmessageTitle] = useState('');

  const mesToggle = () => setError(!error);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(
        `/api/user/${user._id}`,
        { _id: user._Id, subscription_end_date, admission_date },
        {
          headers: { Authorization: `Bearer ${inspiration_userInfo.token}` },
        }
      );
      setLoading(false);
      setMessage('User Is Edited Successfully...');
      setmessageTitle('Successfull');
      toggle();
    } catch (err) {
      setMessage(err.response.data.message || err.message);
      setmessageTitle('Error...');
      setLoading(false);
      mesToggle();
    }
  };
  return (
    <>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          Edit form is of {user.firstName} {user.lastName}
        </ModalHeader>
        <ModalBody>
          <Form.Group className="mb-3" controlId="subDate">
            <Form.Label>Subscription Date</Form.Label>
            <DatePicker
              selected={subscription_end_date}
              onChange={(date) => setSubscription_end_date(date)}
              minDate={new Date()}
              filterDate={(date) => date.getDay() !== 6 && date.getDay() !== 0}
              placeholderText="Subscription Date"
              // showYearDropdown
              // scrollableMonthYearDropdown
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="admitDate">
            <Form.Label>Admission Date</Form.Label>
            <DatePicker
              selected={admission_date}
              onChange={(date) => setAdmission_date(date)}
              minDate={new Date()}
              filterDate={(date) => date.getDay() !== 6 && date.getDay() !== 0}
              placeholderText="Admission Date"
              // showYearDropdown
              // scrollableMonthYearDropdown
            />
          </Form.Group>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control value={user.firstName} disabled />
            </Form.Group>
            <Form.Group className="mb-3" controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control value={user.lastName} disabled />
            </Form.Group>
            <Form.Group className="mb-3" controlId="mobNo">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control value={user.mobNo} disabled />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control value={user.email} disabled />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control value={user.study_field?.field} disabled />
            </Form.Group>
            <Button color="primary" type="submit">
              Update
            </Button>{' '}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </Form>
        </ModalBody>
      </Modal>
      <LoadingBox modal={loading} />
      <MessageToggle
        message={message}
        messageTitle={messageTitle}
        modal={error}
        toggle={mesToggle}
      />
    </>
  );
};

export default UserEditToggle;
