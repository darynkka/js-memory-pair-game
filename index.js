"use strict";

let cardsList = [];
const cardBackSide = "back-img.jpg";
let flippedCards = []; // відкриті картки
let guessedPairsCount = 0; // каунтер для відгаданих пар
let timerInterval; // для сетінтервал
let gameStarted = false; // флажок початок/кінець гри
let cardsNumb = 16; // по замовчуванню
let totalRounds; // к-сть раундів
let currentRound = 1; // точний раунд
let currentPlayer = 1; // поточний гравець
let player1Name = "";
let player2Name = "";
let player1PairsCount = 0;
let player2PairsCount = 0;

const gameField = document.getElementById("gameField");

document.addEventListener("DOMContentLoaded", () => {
  setDefaultOptions();
  generateCards(cardsNumb);
});

const newGameBtn = document.getElementById("newGameBtn");
newGameBtn.addEventListener("click", startNewGame);

const startGameBtn = document.getElementById("startGameBtn");
startGameBtn.addEventListener("click", startGameWithSelectedOptions);

function startNewGame() {
  gameStarted = true;
  setDefaultGame();
  cardsNumb = 16;
  startTimer(180); // 3 хвилини за замовчуванням
}

function startGameWithSelectedOptions() {
  gameStarted = true;
  setDefaultGame();

  const fieldSize = document.getElementById("fieldSize").value;
  const level = document.getElementById("gameLevel").value;
  // const playerNumb = document.getElementById("playersNumber").value;

  const roundsNumber = document.getElementById("roundsNumber").value;
  totalRounds = parseInt(roundsNumber);

  cardsNumb = getCardsNumberByFieldSize(fieldSize);
  const countdownTime = getTimeBasedOnDifficulty(level);

  generateCards(cardsNumb);
  startTimer(countdownTime);
}

function setDefaultGame() {
  const guessedPairs = document.getElementById("guessedPairs");
  guessedPairs.textContent = "0";

  const timerDisplay = document.getElementById("timer");
  timerDisplay.textContent = "0:00";

  clearInterval(timerInterval);
  flippedCards = [];
}

function setDefaultOptions() {
  setDefaultFieldSize();
  setDefaultLevel();
}

function setDefaultFieldSize() {
  const fieldSizeSelect = document.getElementById("fieldSize");
  fieldSizeSelect.value = "4-4";
}

function setDefaultLevel() {
  const levelSelect = document.getElementById("gameLevel");
  levelSelect.value = "easy";
}

function getCardsNumberByFieldSize(fieldSize) {
  const fieldSizeMap = new Map([
    ["4-4", 16],
    ["6-6", 36],
  ]);

  const cardsNumber = fieldSizeMap.get(fieldSize);

  if (cardsNumber === 36) {
    gameField.classList.add("field-6x6");
  }

  return cardsNumber || 16; // Повертає 16, якщо fieldSize не знайдено в мапі
}

function getTimeBasedOnDifficulty(level) {
  const levelTimeMap = new Map([
    ["easy", 180], // 3 хвилини
    ["normal", 120], // 2 хвилини
    ["hard", 60], // 1 хвилина
  ]);

  return levelTimeMap.get(level) || 180; // Повертає 180, якщо level не знайдено в мапі
}

function resetGame() {
  gameStarted = false;
  flippedCards = [];
  guessedPairsCount = 0;
  document.getElementById("guessedPairs").textContent = guessedPairsCount;
  setDefaultGame();
  generateCards(getCardsNumberByFieldSize("4-4"));
}

function generateCards(cardsNumb) {
  gameField.innerHTML = "";

  for (let i = 1; i <= cardsNumb / 2; i++) {
    cardsList.push(`img/photo${i}.jpg`);
  }

  const shuffledCards = cardsList.sort(() => Math.random() - 0.5);
  const pairs = shuffledCards
    .slice(0, cardsNumb / 2)
    .concat(shuffledCards.slice(0, cardsNumb / 2));
  pairs.sort(() => Math.random() - 0.5);

  for (let i = 0; i < pairs.length; i++) {
    const card = createCard(pairs[i]);
    gameField.appendChild(card);
  }

  cardsList.length = 0;
}

function createCard(imageUrl) {
  const card = document.createElement("div");
  card.classList.add("card");

  const front = document.createElement("div");
  front.classList.add("front");
  front.style.backgroundImage = `url(${imageUrl})`;

  const back = document.createElement("div");
  back.classList.add("back");
  back.style.backgroundImage = `url(${cardBackSide})`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener("click", () => flipCard(card));

  return card;
}

function flipCard(card) {
  if (
    !card.classList.contains("flipped") &&
    gameStarted &&
    flippedCards.length < 2
  ) {
    card.classList.add("flipped");
    card.querySelector(".front").style.transform = "rotateY(0deg)";
    card.querySelector(".back").style.transform = "rotateY(180deg)";
    flippedCards.push(card);
    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 500);
    }
  } else if (card.classList.contains("flipped") && gameStarted) {
    card.classList.remove("flipped");
    card.querySelector(".front").style.transform = "rotateY(180deg)";
    card.querySelector(".back").style.transform = "rotateY(0deg)";
    flippedCards = flippedCards.filter((flippedCard) => flippedCard !== card);
  }
}

function checkMatch() {
  if (guessedPairsCount === cardsNumb / 2) {
    alert("Congratulations, you won!");
  } else {
    if (
      flippedCards[0].querySelector(".front").style.backgroundImage ===
      flippedCards[1].querySelector(".front").style.backgroundImage
    ) {
      flippedCards[0].classList.add("matched");
      flippedCards[0].style.pointerEvents = "none";
      flippedCards[1].classList.add("matched");
      flippedCards[1].style.pointerEvents = "none";
      flippedCards = [];
      guessedPairsCount++;
      document.getElementById("guessedPairs").textContent = guessedPairsCount;
      if (guessedPairsCount === cardsNumb / 2) {
        alert("Congratulations, you won!");
        gameField.classList.remove("field-6x6");
        clearInterval(timerInterval);
        resetGame();
      }
    } else {
      setTimeout(() => {
        flippedCards.forEach((card) => {
          card.classList.remove("flipped");
          card.querySelector(".front").style.transform = "rotateY(180deg)";
          card.querySelector(".back").style.transform = "rotateY(0deg)";
        });
        flippedCards = [];
      }, 500);
    }
  }
}

function startTimer(time) {
  let seconds = time;
  const timerDisplay = document.getElementById("timer");
  timerDisplay.textContent = formatTime(time);

  timerInterval = setInterval(() => {
    timerDisplay.textContent = formatTime(seconds);
    if (seconds <= 0) {
      clearInterval(timerInterval);
      alert("Oops..You lose!");
      resetGame();
    }
    seconds--;
  }, 1000);
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  return `${minutes}:${remainderSeconds < 10 ? "0" : ""}${remainderSeconds}`;
}
