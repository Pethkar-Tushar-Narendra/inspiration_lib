import React, { useState } from 'react';
import {
  Button,
  Card,
  Col,
  FormControl,
  InputGroup,
  ListGroup,
  Row,
} from 'react-bootstrap';

function ChatBox() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="chatbox">
      {!isOpen ? (
        <Button
          variant="primary"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Chat with Admin
        </Button>
      ) : (
        <Card>
          <Card.Body>
            <Row>
              <Col>
                <strong>Support</strong>
              </Col>
              <Col className="text-end">
                <Button
                  className="btn-sm btn-secondary"
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  x
                </Button>
              </Col>
            </Row>
            <hr />
            <ListGroup></ListGroup>
            <form>
              <InputGroup className="col-6">
                <FormControl
                  type="text"
                  placeholder="type message"
                ></FormControl>
                <Button type="submit" variant="primary">
                  Send
                </Button>
              </InputGroup>
            </form>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}

export default ChatBox;
