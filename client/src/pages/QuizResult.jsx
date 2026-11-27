import { useLocation, useNavigate } from "react-router-dom";
import {
  Trophy,
  CheckCircle,
  XCircle,
  ArrowLeft,
  RotateCcw,
} from "lucide-react";

function QuizResult() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    quiz,
    selectedAnswers,
    score,
  } = location.state || {};

  if (!quiz) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold">
            Result not available
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

  const totalQuestions = quiz.questions.length;

  const percentage = Math.round(
    (score / totalQuestions) * 100
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Navbar */}
      <nav className="border-b border-slate-800 bg-slate-900">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">

          <h1 className="text-xl font-bold">
            Quiz Result
          </h1>

          <button
            onClick={() => navigate("/quizzes")}
            className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white"
          >
            <ArrowLeft size={18} />
            Quizzes
          </button>

        </div>
      </nav>

      <main className="mx-auto max-w-5xl px-6 py-10">

        {/* Result Card */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center md:p-10">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-yellow-500/10">
            <Trophy
              size={40}
              className="text-yellow-400"
            />
          </div>

          <p className="mt-6 text-sm font-medium text-blue-400">
            {quiz.title}
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            Quiz Completed 🎉
          </h2>

          <p className="mt-3 text-slate-400">
            Here is your final result.
          </p>

          {/* Score */}
          <div className="mx-auto mt-8 max-w-md rounded-2xl border border-slate-700 bg-slate-950 p-6">

            <p className="text-sm text-slate-400">
              Your Score
            </p>

            <p className="mt-2 text-5xl font-bold text-blue-400">
              {score}/{totalQuestions}
            </p>

            <p className="mt-2 text-lg font-semibold">
              {percentage}%
            </p>

          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

            <button
              onClick={() =>
                navigate(`/quiz/${quiz._id}`)
              }
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700"
            >
              <RotateCcw size={18} />
              Try Again
            </button>

            <button
              onClick={() => navigate("/quizzes")}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 px-6 py-3 font-semibold hover:bg-slate-800"
            >
              <ArrowLeft size={18} />
              All Quizzes
            </button>

          </div>

        </div>

        {/* Answer Review */}
        <div className="mt-8">

          <h3 className="mb-5 text-2xl font-bold">
            Review Answers
          </h3>

          <div className="space-y-5">

            {quiz.questions.map(
              (question, index) => {

                const selectedAnswer =
                  selectedAnswers[index];

                const isCorrect =
                  selectedAnswer ===
                  question.correctAnswer;

                return (
                  <div
                    key={index}
                    className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
                  >

                    <div className="flex items-start gap-3">

                      {isCorrect ? (
                        <CheckCircle
                          size={22}
                          className="mt-1 shrink-0 text-green-400"
                        />
                      ) : (
                        <XCircle
                          size={22}
                          className="mt-1 shrink-0 text-red-400"
                        />
                      )}

                      <div className="flex-1">

                        <p className="font-semibold leading-relaxed">
                          {index + 1}.{" "}
                          {question.question}
                        </p>

                        {/* Selected Answer */}
                        <div className="mt-4">
                          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                            Your Answer
                          </p>

                          <p
                            className={`mt-1 ${
                              isCorrect
                                ? "text-green-400"
                                : "text-red-400"
                            }`}
                          >
                            {selectedAnswer ||
                              "Not answered"}
                          </p>
                        </div>

                        {/* Correct Answer */}
                        {!isCorrect && (
                          <div className="mt-3">
                            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                              Correct Answer
                            </p>

                            <p className="mt-1 text-green-400">
                              {question.correctAnswer}
                            </p>
                          </div>
                        )}

                        {/* Explanation */}
                        <div className="mt-4 rounded-xl bg-slate-950 p-4">
                          <p className="text-xs font-medium uppercase tracking-wide text-blue-400">
                            Explanation
                          </p>

                          <p className="mt-2 text-sm leading-relaxed text-slate-400">
                            {question.explanation}
                          </p>
                        </div>

                      </div>

                    </div>

                  </div>
                );
              }
            )}

          </div>

        </div>

      </main>

    </div>
  );
}

export default QuizResult;