const boardSize = 12;
const moleAppearTime = 1000; // 1 segundo
const gameTime = 60; // 60 segundos
const speedupTime = 15; // 15 segundos para aumentar la velocidad
const alert = ()=>{
  Swal.fire('tu puntuacion total es '+ score)
};
let score = 0;
let timeLeft = gameTime;
let moleInterval;
let timerInterval;


function createBoard() {
  const gameBoard = document.getElementById('game-board');
  for (let i = 0; i < boardSize; i++) {
    const button = document.createElement('button');
    button.addEventListener('click', () => hitMole(button));
    const moleContainer = document.createElement('div');
    moleContainer.className = 'mole-container';
    const moleImage = document.createElement('img');
    moleImage.src = './img/topo.jpg'; //imagen del topo
    moleImage.alt = 'Topo';
    moleContainer.appendChild(moleImage);
    button.appendChild(moleContainer);
    gameBoard.appendChild(button);
  }
}

function hitMole(button) {
  if (button.classList.contains('mole')) {
    score++;
    button.classList.remove('mole');
    updateScore();
  }
}

function showMole() {
  const buttons = document.querySelectorAll('button');
  buttons.forEach((button) => button.classList.remove('mole'));
  
  const randomIndex = Math.floor(Math.random() * buttons.length);
  buttons[randomIndex].classList.add('mole');
}

function startGame() {
  if (moleInterval) clearInterval(moleInterval);
  if (timerInterval) clearInterval(timerInterval);

  score = 0;
  timeLeft = gameTime;
  updateScore();
  updateTimer();

  moleInterval = setInterval(showMole, moleAppearTime);
  timerInterval = setInterval(updateTimer, 1000);

  // Ocultar el botón "Volver a jugar" durante el juego
  const restartButton = document.getElementById('restart-button');
  restartButton.style.display = 'none';
}

function updateScore() {
  document.getElementById('score').innerText = score;
}

function updateTimer() {
  const timerSpan = document.getElementById('time');
  timerSpan.innerText = timeLeft;
  timeLeft--;

  if (timeLeft < 0) {
    endGame();
    alert();
  } else if (timeLeft <= speedupTime) {
    clearInterval(moleInterval);
    moleInterval = setInterval(showMole, moleAppearTime * 0.8);
  }
}

function endGame() {
  clearInterval(moleInterval);
  clearInterval(timerInterval);

  // Mostrar el botón "Volver a jugar" al final del juego
  const restartButton = document.getElementById('restart-button');
  restartButton.style.display = 'block';
}

createBoard();

// Agregamos el evento onclick del botón "Volver a jugar" después de crear el tablero
const restartButton = document.getElementById('restart-button');
restartButton.addEventListener('click', startGame);
