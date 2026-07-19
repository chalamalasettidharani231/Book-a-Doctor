import React from "react";
import { Link } from "react-router-dom";
import { Container, Navbar, Nav, Button, Row, Col } from "react-bootstrap";

function Home() {
  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>MediCareBook</Navbar.Brand>

          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
            <Nav.Link as={Link} to="/register">Register</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container className="mt-5">
        <Row>
          <Col md={6}>
            <h1>Book Your Doctor Appointment</h1>
            <p>Find doctors and book appointments online.</p>

            <Button as={Link} to="/login">
              Book Appointment
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;