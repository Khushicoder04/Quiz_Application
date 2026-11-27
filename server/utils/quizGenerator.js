const generateQuizFromText = (text) => {
  if (!text || !text.trim()) {
    return [];
  }

  const blocks = extractQuestionBlocks(text);

  if (blocks.length === 0) {
    return [];
  }

  const questions = [];

  for (const block of blocks) {
    if (questions.length >= 10) {
      break;
    }

    const question = buildQuestion(
      block,
      blocks
    );

    if (question) {
      questions.push(question);
    }
  }

  return questions;
};


/*
  ----------------------------------------------------
  STEP 1: EXTRACT QUESTION + ANSWER BLOCKS
  ----------------------------------------------------
*/

const extractQuestionBlocks = (text) => {
  const lines = text
    .replace(/\r/g, "")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const blocks = [];

  let currentQuestion = null;
  let collectingAnswer = false;
  let answerLines = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    /*
      Detect a real question.

      Example:
      1. What is Cloud Computing?
      2. What are the main characteristics?
    */

    const questionMatch =
      line.match(/^(\d{1,3})\.\s+(.+\?)$/);

    if (questionMatch) {
      /*
        Save previous question first.
      */
      if (
        currentQuestion &&
        answerLines.length > 0
      ) {
        saveBlock(
          blocks,
          currentQuestion,
          answerLines
        );
      }

      currentQuestion = {
        number: Number(questionMatch[1]),
        question:
          questionMatch[2].trim(),
      };

      answerLines = [];
      collectingAnswer = false;

      continue;
    }

    /*
      Detect the Answer: line.
    */

    if (
      /^Answer\s*:\s*$/i.test(line)
    ) {
      if (currentQuestion) {
        collectingAnswer = true;
      }

      continue;
    }

    /*
      Everything after Answer:
      belongs to the current answer.
    */

    if (
      currentQuestion &&
      collectingAnswer
    ) {
      /*
        Ignore page markers.
      */

      if (
        /^--\s*\d+\s+of\s+\d+\s*--$/i.test(
          line
        )
      ) {
        continue;
      }

      answerLines.push(line);
    }
  }

  /*
    Save the final question.
  */

  if (
    currentQuestion &&
    answerLines.length > 0
  ) {
    saveBlock(
      blocks,
      currentQuestion,
      answerLines
    );
  }

  return blocks;
};


/*
  Save one question block.
*/
const saveBlock = (
  blocks,
  question,
  answerLines
) => {
  const answer =
    answerLines
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();

  if (
    answer.length < 20
  ) {
    return;
  }

  blocks.push({
    number: question.number,
    question: cleanQuestion(
      question.question
    ),
    answer,
  });
};


/*
  ----------------------------------------------------
  STEP 2: BUILD MCQ
  ----------------------------------------------------
*/

const buildQuestion = (
  block,
  allBlocks
) => {
  const answer = block.answer;

  /*
    First try to detect a list-based answer.

    Example:

    Public Cloud
    Private Cloud
    Hybrid Cloud
    Community Cloud
  */

  const listItems =
    extractConceptList(answer);

  if (
    listItems.length >= 4
  ) {
    return createListMCQ(
      block,
      listItems
    );
  }

  /*
    Otherwise create a definition
    or factual question.
  */

  const correctAnswer =
    extractMainAnswer(answer);

  if (!correctAnswer) {
    return null;
  }

  const distractors =
    createDistractors(
      block,
      correctAnswer,
      allBlocks
    );

  if (
    distractors.length < 3
  ) {
    return null;
  }

  const options = [
    correctAnswer,
    ...distractors,
  ];

  shuffleArray(options);

  return {
    question:
      block.question,

    options,

    correctAnswer,

    explanation:
      answer,
  };
};


/*
  ----------------------------------------------------
  LIST-BASED MCQ
  ----------------------------------------------------
*/

const createListMCQ = (
  block,
  listItems
) => {
  /*
    For list answers, the question is
    usually asking for a category/model/type.

    Example:
    What are the deployment models?

    Options:
    Public Cloud
    Private Cloud
    Hybrid Cloud
    Community Cloud

    We cannot make one of these the
    correct answer for "what are the models?"

    Therefore we create a question asking
    which item belongs to the list.
  */

  const correctAnswer =
    listItems[0];

  const options =
    [...listItems];

  shuffleArray(options);

  return {
    question:
      `Which of the following is mentioned in the document regarding "${block.question}"`,

    options,

    correctAnswer,

    explanation:
      block.answer,
  };
};


