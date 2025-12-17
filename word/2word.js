"use strict";

// Hanukkah-themed word list
const words = [
  "MENORAH",
  "DREIDEL",
  "LATKES",
  "GELT",
  "HANUKKAH",
  "OIL",
  "CANDLE",
  "SPIN",
  "FESTIVAL",
  "LIGHTS",
];
const gridSize = 10;
let grid = [];
let wordsToFind = [];
let foundWords = [];

// Directions for word placement
const directions = [
  { x: 1, y: 0 }, // right
  { x: 0, y: 1 }, // down
  { x: 1, y: 1 }, // diagonal down-right
  { x: -1, y: 0 }, // left
  { x: 0, y: -1 }, // up
  { x: -1, y: -1 }, // diagonal up-left
];

// Event listener for Play button
document.getElementById("playButton").addEventListener("click", startGame);

function startGame() {
  foundWords = [];
  wordsToFind = [...words];
  grid = createEmptyGrid(gridSize);
  placeWords();
  fillEmptyCells();
  renderGrid();
  renderWordList();
}

// Create empty grid
function createEmptyGrid(size) {
  return Array.from({ length: size }, () => Array(size).fill(""));
}

// Place each word randomly
function placeWords() {
  for (let word of wordsToFind) {
    let placed = false;
    while (!placed) {
      const dir = directions[Math.floor(Math.random() * directions.length)];
      const startX = Math.floor(Math.random() * gridSize);
      const startY = Math.floor(Math.random() * gridSize);
      if (canPlaceWord(word, startX, startY, dir)) {
        for (let i = 0; i < word.length; i++) {
          grid[startY + i * dir.y][startX + i * dir.x] = word[i];
        }
        placed = true;
      }
    }
  }
}

// Ch
