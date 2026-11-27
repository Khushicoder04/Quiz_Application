const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const quizRoutes = require("./routes/quizRoutes");
const pdfRoutes = require("./routes/pdfRoutes");
const attemptRoutes = require("./routes/attemptRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

dotenv.config();

const app = express();


// Connect to MongoDB
connectDB();


// Middleware
app.use(cors());
app.use(express.json());


// Authentication Routes
app.use("/api/auth", authRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/pdf", pdfRoutes);
app.use("/api/attempts", attemptRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Test Route
app.get("/", (req, res) => {
  res.json({
    message: "Quiz Application API is running",
  });
});


// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});