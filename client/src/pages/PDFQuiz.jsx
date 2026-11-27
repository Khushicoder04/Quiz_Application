import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Upload,
  Sparkles,
  ArrowLeft,
  CheckCircle,
  XCircle,
  RotateCcw,
} from "lucide-react";

function PDFQuiz() {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    setError("");
    setQuestions([]);
    setAnswers({});
    setSubmitted(false);

    if (!selectedFile) {
      setFile(null);
      return;
    }

    if (selectedFile.type !== "application/pdf") {
      setError("Please select a PDF file.");
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  const handleGenerateQuiz = async () => {
    if (!file) {
      setError("Please select a PDF file first.");
      return;
    }

    setLoading(true);
    setError("");
    setQuestions([]);
    setAnswers({});
    setSubmitted(false);

    try {
      const formData = new FormData();

      formData.append("pdf", file);

      const response = await fetch(
        "http://localhost:5000/api/pdf/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to generate quiz"
        );
      }

      if (!data.questions || data.questions.length === 0) {
        throw new Error(
          "No quiz questions could be generated from this PDF."
        );
      }

      setQuestions(data.questions);
    } catch (error) {
      console.error("PDF quiz error:", error);

      setError(
        error.message ||
          "Something went wrong while generating the quiz."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (
    questionIndex,
    selectedAnswer
  ) => {
    if (submitted) {
      return;
    }

    setAnswers((previousAnswers) => ({
      ...previousAnswers,
      [questionIndex]: selectedAnswer,
    }));
  };

  const calculateScore = () => {
    let score = 0;

    questions.forEach((question, index) => {
      if (
        answers[index] === question.correctAnswer
      ) {
        score++;
      }
    });

    return score;
  };

  const handleSubmit = () => {
    setSubmitted(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleRestart = () => {
    setAnswers({});
    setSubmitted(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const score = calculateScore();

  const percentage =
    questions.length > 0
      ? Math.round(
          (score / questions.length) * 100
        )
      : 0;

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Navbar */}
      <nav className="border-b border-slate-800 bg-slate-900">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
              <FileText size={22} />
            </div>

            <h1 className="text-2xl font-bold">
              PDF Quiz Generator
            </h1>
          </div>

          <button
            onClick={() => navigate("/quizzes")}
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to Quizzes
          </button>

        </div>
      </nav>

      <main className="mx-auto max-w-5xl px-6 py-10">

        {/* Upload Section */}
        <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

          <div className="mb-7">
            <p className="mb-2 text-sm font-medium text-indigo-400">
              AI-Powered Learning
            </p>

            <h2 className="text-4xl font-bold">
              Generate Quiz from PDF
            </h2>

            <p className="mt-3 max-w-2xl text-slate-400">
              Upload any PDF and generate multiple-choice
              questions from its content.
            </p>
          </div>

          {/* File Upload */}
          <label className="block cursor-pointer rounded-2xl border-2 border-dashed border-slate-700 bg-slate-950 p-8 text-center transition hover:border-indigo-500">

            <input
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />

            <Upload
              size={38}
              className="mx-auto mb-4 text-indigo-400"
            />

            <h3 className="text-lg font-semibold">
              {file
                ? file.name
                : "Choose a PDF file"}
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              {file
                ? `${(
                    file.size /
                    (1024 * 1024)
                  ).toFixed(2)} MB`
                : "Click here to select a PDF from your computer"}
            </p>

          </label>

          {/* Error */}
          {error && (
            <div className="mt-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Generate Button */}
          <button
            onClick={handleGenerateQuiz}
            disabled={!file || loading}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-4 font-semibold transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Sparkles size={20} />

            {loading
              ? "Generating Quiz..."
              : "Generate Quiz"}
          </button>

        </section>

        {/* Result Summary */}
        {submitted && (
          <section className="mt-8 rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 p-8 text-center">

            <p className="text-sm font-medium text-indigo-400">
              Quiz Completed
            </p>

            <h2 className="mt-2 text-4xl font-bold">
              {score} / {questions.length}
            </h2>

            <p className="mt-2 text-xl font-semibold">
              {percentage}%
            </p>

            <p className="mt-2 text-slate-400">
              {percentage >= 80
                ? "Excellent work! 🎉"
                : percentage >= 60
                ? "Good job! Keep practicing."
                : "Keep practicing and try again."}
            </p>

            <button
              onClick={handleRestart}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-700"
            >
              <RotateCcw size={18} />
              Try Again
            </button>

          </section>
        )}

        {/* Generated Quiz */}
        {questions.length > 0 && (
          <section className="mt-8">

            <div className="mb-6">
              <p className="text-sm font-medium text-indigo-400">
                Generated Quiz
              </p>

              <h2 className="mt-1 text-3xl font-bold">
                {submitted
                  ? "Quiz Review"
                  : "Answer the Questions"}
              </h2>

              <p className="mt-2 text-slate-400">
                {questions.length} questions generated
                from your PDF.
              </p>
            </div>

            <div className="space-y-6">

              {questions.map(
                (question, questionIndex) => {

                  const selectedAnswer =
                    answers[questionIndex];

                  const isCorrect =
                    selectedAnswer ===
                    question.correctAnswer;

                  return (
                    <div
                      key={questionIndex}
                      className="rounded-3xl border border-slate-800 bg-slate-900 p-6"
                    >

                      {/* Question */}
                      <div className="flex items-start gap-4">

                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-500/10 text-sm font-bold text-indigo-400">
                          {questionIndex + 1}
                        </div>

                        <h3 className="pt-1 text-lg font-bold leading-relaxed">
                          {question.question}
                        </h3>

                      </div>

                      {/* Options */}
                      <div className="mt-6 space-y-3">

                        {question.options.map(
                          (option, optionIndex) => {

                            const isSelected =
                              selectedAnswer ===
                              option;

                            const isCorrectOption =
                              option ===
                              question.correctAnswer;

                            let optionClass =
                              "border-slate-700 bg-slate-950 hover:border-indigo-500";

                            if (!submitted) {
                              if (isSelected) {
                                optionClass =
                                  "border-indigo-500 bg-indigo-500/10";
                              }
                            }

                            if (submitted) {
                              if (
                                isCorrectOption
                              ) {
                                optionClass =
                                  "border-green-500 bg-green-500/10";
                              } else if (
                                isSelected &&
                                !isCorrectOption
                              ) {
                                optionClass =
                                  "border-red-500 bg-red-500/10";
                              }
                            }

                            return (
                              <button
                                key={optionIndex}
                                onClick={() =>
                                  handleAnswerSelect(
                                    questionIndex,
                                    option
                                  )
                                }
                                disabled={submitted}
                                className={`flex w-full items-start gap-3 rounded-xl border px-4 py-4 text-left transition ${optionClass}`}
                              >

                                <span className="font-bold text-indigo-400">
                                  {String.fromCharCode(
                                    65 +
                                      optionIndex
                                  )}
                                  .
                                </span>

                                <span className="flex-1 text-sm leading-relaxed text-slate-200">
                                  {option}
                                </span>

                                {submitted &&
                                  isCorrectOption && (
                                    <CheckCircle
                                      size={20}
                                      className="shrink-0 text-green-400"
                                    />
                                  )}

                                {submitted &&
                                  isSelected &&
                                  !isCorrectOption && (
                                    <XCircle
                                      size={20}
                                      className="shrink-0 text-red-400"
                                    />
                                  )}

                              </button>
                            );
                          }
                        )}

                      </div>

                      {/* Review */}
                      {submitted && (
                        <div
                          className={`mt-5 rounded-xl border p-4 ${
                            isCorrect
                              ? "border-green-500/30 bg-green-500/5"
                              : "border-red-500/30 bg-red-500/5"
                          }`}
                        >

                          <div className="flex items-center gap-2">

                            {isCorrect ? (
                              <>
                                <CheckCircle
                                  size={19}
                                  className="text-green-400"
                                />

                                <span className="font-semibold text-green-400">
                                  Correct Answer
                                </span>
                              </>
                            ) : (
                              <>
                                <XCircle
                                  size={19}
                                  className="text-red-400"
                                />

                                <span className="font-semibold text-red-400">
                                  Incorrect Answer
                                </span>
                              </>
                            )}

                          </div>

                          {!isCorrect && (
                            <p className="mt-3 text-sm text-slate-300">
                              <span className="font-semibold">
                                Correct answer:
                              </span>{" "}
                              {question.correctAnswer}
                            </p>
                          )}

                          {question.explanation && (
                            <p className="mt-2 text-sm leading-relaxed text-slate-400">
                              <span className="font-semibold text-slate-300">
                                Explanation:
                              </span>{" "}
                              {question.explanation}
                            </p>
                          )}

                        </div>
                      )}

                    </div>
                  );
                }
              )}

            </div>

            {/* Submit */}
            {!submitted && (
              <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                  <div>
                    <p className="font-semibold">
                      Ready to submit?
                    </p>

                    <p className="mt-1 text-sm text-slate-400">
                      Answered{" "}
                      {Object.keys(answers).length}{" "}
                      of {questions.length} questions.
                    </p>
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="rounded-xl bg-green-600 px-7 py-3 font-semibold transition hover:bg-green-700"
                  >
                    Submit Quiz
                  </button>

                </div>

              </div>
            )}

          </section>
        )}

      </main>
    </div>
  );
}

export default PDFQuiz;