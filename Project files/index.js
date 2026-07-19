const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectToDB = require("./config/connectToDB");

const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
console.log("USER ROUTES:", userRoutes);
console.log("ADMIN ROUTES:", adminRoutes);

dotenv.config();

connectToDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Doctor Appointment API Running");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});