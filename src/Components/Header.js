import React, { useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
} from 'react-bootstrap';

function Header() {
  const navigate = useNavigate();
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        <Button variant="dark" onClick={() => setSidebarIsOpen(!sidebarIsOpen)}>
          <i className="fas fa-bars"></i>
        </Button>
        <LinkContainer to="/">
          <Navbar.Brand>Navbar scroll</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav>
              <Link to="/" className="nav-link">
                Home
              </Link>
            </Nav>
            <Nav>
              <Link to="/about" className="nav-link">
                About
              </Link>
            </Nav>
            <NavDropdown title="Welcome" id="navbarScrollingDropdown">
              <LinkContainer to="/profile">
                <NavDropdown.Item>Profile</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />
              <LinkContainer to="/subscription">
                <NavDropdown.Item>Subscription</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />
              <LinkContainer to="/login">
                <NavDropdown.Item>Log In</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
            <Nav.Link disabled>Made by Tushar Pethkar</Nav.Link>
            <Nav>
              <Link to="/todolist" className="nav-link">
                Your Todo List
              </Link>
            </Nav>
            <NavDropdown title="Admin Panel" id="navbarScrollingDropdown">
              <LinkContainer to="/dashboard">
                <NavDropdown.Item>Dashboard</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />
              <LinkContainer to="/userlist">
                <NavDropdown.Item>User List</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />
              <LinkContainer to="/adminchat">
                <NavDropdown.Item>Chat Screen</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          </Nav>

          <Form className="d-flex">
            <Button
              variant="outline-light"
              className="me-2"
              onClick={() => {
                navigate('/registration');
              }}
            >
              Registeration
            </Button>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-light">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
