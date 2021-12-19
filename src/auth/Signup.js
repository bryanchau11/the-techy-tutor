import React, { useEffect, useState } from "react";

import { Container, Row, Col, Card, Button } from "react-bootstrap";
import StudentSignup from "./StudentSignup";
import TutorSignup from "./TutorSignup";
import tutorCard from "../assets/tutorCard.jpg";
import studentCard from "../assets/studentCard.jpg";
import Navigation from "../components/Navigation";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [home, setHome] = useState("home");
  const navigate = useNavigate();
  // redirect to home if logged in
  useEffect(() => {
    fetch("/get_username", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.username !== "") {
          navigate("/index");
        }
      });
  }, []);
  return (
    <>
      <Navigation />
      <div style={{ backgroundColor: "#BDC7D0" }}>
        {home === "student" ? (
          <StudentSignup />
        ) : home === "tutor" ? (
          <TutorSignup />
        ) : (
          <Container style={{ backgroundColor: "#BDC7D0" }}>
            <Row>
              <Col>
                <Card style={{ width: "18rem" }}>
                  <Card.Img variant="top" src={studentCard} />
                  <Card.Body>
                    <Card.Title>Student</Card.Title>
                    <Card.Text>
                      Let us know your project needs and we will match you with
                      a tutor.
                    </Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => setHome("student")}
                    >
                      Sign Up
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card style={{ width: "18rem" }}>
                  <Card.Img variant="top" src={tutorCard} />
                  <Card.Body>
                    <Card.Title>Tutor</Card.Title>
                    <Card.Text>
                      Let us know your skillset and we will match you with
                      students that you can help.
                    </Card.Text>
                    <Button variant="primary" onClick={() => setHome("tutor")}>
                      Sign Up
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        )}
        <Button variant="primary" onClick={() => setHome("home")}>
          Back to Sign Up Screen
        </Button>
      </div>{" "}
    </>
  );
}
export default Signup;
