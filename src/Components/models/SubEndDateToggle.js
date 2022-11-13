import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const SubEndDateToggle = ({ modal, toggle, messageTitle, message }) => {
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Subscription End Date</ModalHeader>
      <ModalBody>{message}</ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={toggle}>
          Continue
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default SubEndDateToggle;
