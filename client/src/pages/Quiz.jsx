import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
} from "lucide-react";

function Quiz() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/quizzes/${id}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load quiz"
          );
        }

        setQuiz(data);
      } catch (error) {
        console.error("Quiz loading error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  useEffect(() => {
    if (!quiz) {
      return;
    }

    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((previousTime) => previousTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, quiz]);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswers((previousAnswers) => ({
      ...previousAnswers,
      [currentQuestion]: answer,
    }));
  };

  const handleNext = () => {
    if (
      currentQuestion <
      quiz.questions.length - 1
    ) {
      setCurrentQuestion(
        (previousQuestion) =>
          previousQuestion + 1
      );
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(
        (previousQuestion) =>
          previousQuestion - 1
      );
    }
  };

  const handleSubmit = async () => {
  try {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      navigate("/login");
      return;
    }

    const user = JSON.parse(storedUser);

    const score = quiz.questions.reduce(
      (total, question, index) => {
        if (
          selectedAnswers[index] ===
          question.correctAnswer
        ) {
          return total + 1;
        }

        return total;
      },
      0
    );

    const response = await fetch(
      "http://localhost:5000/api/attempts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          quizId: quiz._id,
          score,
          totalQuestions: quiz.questions.length,
          answers: selectedAnswers,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to save quiz attempt"
      );
    }

    navigate("/quiz-result", {
      state: {
        quiz,
        selectedAnswers,
        score,
      },
    });
  } catch (error) {
    console.error(
      "Submit quiz error:",
      error.message
    );

    alert("Failed to save quiz result.");
  }
};

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-blue-500" />

          <p className="text-slate-400">
            Loading quiz...
          </p>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold">
            Quiz not found
          </h2>

          <button
            onClick={() => navigate("/quizzes")}
            className="mt-5 rounded-xl bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-700"
          >
            Back to Quizzes
          </button>
        </div>
      </div>
    );
  }

  const question =
    quiz.questions[currentQuestion];

  const progress =
    ((currentQuestion + 1) /
      quiz.questions.length) *
    100;

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Navbar */}
      <nav className="border-b border-slate-800 bg-slate-900">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">

          <div>
            <h1 className="text-xl font-bold">
              {quiz.title}
            </h1>

            <p className="text-sm text-slate-400">
              {quiz.category} • {quiz.difficulty}
            </p>
          </div>

          {/* Timer */}
          <div
            className={`flex items-center gap-2 rounded-xl px-4 py-2 font-semibold ${
              timeLeft <= 60
                ? "bg-red-500/10 text-red-400"
                : "bg-blue-500/10 text-blue-400"
            }`}
          >
            <Clock size={19} />

            {formatTime(timeLeft)}
          </div>

        </div>
      </nav>

      {/* Progress */}
      <div className="mx-auto max-w-5xl px-6 pt-6">

        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-slate-400">
            Question {currentQuestion + 1} of{" "}
            {quiz.questions.length}
          </span>

          <span className="font-medium text-blue-400">
            {Math.round(progress)}%
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-blue-600 transition-all duration-300"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

      </div>

      {/* Question */}
      <main className="mx-auto max-w-5xl px-6 py-10">

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 md:p-10">

          <div className="mb-8">
            <p className="mb-3 text-sm font-medium text-blue-400">
              Question {currentQuestion + 1}
            </p>

            <h2 className="text-2xl font-bold leading-relaxed md:text-3xl">
              {question.question}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-4">

            {question.options.map(
              (option, index) => {
                const isSelected =
                  selectedAnswers[
                    currentQuestion
                  ] === option;

                return (
                  <button
                    key={index}
                    onClick={() =>
                      handleAnswerSelect(
                        option
                      )
                    }
                    className={`flex w-full items-center gap-4 rounded-2xl border p-5 text-left transition ${
                      isSelected
                        ? "border-blue-500 bg-blue-500/10"
                        : "border-slate-700 bg-slate-950 hover:border-slate-500"
                    }`}
                  >

                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border font-semibold ${
                        isSelected
                          ? "border-blue-500 bg-blue-600 text-white"
                          : "border-slate-700 bg-slate-900 text-slate-400"
                      }`}
                    >
                      {String.fromCharCode(
                        65 + index
                      )}
                    </div>

                    <span className="text-slate-200">
                      {option}
                    </span>

                    {isSelected && (
                      <CheckCircle
                        size={20}
                        className="ml-auto text-blue-400"
                      />
                    )}

                  </button>
                );
              }
            )}

          </div>

          {/* Navigation */}
          <div className="mt-10 flex items-center justify-between border-t border-slate-800 pt-6">

            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="flex items-center gap-2 rounded-xl border border-slate-700 px-5 py-3 font-medium transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={19} />
              Previous
            </button>

            {currentQuestion ===
            quiz.questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold transition hover:bg-green-700"
              >
                Submit Quiz
                <CheckCircle size={19} />
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-700"
              >
                Next
                <ChevronRight size={19} />
              </button>
            )}

          </div>

        </div>

      </main>

    </div>
  );
}

export default Quiz;