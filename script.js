'use strict';

//Selections & Pre-definitions
const btnNewGame = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const turn_0 = document.querySelector('.player--0'); 
const turn_1 = document.querySelector('.player--1'); 
const name_0 = document.querySelector('#name--0');
const name_1 = document.querySelector('#name--1');
const score_0 = document.querySelector('#score--0');
const score_1 = document.querySelector('#score--1');
const current_0 = document.querySelector('#current--0');
const current_1 = document.querySelector('#current--1');
const diceImg = document.querySelector('.dice');

//Initial Display
let holdAllow = false;
let playerOneTurn = true;
let numberSum_0 = 0;
let numberSum_1 = 0;
let currentScore_0 = 0;
let currentScore_1 = 0;
score_0.textContent = 0;
score_1.textContent = 0;
diceImg.style.display = 'none';

//////General Functions//////

const turnColorToLeft = function () {
  turn_1.classList.remove('player--active');
  turn_0.classList.add('player--active');
};

const turnColorToRight = function () {
  turn_0.classList.remove('player--active');
  turn_1.classList.add('player--active');
};

const resetCurrent = function () {
  currentScore_0 = 0;
  currentScore_1 = 0;
  current_0.textContent = 0;
  current_1.textContent = 0;
};

const switchPlayer = function () {
  playerOneTurn = !playerOneTurn;
  playerOneTurn ? turnColorToLeft() : turnColorToRight();
  resetCurrent();
};

const resetDiceImage = function () {
  diceImg.style.display = 'none';
};

//////Btn Functions//////

//Roll Dicing
const newDiceNumber = function () {
  holdAllow = true;
  diceImg.style.display = 'block';
  btnHold.addEventListener('click', getCurrentToDisplay);
  let newNumber = Math.trunc(Math.random() * 6 + 1);
  diceImg.setAttribute('src', `dice-${newNumber}.png`);

  playerOneTurn ? turnColorToLeft() : turnColorToRight();

  if (playerOneTurn) {
    currentScore_0 += newNumber;
    current_0.textContent = currentScore_0;
  } else {
    currentScore_1 += newNumber;
    current_1.textContent = currentScore_1;
  }

  if (newNumber === 1) {
    switchPlayer();
    btnHold.removeEventListener('click', getCurrentToDisplay);
  }
};

//Hold
const getCurrentToDisplay = function () {
  numberSum_0 += currentScore_0;
  numberSum_1 += currentScore_1;
  score_0.textContent = numberSum_0;
  score_1.textContent = numberSum_1;
  switchPlayer();
  resetDiceImage();
  btnHold.removeEventListener('click', getCurrentToDisplay);

  if (numberSum_0 >= 100) {
    turnColorToLeft();
    name_0.textContent = 'Vencedor! 🏆';
    score_0.textContent = numberSum_0;
    current_0.textContent = 0;
    resetDiceImage();
    btnRoll.removeEventListener('click', newDiceNumber);
  }

  if (numberSum_1 >= 100) {
    turnColorToRight();
    name_1.textContent = 'Vencedor! 🏆';
    score_1.textContent = numberSum_1;
    current_1.textContent = 0;
    resetDiceImage();
    btnRoll.removeEventListener('click', newDiceNumber);
  }
};

//New Game
const restartGame = function () {
  btnRoll.addEventListener('click', newDiceNumber);
  name_0.textContent = 'Jogador 1';
  name_1.textContent = 'Jogador 2';
  numberSum_0 = 0;
  numberSum_1 = 0;
  score_0.textContent = 0;
  score_1.textContent = 0;
  switchPlayer();
  resetDiceImage();
  playerOneTurn = true;
  turnColorToLeft();
};

//Add Btn Events
btnNewGame.addEventListener('click', restartGame);
btnRoll.addEventListener('click', newDiceNumber);

if (holdAllow) {
  btnHold.addEventListener('click', getCurrentToDisplay);
}
