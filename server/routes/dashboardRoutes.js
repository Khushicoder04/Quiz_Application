const express = require("express");
const Attempt = require("../models/Attempt");

const router = express.Router();


// Get dashboard statistics
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const attempts = await Attempt.find({
      userId,
    });

    const quizzesCompleted = attempts.length;

    let averageScore = 0;
    let bestScore = 0;

    if (attempts.length > 0) {
      const totalPercentage = attempts.reduce(
        (total, attempt) =>
          total + attempt.percentage,
        0
      );

      averageScore = Math.round(
        totalPercentage / attempts.length
      );

      bestScore = Math.max(
        ...attempts.map(
          (attempt) => attempt.percentage
        )
      );
    }

    res.status(200).json({
      quizzesCompleted,
      averageScore,
      bestScore,
    });

  } catch (error) {
    console.error(
      "Dashboard stats error:",
      error.message
    );

    res.status(500).json({
      message: "Server error",
    });
  }
});


module.exports = router;