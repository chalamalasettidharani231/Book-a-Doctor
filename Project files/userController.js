const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");
const doctorModel = require("../models/docModel");
const jwt = require("jsonwebtoken");


// ================= REGISTER =================

const registerController = async (req, res) => {
  try {

    const { name, email, password } = req.body;


    if (!name || !email || !password) {
      return res.status(400).send({
        success:false,
        message:"Please provide all fields"
      });
    }


    const existingUser = await userModel.findOne({
      email
    });


    if(existingUser){
      return res.status(200).send({
        success:false,
        message:"User already exists"
      });
    }


    const hashedPassword = await bcrypt.hash(
      password,
      10
    );


    const newUser = new userModel({

      name,
      email,
      password: hashedPassword,
      type:"user",
      notification:[]

    });


    await newUser.save();


    res.status(201).send({

      success:true,
      message:"Register Successfully"

    });



  } catch(error){

    console.log(error);

    res.status(500).send({

      success:false,
      message:"Register Error",
      error

    });

  }
};





// ================= LOGIN =================


const loginController = async(req,res)=>{

try{


const {email,password}=req.body;


const user = await userModel.findOne({
  email
});


if(!user){

return res.status(404).send({

success:false,
message:"User not found"

});

}



const match = await bcrypt.compare(
password,
user.password
);



if(!match){

return res.status(401).send({

success:false,
message:"Invalid Password"

});

}



const token = jwt.sign(

{
id:user._id
},

process.env.JWT_SECRET,

{
expiresIn:"1d"
}

);



res.status(200).send({

success:true,

message:"Login Successfully",

token,


userData:{

_id:user._id,
name:user.name,
email:user.email,
type:user.type

}


});



}catch(error){

console.log(error);


res.status(500).send({

success:false,
message:"Login Error"

});


}

};







// ================= APPLY DOCTOR =================


const applyDoctorController = async (req, res) => {
  try {

    console.log("Received:", req.body);
    console.log("User ID:", req.userId);

    const doctor = new doctorModel({
      userId: req.userId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address,
      specialization: req.body.specialization,
      experience: req.body.experience,
      fees: req.body.fees,
      status: "pending",
    });

    await doctor.save();

    res.status(200).send({
      success: true,
      message: "Doctor application submitted successfully",
      data: doctor,
    });

  } catch (error) {

    console.log("Apply Doctor Error:", error);

    res.status(500).send({
      success: false,
      message: "Apply Doctor Error",
      error: error.message,
    });

  }
};







// ================= GET ALL DOCTORS =================


const getAllDoctorsController = async(req,res)=>{

try{


const doctors = await doctorModel.find({

status:"approved"

}).populate("userId");



res.status(200).send({

success:true,

data:doctors

});



}catch(error){


console.log(error);


res.status(500).send({

success:false,

message:error.message

});


}

};







// ================= BOOK APPOINTMENT =================


const bookAppointmentController = async(req,res)=>{

try{


res.status(200).send({

success:true,

message:"Appointment booked successfully"

});


}catch(error){

res.status(500).send({

success:false,

message:error.message

});

}

};







// ================= GET USER =================


const getUserController = async(req,res)=>{

try{


const user = await userModel.findById(
req.userId
).select("-password");



res.status(200).send({

success:true,

data:user

});


}catch(error){


res.status(500).send({

success:false,

message:error.message

});


}

};







// ================= GET NOTIFICATIONS =================


const getAllNotificationController = async(req,res)=>{

try{


const user = await userModel.findById(
req.userId
);



res.status(200).send({

success:true,

data:user.notification

});


}catch(error){


res.status(500).send({

success:false,

message:error.message

});


}

};







// ================= DELETE NOTIFICATIONS =================


const deleteAllNotificationController = async(req,res)=>{

try{


await userModel.findByIdAndUpdate(

req.userId,

{
notification:[]
}

);



res.status(200).send({

success:true,

message:"Notifications deleted"

});


}catch(error){


res.status(500).send({

success:false,

message:error.message

});


}

};







// ================= USER APPOINTMENTS =================


const getAllUserAppointmentsController = async(req,res)=>{

try{


res.status(200).send({

success:true,

appointments:[]

});


}catch(error){


res.status(500).send({

success:false,

message:error.message

});


}

};


console.log("CHECK CONTROLLERS:", {
  registerController: typeof registerController,
  loginController: typeof loginController,
  applyDoctorController: typeof applyDoctorController,
  getAllDoctorsController: typeof getAllDoctorsController,
  bookAppointmentController: typeof bookAppointmentController,
  getUserController: typeof getUserController,
  getAllNotificationController: typeof getAllNotificationController,
  deleteAllNotificationController: typeof deleteAllNotificationController,
  getAllUserAppointmentsController: typeof getAllUserAppointmentsController
});


module.exports = {

registerController,
loginController,
applyDoctorController,
getAllDoctorsController,
bookAppointmentController,
getUserController,
getAllNotificationController,
deleteAllNotificationController,
getAllUserAppointmentsController

};