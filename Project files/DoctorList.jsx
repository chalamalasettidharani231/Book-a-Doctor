import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Button } from "react-bootstrap";

function DoctorList() {

  const [doctors, setDoctors] = useState([]);

  const getDoctors = async () => {
    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:8000/api/user/getAllDoctors",
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      if(res.data.success){
        setDoctors(res.data.doctors);
      }

    } catch(error){
      console.log(error);
    }
  };


  useEffect(()=>{
    getDoctors();
  },[]);


  return (

    <Container className="mt-5">

      <h2>
        Available Doctors
      </h2>


      {doctors.map((doctor)=>(
        
        <Card 
          key={doctor._id}
          className="p-3 mt-3 shadow"
        >

          <h4>
            {doctor.firstName} {doctor.lastName}
          </h4>

          <p>
            Specialization: {doctor.specialization}
          </p>

          <p>
            Experience: {doctor.experience} years
          </p>

          <p>
            Fees: ₹{doctor.fees}
          </p>


          <Button>
            Book Appointment
          </Button>


        </Card>

      ))}


    </Container>

  );
}

export default DoctorList;