import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
} from 'reactstrap';

export default function LoadingBox({ modal }) {
  return (
    <Modal isOpen={modal}>
      <ModalBody>
        <Spinner color="danger">Loading...</Spinner>
        <Spinner color="warning">Loading...</Spinner>
        <Spinner color="success">Loading...</Spinner>
        <Spinner color="primary">Loading...</Spinner>
        <Spinner color="secondary">Loading...</Spinner>
        <Spinner color="primary" type="grow">
          Loading...
        </Spinner>
        <Spinner color="success" type="grow">
          Loading...
        </Spinner>
        <Spinner color="danger" type="grow">
          Loading...
        </Spinner>
        <Spinner color="warning" type="grow">
          Loading...
        </Spinner>
        <Spinner color="success">Loading...</Spinner>
        <Spinner color="danger">Loading...</Spinner>
        <Spinner color="warning">Loading...</Spinner>
        <Spinner color="info">Loading...</Spinner>
        <Spinner color="dark">Loading...</Spinner>
      </ModalBody>
    </Modal>
  );
}
