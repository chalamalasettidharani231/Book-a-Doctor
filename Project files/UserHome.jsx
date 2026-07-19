import React from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function UserHome() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("userData"));

  return (
    <Container className="mt-5">

      <Card className="p-4 shadow">
        <h2>
          Welcome, {user?.name}
        </h2>

        <p>
          Manage your doctor appointments and health services.
        </p>

        <Row className="mt-4">

          <Col md={4}>
            <Card className="p-3 text-center">
              <h5>Apply Doctor</h5>
              <p>
                Want to become a doctor?
              </p>

              <Button
                onClick={() => navigate("/apply-doctor")}
              >
                Apply Now
              </Button>
            </Card>
          </Col>


          <Col md={4}>
            <Card className="p-3 text-center">
              <h5>Find Doctors</h5>
              <p>
                View available doctors.
              </p>

              <Button
                onClick={() => navigate("/doctors")}
              >
                View Doctors
              </Button>
            </Card>
          </Col>


          <Col md={4}>
            <Card className="p-3 text-center">
              <h5>Appointments</h5>
              <p>
                Check your appointments.
              </p>

              <Button
                onClick={() => navigate(
                  `/userappointments/${user?._id}`
                )}
              >
                My Appointments
              </Button>
            </Card>
          </Col>

        </Row>

      </Card>

    </Container>
  );
}

export default UserHome;