'use strict'

let cardsList = [];
const cardBackSide = "back-img.jpg";
let flippedCards = [];
let guessedPairsCount = 0;
let timerInterval;
let gameStarted = false;
let cardsNumb = 16;
let totalRounds;
let currentRound = 1;
let currentPlayer = 1;
let player1Name = "";
let player2Name = "";
let player1PairsCount = 0;
let player2PairsCount = 0;
let startTime;

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
  startTime = new Date();
  startTimer(180, startTime);
  updateScores();
}

function startGameWithSelectedOptions() {
  gameStarted = true;

  const fieldSize = document.getElementById("fieldSize").value;
  const level = document.getElementById("gameLevel").value;
  const playerMode = document.getElementById("playersNumber").value;

  if (playerMode === "2") {
    player1Name = prompt("Enter name for the first player", "player 1");
    player2Name = prompt("Enter name for the second player", "player 2");
    document.getElementById(
      "player1Score"
    ).textContent = `${player1Name}: ${player1PairsCount}`;
    document.getElementById(
      "player2Score"
    ).textContent = `${player2Name}: ${player2PairsCount}`;
    document.getElementById("player1Score").style.display = "block";
    document.getElementById("player2Score").style.display = "block";
    document.querySelector(".current-score").style.display = "none";
    multiplePlayerMode();
    updateScores();
  } else {
    setDefaultGame();
    document.querySelector(".current-score").style.display = "block";
    document.getElementById("player1Score").style.display = "none";
    document.getElementById("player2Score").style.display = "none";
    updateScores();
  }

  cardsNumb = getCardsNumberByFieldSize(fieldSize);
  const countdownTime = getTimeBasedOnDifficulty(level);
  startTime = new Date();
  generateCards(cardsNumb);
  startTimer(countdownTime, startTime);
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
  } else {
    gameField.classList.remove("field-6x6");
  }

  return cardsNumber || 16;
}

function getTimeBasedOnDifficulty(level) {
  const levelTimeMap = new Map([
    ["easy", 180],
    ["normal", 120],
    ["hard", 60],
  ]);

  return levelTimeMap.get(level) || 180;
}

function resetGame() {
  gameStarted = false;
  flippedCards = [];
  guessedPairsCount = 0;
  player1PairsCount = 0;
  player2PairsCount = 0;
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

  if (document.getElementById("playersNumber").value === "2") {
    const playerColor = currentPlayer === 1 ? "orange" : "purple";
    card.querySelector(".front").style.boxShadow = `0 0 20px ${playerColor}`;
  }
  updateScores();
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
      updateScores();
      if (
        guessedPairsCount === cardsNumb / 2 &&
        document.getElementById("playersNumber").value === "1"
      ) {
        alert("Congratulations, you won!");
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

        if (document.getElementById("playersNumber").value === "2") {
          currentPlayer = currentPlayer === 1 ? 2 : 1;
        }
      }, 500);
    }
  }
}

function startTimer(time, startTime) {
  let seconds = time;
  const timerDisplay = document.getElementById("timer");
  timerDisplay.textContent = formatTime(time);

  timerInterval = setInterval(() => {
    const currentTime = new Date();
    const elapsedTime = currentTime - startTime;
    const remainingTime = time - Math.floor(elapsedTime / 1000);
    timerDisplay.textContent = formatTime(remainingTime);

    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      const endTime = new Date();
      const elapsedTime = calculateElapsedTime(startTime, endTime);
      alert(`Oops..You lose!\nElapsed Time: ${elapsedTime}`);
      resetGame();
    }
  }, 1000);
}

function calculateElapsedTime(startTime, endTime) {
  const elapsedTimeInSeconds = (endTime - startTime) / 1000;
  const minutes = Math.floor(elapsedTimeInSeconds / 60);
  const seconds = Math.floor(elapsedTimeInSeconds % 60);
  return `${minutes} minutes ${seconds} seconds`;
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  return `${minutes}:${remainderSeconds < 10 ? "0" : ""}${remainderSeconds}`;
}

function multiplePlayerMode() {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    const boxShadow =
      currentPlayer === 1 ? "0 0 10px orange" : "0 0 10px purple";
    card.style.boxShadow = boxShadow;

    card.addEventListener("click", () => {
      if (gameStarted && flippedCards.length < 2) {
        flipCard(card);
        updateScores();
        if (flippedCards.length === 2) {
          setTimeout(() => {
            currentPlayer = currentPlayer === 1 ? 2 : 1;
            cards.forEach((card) => {
              const boxShadow =
                currentPlayer === 1 ? "0 0 10px orange" : "0 0 10px purple";
              card.style.boxShadow = boxShadow;
            });
          }, 500); 
        }
      }
    });
  });
}

function updateScores() {
  if (document.getElementById("playersNumber").value === "2") {
    if (flippedCards.length === 2) {
      if (
        flippedCards[0].querySelector(".front").style.backgroundImage ===
        flippedCards[1].querySelector(".front").style.backgroundImage
      ) {
        if (currentPlayer === 1) {
          player1PairsCount++;
          document.getElementById(
            "player1Score"
          ).textContent = `${player1Name}: ${player1PairsCount}`;
        } else {
          player2PairsCount++;
          document.getElementById(
            "player2Score"
          ).textContent = `${player2Name}: ${player2PairsCount}`;
        }
      }
    }

    const totalPairs = cardsNumb / 2;
    const targetScore = totalPairs / 2;

    if (player1PairsCount + player2PairsCount === totalPairs) {
      if (player1PairsCount > player2PairsCount) {
        const endTime = new Date();
        const elapsedTime = calculateElapsedTime(startTime, endTime);
        alert(`${player1Name} is the winner!\nElapsed Time: ${elapsedTime}`);
        resetGame();
        document.getElementById("player1Score").style.display = "none";
        document.getElementById("player2Score").style.display = "none";
        document.querySelector(".current-score").style.display = "block";
      } else if (player1PairsCount < player2PairsCount) {
        const endTime = new Date();
        const elapsedTime = calculateElapsedTime(startTime, endTime);
        alert(`${player2Name} is the winner!\nElapsed Time: ${elapsedTime}`);
        resetGame();
        document.getElementById("player1Score").style.display = "none";
        document.getElementById("player2Score").style.display = "none";
        document.querySelector(".current-score").style.display = "block";
      } else {
        alert("It's a tie!");
        resetGame();
        document.getElementById("player1Score").style.display = "none";
        document.getElementById("player2Score").style.display = "none";
        document.querySelector(".current-score").style.display = "block";
      }
    }
  } else {
    if (flippedCards.length === 2) {
      if (
        flippedCards[0].querySelector(".front").style.backgroundImage ===
        flippedCards[1].querySelector(".front").style.backgroundImage
      ) {
        guessedPairsCount++;
        document.getElementById("guessedPairs").textContent = guessedPairsCount;
      }
    }

    if (guessedPairsCount === cardsNumb / 2) {
      const endTime = new Date();
      const elapsedTime = calculateElapsedTime(startTime, endTime);
      alert(`Congratulations, you won!\nElapsed Time: ${elapsedTime}`);
      clearInterval(timerInterval);
      resetGame();
    }
  }
}
