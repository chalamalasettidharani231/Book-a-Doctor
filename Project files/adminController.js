const userModel = require("../models/userModel");
const doctorModel = require("../models/docModel");
const appointmentModel = require("../models/appointmentModel");

// ===============================
// Get All Users
// ===============================
const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({}).select("-password");

    res.status(200).send({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error while fetching users",
      error,
    });
  }
};

// ===============================
// Get All Doctors
// ===============================
const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).populate("userId");

    res.status(200).send({
      success: true,
      message: "Doctors fetched successfully",
      data: doctors,
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error while fetching doctors",
      error,
    });
  }
};

// ===============================
// Approve / Reject Doctor
// ===============================
const changeAccountStatusController = async (req, res) => {
  try {
    const { doctorId, status } = req.body;

    const doctor = await doctorModel.findByIdAndUpdate(
      doctorId,
      { status },
      { new: true }
    );

    const user = await userModel.findById(doctor.userId);

    user.notification.push({
      type: "doctor-request-updated",
      message: `Your Doctor Account has been ${status}`,
      onClickPath: "/notification",
    });

    user.isdoctor = status === "approved";

    await user.save();

    res.status(200).send({
      success: true,
      message: `Doctor Account ${status} Successfully`,
    });

  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error Updating Status",
      error,
    });
  }
};

// ===============================
// Get All Appointments
// ===============================
const getAllAppointmentsController = async (req, res) => {
  try {

    const appointments = await appointmentModel
      .find({})
      .populate("userId")
      .populate("doctorId");

    res.status(200).send({
      success: true,
      message: "Appointments fetched successfully",
      data: appointments,
    });

  } catch (error) {

    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error fetching appointments",
      error,
    });

  }
};

// ===============================
// Delete Doctor
// ===============================
const deleteDoctorController = async (req, res) => {
  try {

    const doctor = await doctorModel.findById(req.params.id);

    if (!doctor) {
      return res.status(404).send({
        success: false,
        message: "Doctor Not Found",
      });
    }

    await userModel.findByIdAndUpdate(doctor.userId, {
      isdoctor: false,
    });

    await doctorModel.findByIdAndDelete(req.params.id);

    res.status(200).send({
      success: true,
      message: "Doctor Deleted Successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error Deleting Doctor",
      error,
    });

  }
};

// ===============================
// Delete Appointment
// ===============================
const deleteAppointmentController = async (req, res) => {
  try {

    await appointmentModel.findByIdAndDelete(req.params.id);

    res.status(200).send({
      success: true,
      message: "Appointment Deleted Successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error Deleting Appointment",
      error,
    });

  }
};

module.exports = {
  getAllUsersController,
  getAllDoctorsController,
  changeAccountStatusController,
  getAllAppointmentsController,
  deleteDoctorController,
  deleteAppointmentController,
};