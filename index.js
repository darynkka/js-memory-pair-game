"use strict";
const cardsList = [];
for (let i = 1; i <= 18; i++) {
    cardsList.push(`img/photo${i}.jpg`);
}
const cardBackSide = 'back-side.jpg';
document.addEventListener("DOMContentLoaded", () => {
  setDefaultGame();
});

function setDefaultGame() {
  const gameField = document.getElementById("gameField");
  const newGameBtn = document.getElementById("newGameBtn");
  const guessedPairs = document.getElementById("guessedPairs");
  const defFieldSize = document.getElementById("fieldSize");
  const defGameLevel = document.getElementById("gameLevel");
  const defPlayersNumber = document.getElementById("playersNumber");
  const defRoundsNumber = document.getElementById("roundsNumber");
  
  generateCards(16);
}


function generateCards(cardsNumb) {
    const gameField = document.getElementById("gameField");
    gameField.innerHTML = '';

    const shuffledCards = cardsList.sort(() => Math.random() - 0.5); // перемішую картки

    const selectedCards = shuffledCards.slice(0, cardsNumb / 2); // випадково вибираю 8 карточок 

    const pairs = selectedCards.concat(selectedCards); // додаю кожну картку 2 рази

    pairs.sort(() => Math.random() - 0.5); // знов тасую картки

    pairs.forEach(imageUrl => { // створюю картки рандомно
        const card = createCard(imageUrl);
        gameField.appendChild(card);
    });
}



function createCard(imageUrl) {
    const card = document.createElement('div');
    card.className = 'card';

    const front = document.createElement('div');
    front.className = 'front';
    front.style.backgroundImage = `url(${imageUrl})`; // сетаю лицьову сторону
    card.appendChild(front);

    const back = document.createElement('div');
    back.className = 'back';
    back.style.backgroundImage = `url(${cardBackSide})`; // сетаю зворотню сторону
    card.appendChild(back);

    card.addEventListener('click', () => flipCard(card, imageUrl));
    
    return card;
}


 
function flipCard(card, imageUrl) {
    const back = card.querySelector('.back');
    const front = card.querySelector('.front');

    if (!card.classList.contains('flipped')) {
        card.classList.add('flipped');
        back.style.backgroundImage = `url(${imageUrl})`;
        front.style.transform = 'rotateY(0deg)'; // повертаю лицьову
    } else {
        card.classList.remove('flipped');
        back.style.backgroundImage = 'none';
        front.style.transform = 'rotateY(180deg)'; // повертаю зворотню
    }
}
