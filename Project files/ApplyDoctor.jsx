import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ApplyDoctor() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    specialization: "",
    experience: "",
    fees: "",
  });


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const token = localStorage.getItem("token");


      const res = await axios.post(
        "http://localhost:8000/api/user/apply-doctor",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      if(res.data.success){

        alert("Doctor application submitted successfully");

        navigate("/userhome");

      }


    } catch(error){

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Something went wrong"
      );

    }

  };


  return (

    <Container className="mt-5">

      <Card className="p-4 shadow">

        <h2 className="mb-4">
          Apply For Doctor
        </h2>


        <Form onSubmit={handleSubmit}>


          <Form.Group className="mb-3">
            <Form.Label>
              First Name
            </Form.Label>

            <Form.Control
              name="firstName"
              onChange={handleChange}
              required
            />

          </Form.Group>



          <Form.Group className="mb-3">
            <Form.Label>
              Last Name
            </Form.Label>

            <Form.Control
              name="lastName"
              onChange={handleChange}
              required
            />

          </Form.Group>



          <Form.Group className="mb-3">
            <Form.Label>
              Phone
            </Form.Label>

            <Form.Control
              name="phone"
              onChange={handleChange}
              required
            />

          </Form.Group>



          <Form.Group className="mb-3">
            <Form.Label>
              Email
            </Form.Label>

            <Form.Control
              name="email"
              type="email"
              onChange={handleChange}
              required
            />

          </Form.Group>



          <Form.Group className="mb-3">
            <Form.Label>
              Address
            </Form.Label>

            <Form.Control
              name="address"
              onChange={handleChange}
              required
            />

          </Form.Group>



          <Form.Group className="mb-3">
            <Form.Label>
              Specialization
            </Form.Label>

            <Form.Control
              name="specialization"
              onChange={handleChange}
              required
            />

          </Form.Group>



          <Form.Group className="mb-3">
            <Form.Label>
              Experience
            </Form.Label>

            <Form.Control
              name="experience"
              type="number"
              onChange={handleChange}
              required
            />

          </Form.Group>



          <Form.Group className="mb-3">
            <Form.Label>
              Fees
            </Form.Label>

            <Form.Control
              name="fees"
              type="number"
              onChange={handleChange}
              required
            />

          </Form.Group>



          <Button type="submit">
            Submit Application
          </Button>


        </Form>

      </Card>

    </Container>

  );
}

export default ApplyDoctor;