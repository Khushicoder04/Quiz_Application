const express = require("express");
const Quiz = require("../models/Quiz");

const router = express.Router();


// Get all quizzes
router.get("/", async (req, res) => {
  try {
    const quizzes = await Quiz.find().select("-questions");

    res.status(200).json(quizzes);
  } catch (error) {
    console.error("Get quizzes error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
});


// Get one quiz with questions
router.get("/:id", async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({
        message: "Quiz not found",
      });
    }

    res.status(200).json(quiz);
  } catch (error) {
    console.error("Get quiz error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
});


// Create a quiz
router.post("/", async (req, res) => {
  try {
    const {
      title,
      category,
      difficulty,
      questions,
    } = req.body;

    if (
      !title ||
      !category ||
      !difficulty ||
      !questions ||
      questions.length === 0
    ) {
      return res.status(400).json({
        message: "All quiz fields are required",
      });
    }

    const quiz = await Quiz.create({
      title,
      category,
      difficulty,
      questions,
    });

    res.status(201).json({
      message: "Quiz created successfully",
      quiz,
    });
  } catch (error) {
    console.error("Create quiz error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
});


module.exports = router;