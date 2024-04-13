// "use strict";
// const cardsList = [];
// for (let i = 1; i <= 18; i++) {
//   cardsList.push(`img/photo${i}.jpg`);
// }
// const cardBackSide = "back-img.jpg";
// let flippedCards = []; // відкриті картки
// let guessedPairsCount = 0; // каунтер для відгаданих пар
// let timerInterval; // для сетінтервал
// let gameStarted = false; // флажок початок/кінець гри
// const playerName = "";
// const gameField = document.getElementById("gameField");
// document.addEventListener("DOMContentLoaded", () => {
//   generateCards(16);
//   setDefaultOptions();
// });
// const newGameBtn = document.getElementById("newGameBtn");
// newGameBtn.addEventListener("click", startGame);
// const startGameBtn = document.getElementById("startGameBtn");
// startGameBtn.addEventListener("click", () => {
//   applySelectedOptions();
// });
// function startGame() {
//   gameStarted = true;
//   setDefaultGame();
//   const time = getTimeBasedOnDifficulty();
//   startTimer(time);
// }

// function setDefaultGame() {
//   const guessedPairs = document.getElementById("guessedPairs");
//   guessedPairs.textContent = "0";

//   const timerDisplay = document.getElementById("timer");
//   timerDisplay.textContent = "3:00";

//   clearInterval(timerInterval);
//   flippedCards = [];
// }
// function setDefaultFieldSize() {
//   const fieldSizeSelect = document.getElementById("fieldSize");
//   fieldSizeSelect.value = "4-4";
// }

// function setDefaultLevel() {
//   const levelSelect = document.getElementById("gameLevel");
//   levelSelect.value = "easy";
// }
// function setDefaultOptions() {
//   setDefaultFieldSize(); // Встановлюємо дефолтний розмір поля
//   setDefaultLevel(); // Встановлюємо дефолтний рівень складності
// }
// function applySelectedOptions() {
//   const fieldSize = document.getElementById("fieldSize").value;
//   const level = document.getElementById("gameLevel").value;

//   let cardsNumb;
//   switch (fieldSize) {
//     case "4-4":
//       cardsNumb = 16;
//       break;
//     case "6-6":
//       cardsNumb = 36;
//       gameField.classList.add("field-6x6");
//       break;
//     default:
//       cardsNumb = 16;
//   }
//   let countdownTime;
//   switch (level) {
//     case "easy":
//       countdownTime = 180;
//       break;
//     case "normal":
//       countdownTime = 120;
//       break;
//     case "hard":
//       countdownTime = 60;
//       break;
//     default:
//       countdownTime = 180;
//   }

//   generateCards(cardsNumb);
//   startTimer(countdownTime);
// }
// function resetGame() {
//   gameStarted = false;
//   flippedCards = [];
//   guessedPairsCount = 0;
//   document.getElementById("guessedPairs").textContent = guessedPairsCount;
//   setDefaultGame();
//   generateCards(16);
// }

// function generateCards(cardsNumb) {
//   gameField.innerHTML = "";

//   const shuffledCards = cardsList.sort(() => Math.random() - 0.5); // перемішую картки

//   const selectedCards = shuffledCards.slice(0, cardsNumb / 2); // випадково вибираю 8 карточок

//   const pairs = selectedCards.concat(selectedCards); // додаю кожну картку 2 рази

//   pairs.sort(() => Math.random() - 0.5); // знов тасую картки

//   for (let i = 0; i < pairs.length; i++) {
//     const card = createCard(pairs[i]);
//     gameField.appendChild(card);
//   }
// }

// function createCard(imageUrl) {
//   const card = document.createElement("div");
//   card.classList.add("card");

//   const front = document.createElement("div");
//   front.classList.add("front");
//   front.style.backgroundImage = `url(${imageUrl})`;

//   const back = document.createElement("div");
//   back.classList.add("back");
//   back.style.backgroundImage = `url(${cardBackSide})`;

//   card.appendChild(front);
//   card.appendChild(back);

//   card.addEventListener("click", () => flipCard(card));

//   return card;
// }

// function flipCard(card) {
//   if (
//     !card.classList.contains("flipped") &&
//     gameStarted &&
//     flippedCards.length < 2
//   ) {
//     card.classList.add("flipped");
//     card.querySelector(".front").style.transform = "rotateY(0deg)";
//     card.querySelector(".back").style.transform = "rotateY(180deg)";
//     flippedCards.push(card);
//     if (flippedCards.length === 2) {
//       setTimeout(checkMatch, 1000);
//     }
//   } else if (card.classList.contains("flipped") && gameStarted) {
//     card.classList.remove("flipped");
//     card.querySelector(".front").style.transform = "rotateY(180deg)";
//     card.querySelector(".back").style.transform = "rotateY(0deg)";
//     flippedCards = flippedCards.filter((flippedCard) => flippedCard !== card);
//   }
// }

