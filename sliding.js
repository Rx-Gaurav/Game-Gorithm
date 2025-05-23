const puzzle = document.getElementById('puzzle');
const nextLevelBtn = document.getElementById('nextLevelBtn');
const statusText = document.getElementById('status');
const userStepsText = document.getElementById('userSteps');
const minStepsText = document.getElementById('minSteps');
const levelDisplay = document.getElementById('levelDisplay');

const levels = [
  [[1, 2, 3], [4, 5, 6], [0, 7, 8]],      // Level 1 (very easy)
  [[1, 2, 3], [4, 5, 6], [7, 0, 8]],      // Level 2
  [[1, 2, 3], [4, 5, 6], [0, 7, 8]],      // Level 3 (solved)
  [[1, 2, 3], [4, 0, 6], [7, 5, 8]],      // Level 4
  [[1, 2, 3], [5, 0, 6], [4, 7, 8]],      // Level 5
  [[0, 1, 3], [4, 2, 5], [7, 8, 6]],      // Level 6
  [[1, 3, 6], [5, 0, 2], [4, 7, 8]],      // Level 7
  [[1, 3, 6], [4, 5, 2], [0, 7, 8]],      // Level 8
  [[7, 1, 3], [5, 0, 2], [4, 6, 8]],      // Level 9
  [[8, 6, 7], [2, 5, 4], [3, 0, 1]]       // Level 10 (hardest)
];

let grid = [];
let userSteps = 0;
let hasStarted = false;
let currentLevel = 0;

function createBoard() {
  puzzle.innerHTML = '';
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const tile = document.createElement('div');
      tile.classList.add('tile');
      tile.innerText = grid[row][col] !== 0 ? grid[row][col] : '';
      if (grid[row][col] === 0) {
        tile.classList.add('empty');
      } else {
        tile.addEventListener('click', () => {
          if (!hasStarted) return;
          moveTile(row, col);
        });
      }
      puzzle.appendChild(tile);
    }
  }
}

function moveTile(row, col) {
  const empty = findEmptyCell();
  if (
    (Math.abs(empty.row - row) === 1 && empty.col === col) ||
    (Math.abs(empty.col - col) === 1 && empty.row === row)
  ) {
    [grid[row][col], grid[empty.row][empty.col]] = [grid[empty.row][empty.col], grid[row][col]];
    userSteps++;
    updateInfo();
    createBoard();
    checkWin();
  }
}

function findEmptyCell() {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (grid[row][col] === 0) return { row, col };
    }
  }
}

function updateInfo() {
  userStepsText.innerText = userSteps;
}

function checkWin() {
  if (!hasStarted) return;

  let isWin = true;
  let num = 1;
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (grid[row][col] !== num % 9) {
        isWin = false;
        break;
      }
      num++;
    }
    if (!isWin) break;
  }

  if (isWin) {
    showWinPopup();
    hasStarted = false;
    setTimeout(nextLevel, 2000);
  }
}

function showWinPopup() {
  const popup = document.getElementById('winPopup');
  if (popup) popup.style.display = 'flex';
}

function hideWinPopup() {
  const popup = document.getElementById('winPopup');
  if (popup) popup.style.display = 'none';
}

function loadLevel(index) {
  if (index >= levels.length) {
    statusText.innerText = '🎉 You completed all 10 levels!';
    return;
  }
  grid = JSON.parse(JSON.stringify(levels[index]));
  userSteps = 0;
  hasStarted = true;
  updateInfo();
  levelDisplay.innerText = index + 1;
  createBoard();
  statusText.innerText = '';
  hideWinPopup();

  const flat = grid.flat().join('');
  const minSteps = calculateMinSteps(flat);
  minStepsText.innerText = minSteps !== -1 ? minSteps : 'Unsolvable';
}

function nextLevel() {
  currentLevel++;
  loadLevel(currentLevel);
}

function calculateMinSteps(startGrid) {
  const goal = '123456780';
  const directions = [
    { r: -1, c: 0 },
    { r: 1, c: 0 },
    { r: 0, c: -1 },
    { r: 0, c: 1 }
  ];

  function manhattanDistance(state) {
    let dist = 0;
    for (let i = 0; i < 9; i++) {
      const val = parseInt(state[i]);
      if (val === 0) continue;
      const goalRow = Math.floor((val - 1) / 3);
      const goalCol = (val - 1) % 3;
      const currRow = Math.floor(i / 3);
      const currCol = i % 3;
      dist += Math.abs(goalRow - currRow) + Math.abs(goalCol - currCol);
    }
    return dist;
  }

  function getNeighbors(state) {
    const neighbors = [];
    const zeroIndex = state.indexOf('0');
    const row = Math.floor(zeroIndex / 3);
    const col = zeroIndex % 3;

    for (const { r, c } of directions) {
      const newRow = row + r;
      const newCol = col + c;
      if (newRow >= 0 && newRow < 3 && newCol >= 0 && newCol < 3) {
        const newIdx = newRow * 3 + newCol;
        const arr = state.split('');
        [arr[zeroIndex], arr[newIdx]] = [arr[newIdx], arr[zeroIndex]];
        neighbors.push(arr.join(''));
      }
    }
    return neighbors;
  }

  const visited = new Set();
  const pq = [{ state: startGrid, g: 0, f: manhattanDistance(startGrid) }];

  while (pq.length) {
    pq.sort((a, b) => a.f - b.f);
    const { state, g } = pq.shift();
    if (state === goal) return g;
    if (visited.has(state)) continue;
    visited.add(state);

    for (const neighbor of getNeighbors(state)) {
      if (!visited.has(neighbor)) {
        pq.push({ state: neighbor, g: g + 1, f: g + 1 + manhattanDistance(neighbor) });
      }
    }
  }

  return -1;
}

nextLevelBtn.addEventListener('click', () => {
  if (currentLevel < levels.length - 1) {
    currentLevel++;
    loadLevel(currentLevel);
  } else {
    statusText.innerText = '🎉 You are already on the last level!';
  }
});

window.onload = () => {
  currentLevel = 0;
  loadLevel(currentLevel);
};