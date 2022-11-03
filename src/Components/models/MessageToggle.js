import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const MessageToggle = ({ modal, toggle, messageTitle, message }) => {
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>{messageTitle}</ModalHeader>
      <ModalBody>{message}</ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={toggle}>
          Continue
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default MessageToggle;
