const API_BASE_URL = "http://localhost:5000/api";

export const loginUser = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
};

export const signupUser = async (name, email, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Signup failed");
  }

  return data;
};

export const getQuizzes = async () => {
  const response = await fetch(`${API_BASE_URL}/quizzes`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch quizzes");
  }

  return data;
};

export const getQuizById = async (quizId) => {
  const response = await fetch(`${API_BASE_URL}/quizzes/${quizId}`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch quiz");
  }

  return data;
};