"use strict";

// =======================
// GAME DATA
// =======================
const words = [
  "menorah",
  "dreidel",
  "gelt",
  "hanukkah",
  "latkes",
  "candle",
  "spin",
  "festival",
  "oil",
  "miracle",
  "jewish",
  "celebrate",
  "music",
  "prayers",
  "family",
];

const gridSize = 10;
let gameStarted = false;
let grid = [];
let wordLocations = [];

// =======================
// DOM ELEMENTS
// =======================
const gameContainer = document.getElementById("gameContainer");
const playButton = document.getElementById("playButton");
const restartButton = document.getElementById("restartButton");
const gridElement = document.getElementById("grid");
const wordsElement = document.getElementById("words");

// =======================
// HELPER FUNCTIONS
// =======================
function createEmptyGrid() {
  return Array.from({ length: gridSize }, () => Array(gridSize).fill(""));
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function placeWord(word) {
  let row = randInt(0, gridSize - 1);
  let col = randInt(0, gridSize - word.length);

  for (let i = 0; i < word.length; i++) {
    if (grid[row][col + i] !== "") return false;
  }

  for (let i = 0; i < word.length; i++) {
    grid[row][col + i] = word[i].toUpperCase();
  }

  wordLocations.push({
    word: word.toUpperCase(),
    row,
    col,
    length: word.length,
    found: false,
  });
  return true;
}

function fillEmpty() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      if (grid[r][c] === "") {
        grid[r][c] = alphabet[randInt(0, alphabet.length - 1)];
      }
    }
  }
}

function renderGrid() {
  gridElement.innerHTML = "";
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.textContent = grid[r][c];
      cell.dataset.row = r;
      cell.dataset.col = c;
      cell.addEventListener("click", () => selectCell(cell));
      gridElement.appendChild(cell);
    }
  }
}

function renderWordList() {
  wordsElement.innerHTML = "";
  words.forEach((w) => {
    const li = document.createElement("li");
    li.textContent = w.toUpperCase();
    li.dataset.word = w.toUpperCase();
    wordsElement.appendChild(li);
  });
}

function selectCell(cell) {
  const r = parseInt(cell.dataset.row);
  const c = parseInt(cell.dataset.col);

  let foundWord = false;
  for (let w of wordLocations) {
    if (w.found) continue;
    if (r === w.row && c >= w.col && c < w.col + w.length) {
      cell.classList.add("selected");
      foundWord = true;

      const cells = Array.from(document.querySelectorAll(".cell")).filter(
        (td) =>
          parseInt(td.dataset.row) === w.row &&
          parseInt(td.dataset.col) >= w.col &&
          parseInt(td.dataset.col) < w.col + w.length
      );

      if (cells.every((td) => td.classList.contains("selected"))) {
        w.found = true;
        cells.forEach((td) => td.classList.add("found"));
        alert(`You found: ${w.word}`);

        const li = Array.from(wordsElement.children).find(
          (li) => li.dataset.word === w.word
        );
        if (li) li.classList.add("found");
      }
    }
  }

  if (!foundWord) cell.style.backgroundColor = "#ccc";

  if (wordLocations.every((w) => w.found)) {
    setTimeout(() => alert("🎉 You found all Hanukkah words!"), 100);
  }
}

// =======================
// START & RESTART
// =======================
function startGame() {
  gameStarted = true;
  playButton.style.display = "none";
  gameContainer.classList.remove("hidden");

  grid = createEmptyGrid();
  wordLocations = [];

  for (let word of words) {
    let placed = false;
    let attempts = 0;
    while (!placed && attempts < 50) {
      placed = placeWord(word);
      attempts++;
    }
  }

  fillEmpty();
  renderGrid();
  renderWordList();
}

function restartGame() {
  gameStarted = false;
  playButton.style.display = "inline-block";
  gameContainer.classList.add("hidden");
  gridElement.innerHTML = "";
  wordsElement.innerHTML = "";
}

// =======================
// EVENT LISTENERS
// =======================
playButton.addEventListener("click", startGame);
restartButton.addEventListener("click", restartGame);