/*
  ----------------------------------------------------
  EXTRACT CONCEPT LIST
  ----------------------------------------------------
*/

const extractConceptList = (
  answer
) => {
  const items = [];

  /*
    Match numbered items.

    Example:
    1. Public Cloud
    2. Private Cloud
    3. Hybrid Cloud
    4. Community Cloud
  */

  const numbered =
    answer.match(
      /(?:^|\s)\d+\.\s*([^.!?]+?)(?=\s+\d+\.\s*|$)/g
    );

  if (numbered) {
    for (
      const item of numbered
    ) {
      const cleaned =
        item
          .replace(
            /^\s*\d+\.\s*/,
            ""
          )
          .trim();

      /*
        Remove explanation after
        an en dash.

        Example:
        Public Cloud – Cloud infrastructure...
        becomes:
        Public Cloud
      */

      const short =
        cleaned
          .split(/\s+[–-]\s+/)[0]
          .trim();

      if (
        short.length >= 3 &&
        short.length <= 80
      ) {
        items.push(short);
      }
    }
  }

  /*
    Remove duplicates.
  */

  return [
    ...new Set(items),
  ].slice(0, 4);
};


/*
  ----------------------------------------------------
  EXTRACT MAIN ANSWER
  ----------------------------------------------------
*/

const extractMainAnswer = (
  answer
) => {
  let result =
    answer.trim();

  /*
    Remove introductory phrases
    that are not actual answers.
  */

  result =
    result.replace(
      /^The major characteristics are:\s*/i,
      ""
    );

  result =
    result.replace(
      /^There are four commonly discussed deployment models:\s*/i,
      ""
    );

  result =
    result.replace(
      /^The major cloud service models are:\s*/i,
      ""
    );

  /*
    For definition questions,
    use the first complete sentence.
  */

  const sentences =
    result.split(
      /(?<=[.!?])\s+/
    );

  if (
    sentences.length > 0
  ) {
    const first =
      sentences[0].trim();

    if (
      first.length >= 25
    ) {
      result = first;
    }
  }

  /*
    Remove examples from
    the option.
  */

  result =
    result.replace(
      /\s+Examples?\s*:.*$/i,
      ""
    );

  /*
    Remove bullet/list content
    if it follows the main definition.
  */

  result =
    result.replace(
      /\s+\d+\.\s+.*$/i,
      ""
    );

  result =
    result
      .replace(
        /\s+/g,
        " "
      )
      .trim();

  if (
    result.length > 180
  ) {
    result =
      result
        .substring(
          0,
          177
        )
        .trim() +
      "...";
  }

  return result;
};


/*
  ----------------------------------------------------
  CREATE DISTRACTORS
  ----------------------------------------------------
*/

const createDistractors = (
  currentBlock,
  correctAnswer,
  allBlocks
) => {
  const distractors = [];

  for (
    const block of allBlocks
  ) {
    if (
      block.number ===
      currentBlock.number
    ) {
      continue;
    }

    let candidate =
      extractMainAnswer(
        block.answer
      );

    if (!candidate) {
      continue;
    }

    /*
      Skip the same answer.
    */

    if (
      candidate.toLowerCase() ===
      correctAnswer.toLowerCase()
    ) {
      continue;
    }

    /*
      Skip very short fragments.
    */

    if (
      candidate.length < 25
    ) {
      continue;
    }

    /*
      Avoid duplicates.
    */

    const exists =
      distractors.some(
        (item) =>
          item.toLowerCase() ===
          candidate.toLowerCase()
      );

    if (exists) {
      continue;
    }

    distractors.push(
      candidate
    );

    if (
      distractors.length === 3
    ) {
      break;
    }
  }

  return distractors;
};


/*
  ----------------------------------------------------
  CLEAN QUESTION
  ----------------------------------------------------
*/

const cleanQuestion = (
  question
) => {
  return question
    .replace(
      /^Question\s*:\s*/i,
      ""
    )
    .replace(
      /^Q\s*:\s*/i,
      ""
    )
    .replace(
      /\s+/g,
      " "
    )
    .trim();
};


/*
  ----------------------------------------------------
  SHUFFLE
  ----------------------------------------------------
*/

const shuffleArray = (
  array
) => {
  for (
    let i =
      array.length - 1;
    i > 0;
    i--
  ) {
    const j =
      Math.floor(
        Math.random() *
          (i + 1)
      );

    [
      array[i],
      array[j],
    ] = [
      array[j],
      array[i],
    ];
  }

  return array;
};


module.exports =
  generateQuizFromText;