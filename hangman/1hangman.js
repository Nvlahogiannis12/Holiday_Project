"use strict";
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

//WEBSITE NEEDST O BE FIXED< YOU CAANT REPLAY WHEN YOU BEAT A LV

//setting ame Variables
let selectedWord = "";
let displayedWord = "";
let wrongGuesses = 0;
let guessedLetters = [];
const maxMistakes = 6;

let lives = maxMistakes;

function startGame(level) {
  selectedWord = getRandomWord(level);

  // Update Difficulty selection bax
  updateDifficultyDisplay(level);

  //create placeholder for the selected word
  displayedWord = "_".repeat(selectedWord.length);
  document.getElementById("wordDisplay").textContent = displayedWord
    .split("")
    .join(" ");

  // hide difficulty selection and show game area
  document.getElementById("dificultySelection").classList.add("d-none");

  document.getElementById("gameArea").classList.remove("d-none");
  document.getElementById("difficultyBox").classList.remove("d-none");

  document.getElementById("gameArea").classList.add("d-block");
  document.getElementById("difficultyBox").classList.add("d-block");
}

function getRandomWord(level) {
  let filteredWords = wordlist.filter((word) => {
    if (level === "Easy") return word.length <= 4; //change the 4 so its longer and change the words shorter than 4
    if (level === "Medium") return word.length >= 5 && word.length <= 7;
    if (level === "Hard") return word.length >= 8;
  });

  return filteredWords[Math.floor(Math.random() * filteredWords.length)];
}

function updateDifficultyDisplay(level) {
  let difficultyBox = document.getElementById("difficultyBox");

  //remove previously difficulty bux
  difficultyBox.classList.remove("Hard", "Insane", "Imposable");

  difficultyBox.textContent = `${
    level.charAt(0).toUpperCase() + level.slice(1)
  }`;

  //Apply CSS style
  difficultyBox.classList.add(level);
}

function guessLetter() {
  let inputField = document.getElementById("letterInput"); //get input field
  let guessedLetter = inputField.value.toLowerCase(); //convert to lower case

  //check if input is valad between lowercase A-Z
  if (!guessedLetter.match(/^[a-z]$/)) {
    alert("Please enter a letter between a-z");
    inputField.value = ""; //clear input field
    return; //exit function
  }

  //check if lettre was already guessed
  if (guessedLetters.includes(guessedLetter)) {
    alert(
      "You already tried this letter! Put another letter you have yet to try!"
    );
    inputField.value = ""; //clear input field
    return; //exit function
  } else {
    //store guessed letter in guessedLetter]
    guessedLetters.push(guessedLetter);
  }

  if (selectedWord.includes(guessedLetter)) {
    correctGuess(guessedLetter);
  } else {
    wrongGuess(guessedLetter);
  }

  inputField.value = ""; //clear input field
  inputField.focus(); // refocuses input feild for next guess
}

function wrongGuess(guessedLetter) {
  // Play sound for wrong guess
  sound("sound/wrong.wav");

  // Increment the number of wrong guesses
  wrongGuesses++;

  // Add the guessed letter to the wrong letters display
  document.getElementById("wrongLetters").textContent += ` ${guessedLetter}`;

  // Update the hangman image based on the number of wrong guesses
  document.getElementById("hangmanFigure").src = `imgs/HM${wrongGuesses}.png`;

  // Check if the number of wrong guesses has reached the maximum number of allowed mistakes (game over)
  if (wrongGuesses === maxMistakes) {
    endGame(false); // If max mistakes are reached, end the game with a loss
  }
}

function correctGuess(guessedLetter) {
  // Play sound for correct guess
  sound("sound/right.wav");

  let newDisplayWord = "";

  // Update displayed word
  for (let i = 0; i < selectedWord.length; i++) {
    if (selectedWord[i] === guessedLetter) {
      newDisplayWord += guessedLetter;
    } else {
      newDisplayWord += displayedWord[i];
    }
  }

  displayedWord = newDisplayWord;
  document.getElementById("wordDisplay").textContent = displayedWord
    .split("")
    .join(" ");

  // Check if the word is fully guessed
  if (!displayedWord.includes("_")) {
    endGame(true); // If the word is completed, end the game with a win
  }
}

function endGame(won) {
  // After game is over, update the Graveyard
  if (won === true) {
    // Update the Graveyard with the correctly guessed word
    updateGraveyard(true, selectedWord);
  } else {
    // Update the Graveyard with the wrong word
    updateGraveyard(false, selectedWord);
  }

  // Display a win or loss message
  if (won === true) {
    setTimeout(() => {
      sound("sound/complete.wav");
      document.getElementById("gameArea").innerHTML = `
                <div style="text-align: center; font-size: 24px; font-weight: bold;">
                    Congrats! You beat Inpossa-man!<br>
                    <button onclick="restartGame()" class="btn difficulty-btn Ez">
                        Play Again
                    </button>
                </div>
            `;
    }, 100);
  } else {
    setTimeout(() => {
      sound("sound/incomplete.wav");
      document.getElementById("gameArea").innerHTML = `
                <div style="text-align: center; font-size: 24px; font-weight: bold;">
                    You lost to Inpossa-man!<br>
                    <img src="imgs/HM6.png" class="img"> <br>
                    <button onclick="restartGame()" class="btn difficulty-btn Ez">
                        Try Again?
                    </button>
                </div>
            `;
    }, 100);
  }
}

// enter btn
document
  .getElementById("letterInput")
  .addEventListener("keydown", function (event) {
    // If Enter key (key code 13 or 'Enter') is pressed, call guessLetter
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent default action (like form submission)
      guessLetter(); // Trigger guessLetter function
    }
  });

function sound(url) {
  let audio = new Audio(url);
  audio.play();
}

function updateGraveyard(isCorrect, word) {
  let correctWords = document.getElementById("correctWords");
  let wrongWords = document.getElementById("wrongWords");

  // Update the correct or wrong word list
  if (isCorrect) {
    correctWords.textContent += word + ", ";
  } else {
    wrongWords.textContent += word + ", ";
  }
}

function restartGame() {
  document.getElementById("dificultySelection").classList.remove("d-none");
  document.getElementById("difficultyBox").classList.add("d-none");
  document.getElementById("gameArea").classList.add("d-none");

  lives = 6;
  wrongGuesses = 0;
  guessedLetters = [];
  selectedWord = "";
  displayedWord = "";

  // document.getElementById('lives').textContent = `Lives: ${lives}`;
  // document.getElementById('wrongLetters').textContent = 'Wrong Guesses:';
  // document.getElementById('victoryText').classList.add('d-none');
  // document.getElementById('lossText').classList.add('d-none');
  // document.getElementById('revealedWord').classList.add('d-none');
  document.getElementById("wordDisplay").textContent = "";
  document.getElementById("letterInput").value = "";
  document.getElementById("guessBtn").disabled = false;
  // updateHealthDisplay();
}
