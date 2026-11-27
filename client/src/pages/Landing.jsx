import { ArrowRight, BookOpen, Brain, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="h-screen overflow-hidden bg-slate-950 text-white">

      {/* Navbar */}
      <nav className="h-16 border-b border-slate-800 bg-slate-950">
        <div className="max-w-7xl h-full mx-auto px-6 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-600 flex items-center justify-center">
              <BookOpen size={19} />
            </div>

            <span className="text-xl font-bold">
              QuizApp
            </span>
          </div>

          {/* Login */}
          <button
            onClick={() => navigate("/login")}
            className="px-5 py-2 bg-white text-slate-950 rounded-lg font-semibold hover:bg-slate-200 cursor-pointer transition"
          >
            Login
          </button>

        </div>
      </nav>

      {/* Main */}
      <main className="h-[calc(100vh-64px)] overflow-hidden relative">

        {/* Background Glow */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />

        <div className="absolute bottom-0 -right-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 h-full flex flex-col">

          {/* ================= HERO ================= */}
          <section className="h-[58%] flex items-center">

            <div className="w-full grid lg:grid-cols-2 gap-12 items-center">

              {/* Left Content */}
              <div>

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium mb-4">
                  <Brain size={15} />
                  Smart Learning Platform
                </div>

                <h1 className="text-5xl lg:text-6xl font-bold leading-[1.05]">
                  Test Your Knowledge
                  <span className="block text-purple-400 mt-2">
                    Anytime, Anywhere
                  </span>
                </h1>

                <p className="mt-5 text-base lg:text-lg text-slate-400 leading-relaxed max-w-xl">
                  Take quizzes, track your progress, improve your skills,
                  and challenge yourself with questions designed for better learning.
                </p>

                <div className="flex gap-3 mt-6">

                  <button
                    onClick={() => navigate("/login")}
                    className="flex items-center gap-2 px-7 py-3.5 bg-purple-600 hover:bg-purple-700 rounded-xl font-semibold cursor-pointer transition"
                  >
                    Get Started
                    <ArrowRight size={18} />
                  </button>

                  <button
                    onClick={() => navigate("/login")}
                    className="px-7 py-3.5 border border-slate-700 hover:border-purple-500 rounded-xl font-semibold text-slate-300 hover:text-white cursor-pointer transition"
                  >
                    Explore Quizzes
                  </button>

                </div>

              </div>

              {/* Right Quiz Card */}
              <div className="flex justify-center lg:justify-end">

                <div className="relative w-full max-w-lg">

                  {/* Main Card */}
                  <div className="bg-gradient-to-br from-purple-900/80 via-slate-900 to-slate-900 border border-purple-500/30 rounded-3xl p-8 shadow-2xl">

                    <div className="flex items-center justify-between">

                      <div className="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center">
                        <Trophy
                          size={32}
                          className="text-purple-300"
                        />
                      </div>

                      <div className="px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-semibold">
                        READY
                      </div>

                    </div>

                    <h2 className="text-2xl font-bold mt-6">
                      Your Quiz Journey
                    </h2>

                    <p className="text-slate-400 mt-2">
                      Learn. Practice. Improve.
                    </p>

                    {/* Progress */}
                    <div className="mt-7">

                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-400">
                          Learning Progress
                        </span>

                        <span className="text-purple-300">
                          75%
                        </span>
                      </div>

                      <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full w-3/4 bg-purple-500 rounded-full" />
                      </div>

                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mt-7">

                      <div className="bg-slate-800/70 rounded-2xl p-5">
                        <p className="text-slate-400 text-sm">
                          Quizzes
                        </p>

                        <p className="text-3xl font-bold mt-1">
                          24
                        </p>
                      </div>

                      <div className="bg-slate-800/70 rounded-2xl p-5">
                        <p className="text-slate-400 text-sm">
                          Best Score
                        </p>

                        <p className="text-3xl font-bold mt-1">
                          92%
                        </p>
                      </div>

                    </div>

                  </div>

                  {/* Floating Card */}
                  <div className="absolute -top-5 -right-5 bg-slate-900 border border-slate-700 rounded-2xl px-4 py-3 shadow-xl">

                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                        <Brain
                          size={19}
                          className="text-blue-400"
                        />
                      </div>

                      <div>
                        <p className="text-xs text-slate-400">
                          Smart Quiz
                        </p>

                        <p className="text-sm font-semibold">
                          Keep Learning
                        </p>
                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </section>

          {/* ================= FEATURES ================= */}
          <section className="h-[42%] flex items-center pb-6">

            <div className="w-full grid md:grid-cols-3 gap-5">

              {/* Feature 1 */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 min-h-[155px] hover:border-purple-500/40 transition">

                <BookOpen
                  size={28}
                  className="text-purple-400 mb-4"
                />

                <h3 className="text-lg font-semibold">
                  Practice Anywhere
                </h3>

                <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                  Access quizzes and practice your subjects whenever you want.
                </p>

              </div>

              {/* Feature 2 */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 min-h-[155px] hover:border-blue-500/40 transition">

                <Brain
                  size={28}
                  className="text-blue-400 mb-4"
                />

                <h3 className="text-lg font-semibold">
                  Smart Learning
                </h3>

                <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                  Generate quizzes from your own study material and PDFs.
                </p>

              </div>

              {/* Feature 3 */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 min-h-[155px] hover:border-yellow-500/40 transition">

                <Trophy
                  size={28}
                  className="text-yellow-400 mb-4"
                />

                <h3 className="text-lg font-semibold">
                  Track Progress
                </h3>

                <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                  Monitor your scores, attempts, accuracy, and progress.
                </p>

              </div>

            </div>

          </section>

        </div>

      </main>

    </div>
  );
}

export default Landing;