const file = require("./file.json");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askQuestion = (question) =>
  new Promise((resolve) =>
    readline.question(question, (input) => resolve(input))
  );

const generateRandom = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomWord = (file) => file[generateRandom(0, file.length - 1)];

const isValidGuess = (guess, answer, word) => {
  const errors = [
    {
      condition: !/[a-z]/.test(guess),
      message: new Error("please guess a-z"),
    },
    {
      condition: guess.length > 1,
      message: new Error("please write 1 charachter"),
    },
    {
      condition: answer.includes(guess),
      message: new Error("you alread guess this CH"),
    },
    {
      condition: !word.includes(guess),
      message: new Error("wrong guss"),
    },
  ];

  for (let error of errors) if (error.condition) throw error.message;
};

const arangeAnswer = (guess, answer, word) => {
  word.forEach((ch, i) => {
    if (ch === guess) answer[i] = guess;
  });

  console.log(answer.join(""));
};

const isWiner = (answer) => !answer.includes("-");

const main = async () => {
  const word = getRandomWord(file).split("");
  const answer = new Array(word.length).fill("-");

  while (true) {
    const guess = await askQuestion("guess a letter: ");
    try {
      isValidGuess(guess, answer, word);

      arangeAnswer(guess, answer, word);

      if (isWiner(answer)) {
        console.log("you won");
        readline.close();
        return;
      }
    } catch (error) {
      console.error(error.message);
    }
  }
};

main();
