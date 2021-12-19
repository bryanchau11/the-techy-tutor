import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav, Form, Button } from "react-bootstrap";
function Navigation() {
  const [name, setName] = useState("");
  const [role, setRole] = useState(null);
  const [flag, setFlag] = useState(true);
  useEffect(() => {
    fetch("/get_username", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setName(data.username);
        setRole(data.role);
        if (data.username === "") {
          setFlag(false);
        }
      });
  }, [flag]);
  return (
    <Navbar style={{ backgroundColor: "#CE9338" }}>
      <Container>
        <Navbar.Brand href="#home">THE TECHY TUTOR</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/index">
            Home
          </Nav.Link>
          <Nav.Link>Service</Nav.Link>
        </Nav>
        <Nav className="float-right">
          {flag ? (
            <Form method="POST" action="/logout">
              <Button className="font-nav-bar" variant="danger" type="submit">
                Logout
              </Button>
            </Form>
          ) : (
            <>
              {" "}
              <Nav.Link as={Link} to="/signup">
                Sign Up
              </Nav.Link>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>{" "}
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
export default Navigation;
