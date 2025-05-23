// Puzzle arrays
const easyPuzzles = [
  [
    [5, 3, 0, 6, 7, 0, 9, 0, 2],
    [0, 7, 0, 1, 0, 5, 3, 4, 8],
    [1, 9, 0, 3, 0, 2, 0, 0, 7],
    [8, 5, 0, 0, 6, 1, 0, 2, 3],
    [0, 0, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 0, 9, 0, 4, 8, 5, 6],
    [0, 6, 0, 0, 3, 0, 2, 8, 4],
    [2, 8, 7, 4, 0, 0, 0, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9]
  ],
  [
    [0, 0, 0, 2, 6, 0, 7, 0, 1],
    [6, 8, 0, 0, 7, 0, 0, 9, 0],
    [1, 9, 0, 0, 0, 4, 5, 0, 0],
    [8, 2, 0, 1, 0, 0, 0, 4, 0],
    [0, 0, 4, 0, 0, 2, 0, 0, 0],
    [0, 5, 0, 0, 0, 3, 0, 2, 8],
    [0, 0, 9, 3, 0, 0, 0, 7, 4],
    [0, 4, 0, 0, 5, 0, 0, 3, 6],
    [7, 0, 3, 0, 1, 8, 0, 0, 0]
  ],
  [
    [8, 1, 2, 7, 5, 3, 6, 0, 0],
    [0, 0, 3, 6, 8, 2, 1, 7, 5],
    [6, 7, 5, 4, 9, 1, 2, 8, 3],
    [1, 5, 0, 2, 3, 7, 8, 9, 6],
    [3, 0, 0, 0, 4, 5, 7, 0, 1],
    [2, 0, 0, 1, 0, 9, 0, 3, 4],
    [5, 2, 1, 0, 7, 0, 0, 6, 8],
    [4, 0, 8, 5, 0, 0, 9, 1, 7],
    [7, 9, 6, 3, 1, 8, 4, 5, 2]
  ]
];

const mediumPuzzles = [
  [
    [0, 0, 0, 0, 7, 0, 0, 0, 9],
    [0, 0, 3, 0, 0, 1, 0, 6, 0],
    [0, 0, 0, 0, 0, 6, 0, 0, 0],
    [5, 0, 0, 0, 4, 0, 0, 0, 8],
    [0, 9, 0, 0, 0, 0, 0, 3, 0],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 0, 0, 4, 0, 0, 0, 0, 0],
    [0, 2, 0, 6, 0, 0, 9, 0, 0],
    [8, 0, 0, 0, 5, 0, 0, 0, 0]
  ],
  [
    [0, 6, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 4, 0, 0, 0, 2, 0, 0],
    [0, 0, 0, 0, 0, 6, 0, 9, 0],
    [0, 0, 5, 0, 9, 0, 0, 0, 0],
    [3, 0, 0, 5, 0, 8, 0, 0, 2],
    [0, 0, 0, 0, 3, 0, 5, 0, 0],
    [0, 5, 0, 6, 0, 0, 0, 0, 0],
    [0, 0, 3, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 4, 0]
  ],
  [
    [0, 1, 0, 0, 0, 9, 0, 0, 0],
    [0, 0, 0, 6, 0, 0, 3, 0, 0],
    [2, 0, 0, 0, 4, 0, 0, 0, 0],
    [0, 4, 0, 0, 2, 0, 0, 6, 0],
    [0, 0, 6, 0, 0, 0, 1, 0, 0],
    [0, 9, 0, 0, 8, 0, 0, 5, 0],
    [0, 0, 0, 0, 5, 0, 0, 0, 6],
    [0, 0, 9, 0, 0, 3, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 2, 0]
  ]
];

