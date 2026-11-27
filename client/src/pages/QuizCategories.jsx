import { useNavigate } from "react-router-dom";
import {
  Code2,
  Coffee,
  Database,
  Globe,
  Network,
  Braces,
  FileText,
  ArrowRight,
} from "lucide-react";

function QuizCategories() {
  const navigate = useNavigate();

  const categories = [
    {
      title: "DSA",
      description:
        "Practice data structures and algorithms.",
      icon: Code2,
    },
    {
      title: "Java",
      description:
        "Test your Java programming fundamentals.",
      icon: Coffee,
    },
    {
      title: "DBMS",
      description:
        "Improve your database management knowledge.",
      icon: Database,
    },
    {
      title: "Web Development",
      description:
        "Practice HTML, CSS, JavaScript and web concepts.",
      icon: Globe,
    },
    {
      title: "Computer Networks",
      description:
        "Test your networking and communication concepts.",
      icon: Network,
    },
    {
      title: "OOPs",
      description:
        "Strengthen your object-oriented programming concepts.",
      icon: Braces,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Navbar */}
      <nav className="border-b border-slate-800 bg-slate-900">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
              <Code2 size={22} />
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
            Explore Subjects
          </p>

          <h2 className="text-4xl font-bold">
            Choose a Category
          </h2>

          <p className="mt-3 max-w-2xl text-slate-400">
            Pick a subject and start testing your
            knowledge.
          </p>
        </div>

        {/* Categories */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <div
                key={category.title}
                className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-500/50"
              >

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400 transition group-hover:bg-blue-500/20">
                  <Icon size={28} />
                </div>

                <h3 className="mt-5 text-xl font-bold">
                  {category.title}
                </h3>

                <p className="mt-2 min-h-[48px] text-sm leading-relaxed text-slate-400">
                  {category.description}
                </p>

                <button
                  onClick={() => navigate("/quizzes")}
                  className="mt-6 flex items-center gap-2 font-semibold text-blue-400 transition hover:text-blue-300"
                >
                  View Quizzes
                  <ArrowRight size={18} />
                </button>

              </div>
            );
          })}

        </div>

        {/* PDF Generator */}
        <div
          onClick={() => navigate("/pdf-quiz")}
          className="mt-8 cursor-pointer rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 p-6 transition hover:border-indigo-500/60"
        >
          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10">
              <FileText
                size={24}
                className="text-indigo-400"
              />
            </div>

            <div className="flex-1">
              <h3 className="font-bold">
                Generate Quiz from PDF
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                Upload any PDF and create a quiz from
                its content.
              </p>
            </div>

            <ArrowRight
              size={20}
              className="text-indigo-400"
            />

          </div>
        </div>

      </main>

    </div>
  );
}

export default QuizCategories;