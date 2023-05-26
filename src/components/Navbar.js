import React from 'react';
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  Container,
  Button,
} from 'react-bootstrap';
import { FaCartPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function CustomNavbar() {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container fluid>
          <Navbar.Brand href="#KSHOP">
            <img
              src="/onlineshop.ico"
              height="30"
              className="d-inline-block align-top"
              alt="KSHOP"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link as={Link} to={'/home'}>
                Home
              </Nav.Link>

              <NavDropdown title="Categories" id="navbarScrollingDropdown">
                <NavDropdown.Item as={Link} to={'/categories/tshirts'}>
                  T-Shirts
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to={'/categories/caps'}>
                  Caps
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to={'/categories/denims'}>
                  Denims
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link as={Link} to={'/cart'}>
                <FaCartPlus />
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>

            <Nav className="mr-auto">
              <NavDropdown title="WELCOME" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to={'/login'}>
                  Login
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to={'/register'}>
                  Register
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default CustomNavbar;
