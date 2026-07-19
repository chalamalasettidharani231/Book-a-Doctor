const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const {
  getAllUsersController,
  getAllDoctorsController,
  changeAccountStatusController,
  getAllAppointmentsController,
  deleteDoctorController,
  deleteAppointmentController,
} = require("../controllers/adminController");

const router = express.Router();

// ======================= USERS =========================

// Get all users
router.get(
  "/getAllUsers",
  authMiddleware,
  getAllUsersController
);

// ======================= DOCTORS =========================

// Get all doctors
router.get(
  "/getAllDoctors",
  authMiddleware,
  getAllDoctorsController
);

// Approve / Reject doctor
router.post(
  "/changeAccountStatus",
  authMiddleware,
  changeAccountStatusController
);

// Delete doctor
router.delete(
  "/deleteDoctor/:id",
  authMiddleware,
  deleteDoctorController
);

// ======================= APPOINTMENTS =========================

// Get all appointments
router.get(
  "/getAllAppointments",
  authMiddleware,
  getAllAppointmentsController
);

// Delete appointment
router.delete(
  "/deleteAppointment/:id",
  authMiddleware,
  deleteAppointmentController
);

module.exports = router;