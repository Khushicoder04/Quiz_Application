const express = require("express");
const Attempt = require("../models/Attempt");

const router = express.Router();


// Save quiz attempt
router.post("/", async (req, res) => {
  try {
    const {
      userId,
      quizId,
      score,
      totalQuestions,
      answers,
    } = req.body;


    // Validate required fields
    if (
      !userId ||
      !quizId ||
      score === undefined ||
      !totalQuestions
    ) {
      return res.status(400).json({
        message: "Required fields are missing",
      });
    }


    // Calculate percentage
    const percentage = Math.round(
      (score / totalQuestions) * 100
    );


    // Create attempt
    const attempt = await Attempt.create({
      userId,
      quizId,
      score,
      totalQuestions,
      percentage,
      answers,
    });


    res.status(201).json({
      message: "Quiz attempt saved successfully",
      attempt,
    });

  } catch (error) {
    console.error(
      "Save attempt error:",
      error.message
    );

    res.status(500).json({
      message: "Server error",
    });
  }
});


module.exports = router;