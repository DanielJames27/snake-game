const board = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');

const width = 20; // 20 cells per row
const height = 20; // 20 rows
const totalCells = width * height;

let snake = [3, 2, 1, 0]; // indexes on the grid (start snake length 3)
let direction = 10; // +1 means moving right
let foodIndex = 0;
let score = 0;
let intervalTime = 200;
let timerId;

function createBoard() {
  for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    board.appendChild(cell);
  }
}

function drawSnake() {
  const cells = board.querySelectorAll('.cell');
  cells.forEach(cell => cell.classList.remove('snake', 'food'));

  snake.forEach(index => cells[index].classList.add('snake'));
  cells[foodIndex].classList.add('food');
}

function moveSnake() {
  const cells = board.querySelectorAll('.cell');
  const head = snake[0];
  let nextHead = head + direction;

  // Check collision with walls
  if (
    (direction === 1 && (head + 1) % width === 0) || // right wall
    (direction === -1 && head % width === 0) || // left wall
    (direction === width && nextHead >= totalCells) || // bottom wall
    (direction === -width && nextHead < 0) // top wall
  ) {
    alert('Game Over! Your score: ' + score);
    clearInterval(timerId);
    return;
  }

  // Check collision with self
  if (snake.includes(nextHead)) {
    alert('Game Over! Your score: ' + score);
    clearInterval(timerId);
    return;
  }

  snake.unshift(nextHead);

  // Check if snake eats food
  if (nextHead === foodIndex) {
    score++;
    scoreDisplay.textContent = score;
    generateFood();
  } else {
    snake.pop();
  }

  drawSnake();
}

function generateFood() {
  const cells = board.querySelectorAll('.cell');
  do {
    foodIndex = Math.floor(Math.random() * totalCells);
  } while (snake.includes(foodIndex));

  drawSnake();
}

function control(e) {
  switch(e.key) {
    case 'ArrowUp':
      if (direction !== width) direction = -width;
      break;
    case 'ArrowDown':
      if (direction !== -width) direction = width;
      break;
    case 'ArrowLeft':
      if (direction !== 1) direction = -1;
      break;
    case 'ArrowRight':
      if (direction !== -1) direction = 1;
      break;
  }
}

function startGame() {
  createBoard();
  generateFood();
  drawSnake();
  timerId = setInterval(moveSnake, intervalTime);
}

document.addEventListener('keydown', control);
startGame();
