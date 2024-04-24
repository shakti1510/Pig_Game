'use strict';

//Selecting elements
const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const curr0El = document.getElementById('current--0');
const curr1El = document.getElementById('current--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const pl0 = document.querySelector('.player--0');
const pl1 = document.querySelector('.player--1');

//Starting conditions
score0.textContent = 0;
score1.textContent = 0;
diceEl.classList.add('hidden');

const scoreboard = [0, 0];
let currentScore = 0;
let player = 0;
let chance = true;

let switchPl = () => {
  scoreboard[player] += currentScore;
  document.getElementById(`score--${player}`).textContent = scoreboard[player];
  player = player === 0 ? 1 : 0;
  currentScore = 0;
  pl1.classList.toggle('player--active');
  pl0.classList.toggle('player--active');
};
let declare = () => {
  chance = false;
  document.querySelector(`player--${player}`).classList.add('player--winner');
  document
    .querySelector(`player--${player}`)
    .classList.remove('player--active');
  diceEl.classList.add('hidden');
};

//Rolling dice functionality
btnRoll.addEventListener('click', () => {
  //1. Generating a random dice roll
  if (chance) {
    const diceval = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceval}.png`;

    if (diceval !== 1) {
      currentScore += diceval;
      document.getElementById(`current--${player}`).textContent = currentScore;
    } else {
      if (scoreboard[player] >= 100) {
        declare();
      } else {
        switchPl();
      }
    }
  }
});

btnHold.addEventListener('click', () => {
  if (chance) {
    scoreboard[player] += currentScore;
    document.getElementById(`score--${player}`).textContent =
      scoreboard[player];
    if (scoreboard[player] >= 100) {
      declare();
    }
  } else {
    switchPl();
  }
});

btnNew.addEventListener('click', () => {
  score0.textContent = 0;
  score1.textContent = 0;
  curr0El.textContent = 0;
  curr1El.textContent = 0;
  player = 0;
  currentScore = 0;
});
