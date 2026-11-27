import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import PDFQuiz from "./pages/PDFQuiz";
import Quizzes from "./pages/Quizzes";
import Quiz from "./pages/Quiz";
import QuizResult from "./pages/QuizResult";
import QuizCategories from "./pages/QuizCategories";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Landing Page */}
        <Route
          path="/"
          element={<Landing />}
        />

        {/* Authentication */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* AI PDF Quiz */}
        <Route
          path="/pdf-quiz"
          element={<PDFQuiz />}
        />

        <Route
  path="/quizzes"
  element={<Quizzes />}
/>
<Route
  path="/quiz/:id"
  element={<Quiz />}
/>

<Route
  path="/quiz-result"
  element={<QuizResult />}
/>

<Route
  path="/quiz-categories"
  element={<QuizCategories />}
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;