const hardPuzzles = [
  [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 3, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 7, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 3],
    [0, 0, 0, 0, 0, 0, 0, 2, 0],
    [3, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  ],
  [
    [8, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 2, 0, 0],
    [0, 5, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 7, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 3, 0],
    [0, 0, 1, 0, 0, 0, 0, 6, 8],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 9, 0, 0, 0, 0, 4, 0, 0]
  ],
  [
    [0, 0, 4, 0, 0, 3, 0, 7, 0],
    [0, 0, 0, 6, 0, 0, 0, 0, 1],
    [0, 0, 2, 0, 0, 1, 0, 0, 0],
    [0, 7, 0, 0, 5, 0, 6, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 8, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 7, 0, 0, 0, 0, 0],
    [9, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 9, 0, 0, 2, 0, 0]
  ]
];

let board;
const difficulty = localStorage.getItem('difficulty');

function getRandomPuzzle() {
  const puzzles = { easy: easyPuzzles, medium: mediumPuzzles, hard: hardPuzzles };
  const list = puzzles[difficulty] || easyPuzzles;
  return list[Math.floor(Math.random() * list.length)].map(row => [...row]);
}

board = getRandomPuzzle();

function isValid(board, row, col, num) {
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num && x !== col) return false;
    if (board[x][col] === num && x !== row) return false;
  }

  const startRow = row - row % 3;
  const startCol = col - col % 3;
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      const rr = startRow + r;
      const cc = startCol + c;
      if (board[rr][cc] === num && (rr !== row || cc !== col)) return false;
    }
  }
  return true;
}

function solveSudoku(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValid(board, row, col, num)) {
            board[row][col] = num;
            if (solveSudoku(board)) return true;
            board[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function createBoard() {
  const boardElement = document.getElementById('board');
  boardElement.innerHTML = '';
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      const input = document.createElement('input');
      input.type = 'number';
      input.min = 1;
      input.max = 9;
      input.id = `cell-${row}-${col}`;
      input.value = board[row][col] !== 0 ? board[row][col] : '';
      input.disabled = board[row][col] !== 0;
      input.addEventListener('input', () => {
        const val = parseInt(input.value);
        board[row][col] = isNaN(val) ? 0 : val;
      });
      cell.appendChild(input);
      boardElement.appendChild(cell);
    }
  }
}

function getCurrentBoard() {
  const current = [];
  for (let i = 0; i < 9; i++) {
    current[i] = [];
    for (let j = 0; j < 9; j++) {
      const input = document.getElementById(`cell-${i}-${j}`);
      const val = parseInt(input.value);
      current[i][j] = isNaN(val) ? 0 : val;
    }
  }
  return current;
}

function isBoardFull(board) {
  return board.every(row => row.every(cell => cell !== 0));
}

function isBoardCorrect(board) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const num = board[i][j];
      if (num === 0 || !isValid(board, i, j, num)) {
        return false;
      }
    }
  }
  return true;
}

function showWinPopup() {
    document.getElementById("winPopup").style.display = "flex";
}

function resetGame() {
    board = getRandomPuzzle();
    createBoard();
    document.getElementById('status').textContent = '';
}

function closeWinPopup() {
    document.getElementById("winPopup").style.display = "none";
    resetGame();
}

function checkSolution() {
  const currentBoard = getCurrentBoard();
  const status = document.getElementById('status');

  if (!isBoardFull(currentBoard)) {
    status.textContent = "🕵️ Please complete all cells first.";
    status.style.color = "#f1c40f";
    return;
  }

  if (isBoardCorrect(currentBoard)) {
    status.textContent = "🎉 Correct solution!";
    status.style.color = "#2ecc71";
    showWinPopup();
  } else {
    status.textContent = "❌ Incorrect solution.";
    status.style.color = "#e74c3c";
  }
}

document.getElementById('solveBtn').addEventListener('click', () => {
  const status = document.getElementById('status');
  const boardCopy = board.map(row => [...row]);
  if (solveSudoku(boardCopy)) {
    board = boardCopy;
    status.textContent = 'Solved!';
    status.style.color = '#2ecc71';
    createBoard();
  } else {
    status.textContent = 'No solution exists.';
    status.style.color = '#e74c3c';
  }
});

document.getElementById('resetBtn').addEventListener('click', () => {
  board = getRandomPuzzle();
  createBoard();
  document.getElementById('status').textContent = '';
});

document.getElementById('checkBtn').addEventListener('click', checkSolution);

createBoard();