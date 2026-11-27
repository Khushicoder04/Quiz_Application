import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Trophy,
  Target,
  Clock,
  ArrowRight,
  LogOut,
} from "lucide-react";

function Dashboard() {
  const [user, setUser] = useState(null);

const [stats, setStats] = useState({
  quizzesCompleted: 0,
  averageScore: 0,
  bestScore: 0,
});

  const navigate = useNavigate();

  useEffect(() => {
  const storedUser = localStorage.getItem("user");

  if (!storedUser) {
    navigate("/");
    return;
  }

  const loggedInUser = JSON.parse(storedUser);

  setUser(loggedInUser);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/dashboard/${loggedInUser.id}`
      );

      const data = await response.json();

      if (response.ok) {
        setStats(data);
      }
    } catch (error) {
      console.error(
        "Failed to fetch dashboard stats:",
        error
      );
    }
  };

  fetchDashboardStats();
}, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Navbar */}
      <nav className="border-b border-slate-800 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <BookOpen size={22} />
            </div>

            <h1 className="text-2xl font-bold">
              Quiz App
            </h1>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium cursor-pointer transition"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10">

        {/* Welcome Section */}
        <section className="bg-gradient-to-r from-blue-600/20 via-slate-900 to-purple-600/20 border border-slate-800 rounded-3xl p-8 md:p-10 mb-8">

          <div className="max-w-3xl">

            <p className="text-blue-400 font-medium mb-2">
              Welcome back 👋
            </p>

            <h2 className="text-4xl md:text-5xl font-bold">
              {user?.name}
            </h2>

            <p className="text-slate-400 text-lg mt-4">
              Test your knowledge, improve your skills, and track your
              learning progress.
            </p>

            <button
              onClick={() => navigate("/quizzes")}
              className="mt-7 inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold cursor-pointer transition"
            >
              Explore Quizzes
              <ArrowRight size={19} />
            </button>

          </div>

        </section>

        {/* Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-blue-500/50 transition">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-slate-400 text-sm">
                  Quizzes Completed
                </p>

                <h3 className="text-3xl font-bold mt-2">
  {stats.quizzesCompleted}
</h3>
              </div>

              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                <BookOpen size={24} />
              </div>

            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-green-500/50 transition">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-slate-400 text-sm">
                  Average Score
                </p>

                <h3 className="text-3xl font-bold mt-2">
  {stats.averageScore}%
</h3>
              </div>

              <div className="w-12 h-12 rounded-xl bg-green-500/10 text-green-400 flex items-center justify-center">
                <Target size={24} />
              </div>

            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-yellow-500/50 transition">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-slate-400 text-sm">
                  Best Score
                </p>

                <h3 className="text-3xl font-bold mt-2">
  {stats.bestScore}%
</h3>
              </div>

              <div className="w-12 h-12 rounded-xl bg-yellow-500/10 text-yellow-400 flex items-center justify-center">
                <Trophy size={24} />
              </div>

            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-purple-500/50 transition">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-slate-400 text-sm">
                  Time Practiced
                </p>

                <h3 className="text-3xl font-bold mt-2">
                  0h
                </h3>
              </div>

              <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                <Clock size={24} />
              </div>

            </div>
          </div>

        </section>

        {/* Quiz Section */}
<section className="grid grid-cols-1 lg:grid-cols-3 gap-6">

  {/* Quick Quiz */}
  <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-8">

    <div className="flex items-center justify-between mb-6">

      <div>
        <p className="text-blue-400 text-sm font-medium">
          Start Learning
        </p>

        <h3 className="text-2xl font-bold mt-1">
          Explore Quiz Categories
        </h3>
      </div>

      <BookOpen
        size={32}
        className="text-blue-400"
      />

    </div>

    <p className="text-slate-400 leading-relaxed mb-7">
      Choose from DSA, Java, DBMS, Web Development,
      Computer Networks, and OOPs. Select a subject and
      start practicing.
    </p>

    <button
      onClick={() => navigate("/quiz-categories")}
      className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold cursor-pointer transition"
    >
      Explore Categories
      <ArrowRight size={19} />
    </button>

  </div>

  {/* Quick Info */}
  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

    <h3 className="text-xl font-bold mb-6">
      Your Progress
    </h3>

    <div className="space-y-5">

      <div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-slate-400">
            Overall Progress
          </span>

          <span className="text-white font-medium">
            {stats.averageScore}%
          </span>
        </div>

        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-500"
            style={{
              width: `${stats.averageScore}%`,
            }}
          />
        </div>
      </div>

      <div className="pt-4 border-t border-slate-800">
        <p className="text-slate-400 text-sm">
          Keep practicing
        </p>

        <p className="text-white font-medium mt-1">
          Your quiz journey starts here 🚀
        </p>
      </div>

    </div>

  </div>

</section>

      </main>

    </div>
  );
}

export default Dashboard;