const shuffleArray = (array) => {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [
      shuffled[j],
      shuffled[i],
    ];
  }

  return shuffled;
};

const cleanText = (text) => {
  return text
    .replace(/\r/g, " ")
    .replace(/\n+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

const splitIntoSentences = (text) => {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(
      (sentence) =>
        sentence.length >= 40 &&
        sentence.length <= 300
    );
};

const generateQuizFromText = (text) => {
  if (!text || !text.trim()) {
    return [];
  }

  const cleanedText = cleanText(text);

  if (cleanedText.length < 100) {
    return [];
  }

  const sentences = splitIntoSentences(cleanedText);

  if (sentences.length < 4) {
    return [];
  }

  const questions = [];

  for (
    let i = 0;
    i < sentences.length && questions.length < 10;
    i++
  ) {
    const sentence = sentences[i];

    /*
      Try to create a question from the sentence.

      Example:
      "Java is an object-oriented programming language."

      Becomes:
      "Which statement is supported by the uploaded document?"
    */

    const correctAnswer = sentence;

    const distractors = [];

    for (let j = 0; j < sentences.length; j++) {
      if (i === j) {
        continue;
      }

      const candidate = sentences[j];

      if (
        candidate.toLowerCase() !==
          correctAnswer.toLowerCase() &&
        candidate.length >= 40 &&
        candidate.length <= 300
      ) {
        distractors.push(candidate);
      }

      if (distractors.length === 3) {
        break;
      }
    }

    if (distractors.length < 3) {
      continue;
    }

    const options = shuffleArray([
      correctAnswer,
      ...distractors,
    ]);

    questions.push({
      question:
        "Which statement is supported by the uploaded document?",

      options,

      correctAnswer,

      explanation:
        "This answer is directly supported by the content extracted from the uploaded PDF.",
    });
  }

  return questions;
};

module.exports = generateQuizFromText;