// function checkMatch() {
//   if (
//     flippedCards[0].querySelector(".front").style.backgroundImage ===
//     flippedCards[1].querySelector(".front").style.backgroundImage
//   ) {
//     flippedCards[0].classList.add("matched");
//     flippedCards[0].style.pointerEvents = "none";
//     flippedCards[1].classList.add("matched");
//     flippedCards[1].style.pointerEvents = "none";
//     flippedCards = [];
//     guessedPairsCount++;
//     document.getElementById("guessedPairs").textContent = guessedPairsCount;
//     if (guessedPairsCount === cardsNumb / 2) {
      
//       alert("Congratulations, you won!");
//       if (gameField.classList.contains('field-6x6')) {
//         gameField.classList.remove('field-6x6');
//       };
//       clearInterval(timerInterval);
//       resetGame();
//     }
//   } else {
//     setTimeout(() => {
//       flippedCards.forEach((card) => {
//         card.classList.remove("flipped");
//         card.querySelector(".front").style.transform = "rotateY(180deg)";
//         card.querySelector(".back").style.transform = "rotateY(0deg)";
//       });
//       flippedCards = [];
//     }, 1000);
//   }
// }

// function startTimer(time) {
//   let seconds = time;
//   const timerDisplay = document.getElementById("timer");
//   timerDisplay.textContent = formatTime(time);

//   timerInterval = setInterval(() => {
//     timerDisplay.textContent = formatTime(seconds);
//     if (seconds <= 0) {
//       clearInterval(timerInterval);
//       alert("Oops..You lose!");
//       resetGame();
//     }
//     seconds--;
//   }, 1000);
// }

// function formatTime(seconds) {
//   const minutes = Math.floor(seconds / 60);
//   const remainderSeconds = seconds % 60;
//   return `${minutes}:${remainderSeconds < 10 ? "0" : ""}${remainderSeconds}`;
// }

// function getTimeBasedOnDifficulty() {
//   const gameLevel = document.getElementById("gameLevel").value;

//   switch (gameLevel) {
//     case "easy":
//       return 180; // 3 хвилини
//     case "normal":
//       return 120; // 2 хвилини
//     case "hard":
//       return 60; // 1 хвилина
//     default:
//       return 180; // За замовчуванням easy
//   }
// }

"use strict";

const cardsList = [];
const cardBackSide = "back-img.jpg";
let flippedCards = []; // відкриті картки
let guessedPairsCount = 0; // каунтер для відгаданих пар
let timerInterval; // для сетінтервал
let gameStarted = false; // флажок початок/кінець гри
const playerName = "";
const gameField = document.getElementById("gameField");

document.addEventListener("DOMContentLoaded", () => {
  setDefaultOptions();
  generateCards(16);
});

const newGameBtn = document.getElementById("newGameBtn");
newGameBtn.addEventListener("click", startNewGame);

const startGameBtn = document.getElementById("startGameBtn");
startGameBtn.addEventListener("click", startGameWithSelectedOptions);

function startNewGame() {
  gameStarted = true;
  setDefaultGame();
  startTimer(180); // 3 хвилини за замовчуванням
}

function startGameWithSelectedOptions() {
  gameStarted = true;
  setDefaultGame();

  const fieldSize = document.getElementById("fieldSize").value;
  const level = document.getElementById("gameLevel").value;

  const cardsNumb = getCardsNumberByFieldSize(fieldSize);
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
  switch (fieldSize) {
    case "4-4":
      return 16;
    case "6-6":
      gameField.classList.add("field-6x6");
      return 36;
    default:
      return 16;
  }
}

function getTimeBasedOnDifficulty(level) {
  switch (level) {
    case "easy":
      return 180; // 3 хвилини
    case "normal":
      return 120; // 2 хвилини
    case "hard":
      return 60; // 1 хвилина
    default:
      return 180; // За замовчуванням easy
  }
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
  gameField.innerHTML = "";

  for (let i = 1; i <= cardsNumb / 2; i++) {
    cardsList.push(`img/photo${i}.jpg`);
  }

  const shuffledCards = cardsList.sort(() => Math.random() - 0.5);
  const pairs = shuffledCards.slice(0, cardsNumb / 2).concat(shuffledCards.slice(0, cardsNumb / 2));
  pairs.sort(() => Math.random() - 0.5);

  for (let i = 0; i < pairs.length; i++) {
    const card = createCard(pairs[i]);
    gameField.appendChild(card);
  }

  cardsList.length = 0; // очищуємо масив
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
    if (guessedPairsCount === cardsList.length / 2) {
      alert("Congratulations, you won!");
      if (gameField.classList.contains('field-6x6')) {
        gameField.classList.remove('field-6x6');
      }
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
    }, 1000);
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