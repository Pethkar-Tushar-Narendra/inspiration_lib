import React, { useContext, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import RegisterToggle from './models/RegisterToggle';
import MessageToggle from './models/MessageToggle';
import LogInToggle from './models/LogInToggle';
import { Store } from '../Store';
import ProfileUpdateToggle from './models/ProfileUpdateToggle';
import SubEndDateToggle from './models/SubEndDateToggle';

function Header() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { inspiration_userInfo } = state;
  const [modal, setModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const [subEndModal, setSubEndModal] = useState(false);
  const toggle = () => setModal(!modal);
  const loginToggle = () => setLoginModal(!loginModal);
  const profileToggle = () => setProfileModal(!profileModal);
  const subEndToggle = () => setSubEndModal(!subEndModal);
  const changeForm = () => {
    setModal(!modal);
    setLoginModal(!loginModal);
  };

  const signOutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('inspiration_userInfo');
    navigate('/');
  };
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              {/* <img
                alt="logo"
                src="../images/"
                style={{
                  height: 40,
                  width: 40,
                }}
              /> */}
              Inspiration Study Center
            </Navbar.Brand>
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
              {inspiration_userInfo && (
                <NavDropdown title="Welcome" id="navbarScrollingDropdown">
                  <NavDropdown.Item onClick={profileToggle}>
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={subEndToggle}>
                    Subscription
                  </NavDropdown.Item>
                </NavDropdown>
              )}
              <Nav.Link disabled>
                {inspiration_userInfo != null
                  ? inspiration_userInfo.firstName
                  : 'Please LogIn'}
              </Nav.Link>
              <Nav>
                <Link to="/todolist" className="nav-link">
                  Your Todo List
                </Link>
              </Nav>

              {inspiration_userInfo != null && inspiration_userInfo.isAdmin && (
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
              )}
            </Nav>
            {inspiration_userInfo ? (
              <Button
                variant="outline-light"
                className="me-2"
                onClick={signOutHandler}
              >
                SignOut
              </Button>
            ) : (
              <>
                <Button
                  variant="outline-light"
                  className="me-2"
                  onClick={loginToggle}
                >
                  LogIn
                </Button>{' '}
                <Button
                  variant="outline-light"
                  className="me-2"
                  onClick={toggle}
                >
                  Register
                </Button>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <RegisterToggle modal={modal} toggle={toggle} changeForm={changeForm} />
      <LogInToggle
        modal={loginModal}
        toggle={loginToggle}
        changeForm={changeForm}
      />
      <ProfileUpdateToggle modal={profileModal} toggle={profileToggle} />
      <SubEndDateToggle modal={subEndModal} toggle={subEndToggle} />
    </>
  );
}

export default Header;
