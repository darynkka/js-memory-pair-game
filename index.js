"use strict";
const cardsList = [];
for (let i = 1; i <= 18; i++) {
  cardsList.push(`img/photo${i}.jpg`);
}
const cardBackSide = "back-side.jpg";
let flippedCards = []; // відкриті картки
let guessedPairsCount = 0; // каунтер для відгаданих пар
let timerInterval; // для сетінтервал
let gameStarted = false; // флажок початок/кінець гри
const playerName = "";
document.addEventListener("DOMContentLoaded", () => {
  generateCards(16);
});
const newGameBtn = document.getElementById("newGameBtn");
newGameBtn.addEventListener("click", startGame);

function startGame() {
  gameStarted = true;
  setDefaultGame();
  startTimer();
}

function setDefaultGame() {
  const guessedPairs = document.getElementById("guessedPairs");
  guessedPairs.textContent = "0";

  const timerDisplay = document.getElementById("timer");
  timerDisplay.textContent = "3:00";

  clearInterval(timerInterval);
  flippedCards = [];
}

function resetGame() {
  gameStarted = false;
  flippedCards = [];
  guessedPairsCount = 0;
  document.getElementById("guessedPairs").textContent = guessedPairsCount;
  setDefaultGame();
  generateCards(16);
}

function generateCards(cardsNumb) {
  const gameField = document.getElementById("gameField");
  gameField.innerHTML = "";

  const shuffledCards = cardsList.sort(() => Math.random() - 0.5); // перемішую картки

  const selectedCards = shuffledCards.slice(0, cardsNumb / 2); // випадково вибираю 8 карточок

  const pairs = selectedCards.concat(selectedCards); // додаю кожну картку 2 рази

  pairs.sort(() => Math.random() - 0.5); // знов тасую картки

  for (let i = 0; i < pairs.length; i++) {
    const card = createCard(pairs[i]);
    gameField.appendChild(card);
  }
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
      setTimeout(checkMatch, 1000);
    }
  } else if (card.classList.contains("flipped") && gameStarted) {
    card.classList.remove("flipped");
    card.querySelector(".front").style.transform = "rotateY(180deg)";
    card.querySelector(".back").style.transform = "rotateY(0deg)";
    flippedCards = flippedCards.filter((flippedCard) => flippedCard !== card);
  }
}

function checkMatch() {
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
    if (guessedPairsCount === 8) {
      clearInterval(timerInterval);
      alert("Вітаємо! Ви вгадали всі пари! Гра завершена.");
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
    }, 1000);
  }
}

function startTimer() {
  let seconds = 180; // 3 хвилини
  const timerDisplay = document.getElementById("timer");
  timerInterval = setInterval(() => {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    timerDisplay.textContent = `${minutes}:${
      remainderSeconds < 10 ? "0" : ""
    }${remainderSeconds}`;
    if (seconds <= 0) {
      clearInterval(timerInterval);
      alert("Час вичерпано! Гра завершена.");
      resetGame();
    }
    seconds--;
  }, 1000);
}
