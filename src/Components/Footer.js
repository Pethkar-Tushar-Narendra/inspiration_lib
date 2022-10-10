import React from 'react';
import { Container, Navbar } from 'react-bootstrap';

function Footer() {
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <div style={{ textAlign: 'center' }}>
          <h6>Footer 2022 copyright</h6>
        </div>
      </Container>
      {/* <Container>
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
      </Container> */}
    </Navbar>
  );
}

export default Footer;
