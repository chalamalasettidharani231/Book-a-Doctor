import React from "react";
import {Container, Card} from "react-bootstrap";

function DoctorAppointments(){

return(
<Container className="mt-5">

<Card className="p-4 shadow">

<h2>
Doctor Appointments
</h2>

<p>
Appointments will appear here after doctor approval.
</p>

</Card>

</Container>
);

}

export default DoctorAppointments;