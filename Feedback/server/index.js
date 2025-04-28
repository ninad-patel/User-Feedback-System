const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/feedback", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Feedback Schema
const feedbackSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  enrollmentId: String,
  course: String,
  feedback: [Number],
  message: String,
  createdAt: { type: Date, default: Date.now }
});

const Feedback = mongoose.model("Feedback", feedbackSchema);
// Routes

// POST /feedback : To submit user feedback
app.post("/feedback", async (req, res) => {
  try {
    const feedbackData = new Feedback(req.body);
    await feedbackData.save();
    res.status(201).json({ message: "Feedback submitted successfully" });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// GET /feedback : To fetch all feedbacks
app.get("/feedback", async (req, res) => {
  try {
    const allFeedbacks = await Feedback.find().sort({ createdAt: -1 }); // latest first
    res.status(200).json(allFeedbacks);
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Start server
app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
