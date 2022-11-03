import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
} from 'reactstrap';
import MessageToggle from '../Components/models/MessageToggle';
import RegisterToggle from '../Components/models/RegisterToggle';

function HomeScreen() {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  return (
    <div>
      <Button color="danger" onClick={toggle}>
        Click Me
      </Button>
      <MessageToggle modal={modal} toggle={toggle} />
    </div>
  );
}

export default HomeScreen;
