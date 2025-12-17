"use strict";

/* =======================
   WORD LIST
======================= */
const wordlist = [
  "celebration",
  "reindeer",
  "snowflakes",
  "decoration",
  "christmas",
  "rudolf",
  "holly",
  "winter",
  "sleigh",
  "santa",
  "eve",
  "fir",
  "joy",
  "toy",
  "elf",
];

/* =======================
   GAME VARIABLES
======================= */
let selectedWord = "";
let displayedWord = "";
let wrongGuesses = 0;
let guessedLetters = [];

const maxMistakes = 6;

/* =======================
   START GAME
======================= */
function startGame(level) {
  resetGameState();

  selectedWord = getRandomWord(level);

  updateDifficultyDisplay(level);

  displayedWord = "_".repeat(selectedWord.length);
  document.getElementById("wordDisplay").textContent = displayedWord
    .split("")
    .join(" ");

  document.getElementById("dificultySelection").classList.add("d-none");
  document.getElementById("gameArea").classList.remove("d-none");
  document.getElementById("difficultyBox").classList.remove("d-none");

  document.getElementById("letterInput").disabled = false;
  document.getElementById("guessBtn").disabled = false;
  document.getElementById("letterInput").focus();
}

/* =======================
   WORD PICKER
======================= */
function getRandomWord(level) {
  let filteredWords = wordlist.filter((word) => {
    if (level === "Easy") return word.length <= 4;
    if (level === "Medium") return word.length >= 5 && word.length <= 7;
    if (level === "Hard") return word.length >= 8;
  });

  return filteredWords[Math.floor(Math.random() * filteredWords.length)];
}

/* =======================
   DIFFICULTY DISPLAY
======================= */
function updateDifficultyDisplay(level) {
  const difficultyBox = document.getElementById("difficultyBox");

  difficultyBox.textContent = level;
  difficultyBox.className = "mt-3 p-3 fw-bold board2";
  difficultyBox.classList.add(level);
}

/* =======================
   GUESS LETTER
======================= */
function guessLetter() {
  const input = document.getElementById("letterInput");
  const guessedLetter = input.value.toLowerCase();

  if (!guessedLetter.match(/^[a-z]$/)) {
    alert("Please enter a valid letter (a-z)");
    input.value = "";
    return;
  }

  if (guessedLetters.includes(guessedLetter)) {
    alert("You already guessed that letter!");
    input.value = "";
    return;
  }

  guessedLetters.push(guessedLetter);

  if (selectedWord.includes(guessedLetter)) {
    correctGuess(guessedLetter);
  } else {
    wrongGuess(guessedLetter);
  }

  input.value = "";
  input.focus();
}

/* =======================
   WRONG GUESS
======================= */
function wrongGuess(letter) {
  sound("sound/wrong.wav");

  wrongGuesses++;

  document.getElementById("wrongLetters").textContent += ` ${letter}`;
  document.getElementById("hangmanFigure").src = `imgs/HM${wrongGuesses}.png`;

  if (wrongGuesses >= maxMistakes) {
    endGame(false);
  }
}

/* =======================
   CORRECT GUESS
======================= */
function correctGuess(letter) {
  sound("sound/right.wav");

  let updatedWord = "";

  for (let i = 0; i < selectedWord.length; i++) {
    updatedWord += selectedWord[i] === letter ? letter : displayedWord[i];
  }

  displayedWord = updatedWord;
  document.getElementById("wordDisplay").textContent = displayedWord
    .split("")
    .join(" ");

  if (!displayedWord.includes("_")) {
    endGame(true);
  }
}

/* =======================
   END GAME
======================= */
function endGame(won) {
  document.getElementById("guessBtn").disabled = true;
  document.getElementById("letterInput").disabled = true;

  if (won) {
    updateGraveyard(true, selectedWord);
    sound("sound/complete.wav");
    alert("🎉 Congrats! You beat Inpossa-man!");
  } else {
    updateGraveyard(false, selectedWord);
    sound("sound/incomplete.wav");
    alert(`💀 You lost! The word was: ${selectedWord}`);
  }
}

/* =======================
   RESET GAME
======================= */
function resetGameState() {
  wrongGuesses = 0;
  guessedLetters = [];
  selectedWord = "";
  displayedWord = "";

  document.getElementById("wordDisplay").textContent = "";
  document.getElementById("wrongLetters").textContent = "Wrong Guesses:";
  document.getElementById("hangmanFigure").src = "imgs/HM1.png";
  document.getElementById("letterInput").value = "";
}

/* =======================
   RESTART BUTTON
======================= */
function restartGame() {
  resetGameState();

  document.getElementById("dificultySelection").classList.remove("d-none");
  document.getElementById("difficultyBox").classList.add("d-none");
  document.getElementById("gameArea").classList.add("d-none");
}

/* =======================
   ENTER KEY SUPPORT
======================= */
document
  .getElementById("letterInput")
  .addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      guessLetter();
    }
  });

/* =======================
   SOUND
======================= */
function sound(url) {
  const audio = new Audio(url);
  audio.play();
}

/* =======================
   GRAVEYARD
======================= */
function updateGraveyard(isCorrect, word) {
  const correctWords = document.getElementById("correctWords");
  const wrongWords = document.getElementById("wrongWords");

  if (isCorrect) {
    correctWords.textContent += word + ", ";
  } else {
    wrongWords.textContent += word + ", ";
  }
}
