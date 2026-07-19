const express = require("express");
const router = express.Router();
const multer = require("multer");

const authMiddleware = require("../middleware/authMiddleware");


const {
  registerController,
  loginController,
  applyDoctorController,
  getAllDoctorsController,
  bookAppointmentController,
  getUserController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllUserAppointmentsController

} = require("../controllers/userController");



// multer

const storage = multer.diskStorage({

  destination:(req,file,cb)=>{
    cb(null,"uploads/");
  },


  filename:(req,file,cb)=>{
    cb(null,Date.now()+"-"+file.originalname);
  }

});


const upload = multer({
  storage
});




// PUBLIC ROUTES

router.post(
  "/register",
  registerController
);


router.post(
  "/login",
  loginController
);




// PROTECTED ROUTES


router.post(
  "/apply-doctor",
  authMiddleware,
  applyDoctorController
);



router.get(
  "/getAllDoctors",
  authMiddleware,
  getAllDoctorsController
);



router.post(
  "/book-appointment",
  authMiddleware,
  upload.single("document"),
  bookAppointmentController
);



router.post(
  "/getUser",
  authMiddleware,
  getUserController
);



router.post(
  "/getallnotification",
  authMiddleware,
  getAllNotificationController
);



router.post(
  "/deleteallnotification",
  authMiddleware,
  deleteAllNotificationController
);



router.get(
  "/getAppointments/:userId",
  authMiddleware,
  getAllUserAppointmentsController
);



module.exports = router;