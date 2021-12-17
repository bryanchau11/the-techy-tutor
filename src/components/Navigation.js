import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
function Navigation() {
  return (
    <Navbar style={{ backgroundColor: "#CE9338" }}>
      <Container>
        <Navbar.Brand href="#home">THE TECHY TUTOR</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/index">
            Home
          </Nav.Link>
          <Nav.Link>Service</Nav.Link>
          <Nav.Link as={Link} to="/signup">
            Sign Up
          </Nav.Link>
          <Nav.Link as={Link} to="/login">
            Login
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
export default Navigation;
