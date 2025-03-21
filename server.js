require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ✅ CORS setup to allow frontend domain
app.use(cors({
  origin: 'https://restaurant-ui-brown.vercel.app', // allow your frontend
  methods: ['GET', 'POST'],                         // optional: restrict methods
  credentials: true                                 // optional: if you're using cookies/auth
}));


app.use(express.json()); // To parse JSON data

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {})
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Create Schema
const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  date: String,
  time: String,
  message: String,
});

const Contact = mongoose.model("Contact", ContactSchema);

// API Endpoint to store form data
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, phone, date, time, message } = req.body;
    const newContact = new Contact({ name, email, phone, date, time, message });
    await newContact.save();
    res.json({ success: true, message: "Form submitted successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// Test route
app.get('/home', (req, res) => {
  res.send('Welcome');
});

// Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

