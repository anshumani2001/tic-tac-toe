// HTML Elements
const status = document.querySelector('.status');
const reset = document.querySelector('.reset');
const cells = document.querySelectorAll('.game-cell');

// game constants
const xSymbol = '×';
const oSymbol = '○';

// game variables
let gameIsLive = true;
let xIsNext = true;

// functions
const letterToSymbol = (letter) => letter === 'x' ? xSymbol : oSymbol;

const handleWin = (letter) => {
  gameIsLive = false;
  if (letter === 'x') {
    status.innerHTML = `${letterToSymbol(letter)} has won!`;
  } else {
    status.innerHTML = `<span>${letterToSymbol(letter)} has won!</span>`;
  }
};

const checkGameStatus = () => {
  const topLeft = cells[0].classList[1];
  const topMiddle = cells[1].classList[1];
  const topRight = cells[2].classList[1];
  const middleLeft = cells[3].classList[1];
  const middleMiddle = cells[4].classList[1];
  const middleRight = cells[5].classList[1];
  const bottomLeft = cells[6].classList[1];
  const bottomMiddle = cells[7].classList[1];
  const bottomRight = cells[8].classList[1];

  // check winner
  if (topLeft && topLeft === topMiddle && topLeft === topRight) {
    handleWin(topLeft);
    cells[0].classList.add('won');
    cells[1].classList.add('won');
    cells[2].classList.add('won');
  } else if (middleLeft && middleLeft === middleMiddle && middleLeft === middleRight) {
    handleWin(middleLeft);
    cells[3].classList.add('won');
    cells[4].classList.add('won');
    cells[5].classList.add('won');
  } else if (bottomLeft && bottomLeft === bottomMiddle && bottomLeft === bottomRight) {
    handleWin(bottomLeft);
    cells[6].classList.add('won');
    cells[7].classList.add('won');
    cells[8].classList.add('won');
  } else if (topLeft && topLeft === middleLeft && topLeft === bottomLeft) {
    handleWin(topLeft);
    cells[0].classList.add('won');
    cells[3].classList.add('won');
    cells[6].classList.add('won');
  } else if (topMiddle && topMiddle === middleMiddle && topMiddle === bottomMiddle) {
    handleWin(topMiddle);
    cells[1].classList.add('won');
    cells[4].classList.add('won');
    cells[7].classList.add('won');
  } else if (topRight && topRight === middleRight && topRight === bottomRight) {
    handleWin(topRight);
    cells[2].classList.add('won');
    cells[5].classList.add('won');
    cells[8].classList.add('won');
  } else if (topLeft && topLeft === middleMiddle && topLeft === bottomRight) {
    handleWin(topLeft);
    cells[0].classList.add('won');
    cells[4].classList.add('won');
    cells[8].classList.add('won');
  } else if (topRight && topRight === middleMiddle && topRight === bottomLeft) {
    handleWin(topRight);
    cells[2].classList.add('won');
    cells[4].classList.add('won');
    cells[6].classList.add('won');
  } else if (topLeft && topMiddle && topRight && middleLeft && middleMiddle && middleRight && bottomLeft && bottomMiddle && bottomRight) {
    gameIsLive = false;
    status.innerHTML = 'Game is tied!';
  } else {
    xIsNext = !xIsNext;
    if (xIsNext) {
      status.innerHTML = `${xSymbol} is next`;
    } else {
      status.innerHTML = `<span>${oSymbol} is next</span>`;
    }
  }
};

// event Handlers
const handleReset = () => {
  xIsNext = true;
  status.innerHTML = `${xSymbol} is next`;
  for (const cellDiv of cells) {
    cellDiv.classList.remove('x');
    cellDiv.classList.remove('o');
    cellDiv.classList.remove('won');
  }
  gameIsLive = true;
};

const handleCellClick = (e) => {
  const classList = e.target.classList;

  if (!gameIsLive || classList[1] === 'x' || classList[1] === 'o') {
    return;
  }

  if (xIsNext) {
    classList.add('x');
    checkGameStatus();
  } else {
    classList.add('o');
    checkGameStatus();
  }
};

// event listeners
reset.addEventListener('click', handleReset);

for (const cellDiv of cells) {
  cellDiv.addEventListener('click', handleCellClick)
}