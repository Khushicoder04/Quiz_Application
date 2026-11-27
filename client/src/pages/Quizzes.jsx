import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  ArrowRight,
  FileText,
  Loader2,
} from "lucide-react";

function Quizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/quizzes"
        );

        const data = await response.json();

        if (response.ok) {
          setQuizzes(data);
        }
      } catch (error) {
        console.error(
          "Failed to fetch quizzes:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Navbar */}
      <nav className="border-b border-slate-800 bg-slate-900">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
              <BookOpen size={22} />
            </div>

            <h1 className="text-2xl font-bold">
              Quiz App
            </h1>
          </div>

          <button
            onClick={() => navigate("/dashboard")}
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
          >
            Dashboard
          </button>

        </div>
      </nav>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-6 py-10">

        {/* Header */}
        <div className="mb-10">
          <p className="mb-2 text-sm font-medium text-blue-400">
            Test Your Knowledge
          </p>

          <h2 className="text-4xl font-bold">
            Choose Your Quiz
          </h2>

          <p className="mt-3 max-w-2xl text-slate-400">
            Select a quiz, test your knowledge, and
            improve your score with every attempt.
          </p>
        </div>

        {/* PDF Quiz */}
        <div
          onClick={() => navigate("/pdf-quiz")}
          className="mb-8 cursor-pointer rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-600/15 to-purple-600/10 p-7 transition hover:-translate-y-1 hover:border-indigo-500/60"
        >
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/10">
                <FileText
                  size={28}
                  className="text-indigo-400"
                />
              </div>

              <div>
                <h3 className="text-xl font-bold">
                  AI PDF Quiz Generator
                </h3>

                <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-400">
                  Upload any PDF and generate quiz
                  questions from its content automatically.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-indigo-400">
              Generate Quiz
              <ArrowRight size={18} />
            </div>

          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-16">
            <Loader2
              size={32}
              className="animate-spin text-blue-400"
            />
          </div>
        )}

        {/* No quizzes */}
        {!loading && quizzes.length === 0 && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center">
            <BookOpen
              size={40}
              className="mx-auto mb-4 text-slate-600"
            />

            <h3 className="text-xl font-semibold">
              No quizzes available
            </h3>

            <p className="mt-2 text-slate-400">
              There are no standard quizzes available
              right now.
            </p>
          </div>
        )}

        {/* Quiz Cards */}
        {!loading && quizzes.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {quizzes.map((quiz) => (
              <div
                key={quiz._id}
                className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-500/50"
              >

                <div className="mb-5 flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
                    <BookOpen
                      size={24}
                      className="text-blue-400"
                    />
                  </div>

                  <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
                    {quiz.difficulty}
                  </span>
                </div>

                <h3 className="text-xl font-bold">
                  {quiz.title}
                </h3>

                <p className="mt-2 text-sm text-slate-400">
                  Category: {quiz.category}
                </p>

                <button
                  onClick={() =>
                    navigate(`/quiz/${quiz._id}`)
                  }
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-semibold transition hover:bg-blue-700"
                >
                  Start Quiz
                  <ArrowRight size={18} />
                </button>

              </div>
            ))}

          </div>
        )}

      </main>

    </div>
  );
}

export default Quizzes;