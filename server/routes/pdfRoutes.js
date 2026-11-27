const express = require("express");
const multer = require("multer");
const fs = require("fs");
const { PDFParse } = require("pdf-parse");

const generateQuizFromText = require("../utils/quizGenerator");

const router = express.Router();

const upload = multer({
  dest: "uploads/",
});

router.post("/upload", upload.single("pdf"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a PDF file",
      });
    }

    if (req.file.mimetype !== "application/pdf") {
      fs.unlinkSync(req.file.path);

      return res.status(400).json({
        message: "Only PDF files are allowed",
      });
    }

    // Read PDF
    const pdfBuffer = fs.readFileSync(req.file.path);

    // Extract text
    const parser = new PDFParse({
      data: pdfBuffer,
    });

    const result = await parser.getText();

    await parser.destroy();

    // Delete temporary PDF
    fs.unlinkSync(req.file.path);

    // Generate quiz questions
    //const questions = generateQuizFromText(result.text);
    console.log("\n========== EXTRACTED PDF TEXT ==========\n");
console.log(result.text.substring(0, 5000));
console.log("\n========== END PDF TEXT ==========\n");

const questions = generateQuizFromText(result.text);

console.log("========== GENERATED QUESTIONS ==========");
console.log(JSON.stringify(questions, null, 2));
console.log("========== END GENERATED QUESTIONS ==========");

    res.status(200).json({
      message: "PDF processed successfully",
      file: {
        originalName: req.file.originalname,
      },
      pages: result.total,
      questions,
    });
  } catch (error) {
    console.error("PDF processing error:", error);

    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      message: "Failed to process PDF",
      error: error.message,
    });
  }
});

module.exports = router;