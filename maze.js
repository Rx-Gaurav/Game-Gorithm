// Game configuration
const config = {
    cellSize: 30,
    levels: [
        {
            maze: [
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 3, 0, 1, 0, 3, 0, 1, 0, 3, 0, 0, 0, 1],
                [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
                [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
                [1, 0, 1, 0, 3, 0, 1, 0, 3, 0, 1, 0, 1, 0, 1],
                [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
                [1, 0, 3, 0, 0, 0, 3, 0, 0, 0, 0, 0, 1, 0, 1],
                [1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
                [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 3, 0, 1],
                [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 0, 0, 1, 0, 3, 0, 0, 0, 0, 0, 0, 2, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ],
            timeLimit: 120,
            hint: "Collect all coins before reaching the exit!"
        },
        {
            maze: [
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 0, 0, 3, 0, 1, 0, 3, 0, 0, 0, 3, 0, 1],
                [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1],
                [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1],
                [1, 0, 1, 0, 1, 0, 3, 0, 1, 0, 1, 1, 1, 0, 1],
                [1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1],
                [1, 0, 1, 0, 3, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1],
                [1, 0, 1, 1, 1, 1, 1, 0, 3, 0, 1, 0, 1, 0, 1],
                [1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1],
                [1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1],
                [1, 2, 0, 0, 0, 0, 1, 0, 1, 0, 3, 0, 0, 0, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ],
            timeLimit: 90,
            hint: "Time is running out! Find the fastest path."
        }
    ],
    currentLevel: 0,
    coinsToCollect: 0,
    solvingSpeed: 50
};

// Game state
const state = {
    playerPosition: { x: 1, y: 1 },
    gameWon: false,
    playerElement: null,
    coinsCollected: 0,
    timeLeft: 0,
    timerInterval: null,
    hintShown: false,
    isSolving: false
};

// DOM elements
const mazeElement = document.getElementById('maze');
const messageElement = document.getElementById('message');
const resetButton = document.getElementById('reset-btn');
const hintButton = document.getElementById('hint-btn');
const solveButton = document.getElementById('solve-btn');
const newMazeButton = document.getElementById('new-maze-btn');
const levelDisplay = document.getElementById('level-display');
const timerDisplay = document.getElementById('timer');
const coinsDisplay = document.getElementById('coins');
const upBtn = document.getElementById('up-btn');
const downBtn = document.getElementById('down-btn');
const leftBtn = document.getElementById('left-btn');
const rightBtn = document.getElementById('right-btn');
const winPopup = document.getElementById('winPopup');

// Initialize the game
function initGame() {
    // Clear previous maze
    mazeElement.innerHTML = '';
    messageElement.textContent = '';
    state.gameWon = false;
    state.coinsCollected = 0;
    state.hintShown = false;
    state.isSolving = false;
    
    // Reset timer
    clearInterval(state.timerInterval);
    state.timeLeft = config.levels[config.currentLevel].timeLimit;
    updateTimerDisplay();
    state.timerInterval = setInterval(updateTimer, 1000);
    
    // Update level display
    levelDisplay.textContent = `Level: ${config.currentLevel + 1}`;
    
    // Count coins
    config.coinsToCollect = 0;
    const level = config.levels[config.currentLevel].maze;
    for (let y = 0; y < level.length; y++) {
        for (let x = 0; x < level[y].length; x++) {
            if (level[y][x] === 3) config.coinsToCollect++;
        }
    }
    coinsDisplay.textContent = `Coins: 0/${config.coinsToCollect}`;

    // Create maze cells
    for (let y = 0; y < level.length; y++) {
        const row = document.createElement('tr');
        
        for (let x = 0; x < level[y].length; x++) {
            const cell = document.createElement('td');
            
            if (level[y][x] === 1) {
                cell.className = 'wall';
            } else {
                cell.className = 'path';
                
                // Mark exit
                if (level[y][x] === 2) {
                    cell.className = 'exit';
                }
                
                // Place coins
                if (level[y][x] === 3) {
                    cell.className = 'path coin';
                }
                
                // Place player
                if (x === state.playerPosition.x && y === state.playerPosition.y) {
                    const player = document.createElement('div');
                    player.className = 'player';
                    cell.appendChild(player);
                    state.playerElement = player;
                }
            }
            
            row.appendChild(cell);
        }
        
        mazeElement.appendChild(row);
    }
}

// Update timer display
function updateTimerDisplay() {
    const minutes = Math.floor(state.timeLeft / 60);
    const seconds = state.timeLeft % 60;
    timerDisplay.textContent = `Time: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // Flash red when time is running out
    if (state.timeLeft <= 10) {
        timerDisplay.style.color = '#ff6b6b';
        timerDisplay.style.animation = 'pulse 0.5s infinite alternate';
    } else {
        timerDisplay.style.color = '';
        timerDisplay.style.animation = '';
    }
}

// Timer countdown
function updateTimer() {
    if (state.gameWon || state.isSolving) return;
    
    state.timeLeft--;
    updateTimerDisplay();
    
    if (state.timeLeft <= 0) {
        clearInterval(state.timerInterval);
        messageElement.textContent = 'Time\'s up! Game Over';
        state.gameWon = true;
    }
}

// Move player
function movePlayer(dx, dy) {
    if (state.gameWon || state.isSolving) return;

    const level = config.levels[config.currentLevel].maze;
    const newX = state.playerPosition.x + dx;
    const newY = state.playerPosition.y + dy;

    // Check if new position is valid
    if (newY >= 0 && newY < level.length && 
        newX >= 0 && newX < level[newY].length && 
        level[newY][newX] !== 1) {
        
        // Remove player from current cell
        const currentCell = mazeElement.rows[state.playerPosition.y].cells[state.playerPosition.x];
        currentCell.removeChild(state.playerElement);
        
        // Update player position
        state.playerPosition.x = newX;
        state.playerPosition.y = newY;

        // Add player to new cell
        const newCell = mazeElement.rows[newY].cells[newX];
        newCell.appendChild(state.playerElement);
        
        // Check for coin collection
        if (level[newY][newX] === 3) {
            level[newY][newX] = 0; // Remove coin
            newCell.className = 'path';
            state.coinsCollected++;
            coinsDisplay.textContent = `Coins: ${state.coinsCollected}/${config.coinsToCollect}`;
            
            // Add coin collection effect
            const coinEffect = document.createElement('div');
            coinEffect.className = 'player';
            coinEffect.style.backgroundColor = '#f8bb22';
            coinEffect.style.transform = 'scale(1.5)';
            coinEffect.style.opacity = '0';
            coinEffect.style.transition = 'all 0.5s';
            newCell.appendChild(coinEffect);
            
            setTimeout(() => {
                newCell.removeChild(coinEffect);
            }, 500);
        }
        
        // Check if player reached exit
        if (level[newY][newX] === 2 && state.coinsCollected === config.coinsToCollect) {
            state.gameWon = true;
            clearInterval(state.timerInterval);
            messageElement.textContent = 'Level Complete!';
            
            // Move to next level after a delay
            setTimeout(() => {
                if (config.currentLevel < config.levels.length - 1) {
                    config.currentLevel++;
                    state.playerPosition = { x: 1, y: 1 };
                    initGame();
                } else {
                    showWinPopup();
                }
            }, 1500);
        } else if (level[newY][newX] === 2) {
            messageElement.textContent = 'Collect all coins first!';
        }
    }
}

// Show win popup
function showWinPopup() {
    winPopup.style.display = 'flex';
}

// Close win popup and reset game
function closeWinPopup() {
    winPopup.style.display = 'none';
    resetGame();
}

// Reset the entire game
function resetGame() {
    config.currentLevel = 0;
    state.playerPosition = { x: 1, y: 1 };
    initGame();
}

// Show hint
function showHint() {
    if (state.hintShown) return;
    
    messageElement.textContent = config.levels[config.currentLevel].hint;
    state.hintShown = true;
    
    // Hide hint after 5 seconds
    setTimeout(() => {
        if (!state.gameWon) {
            messageElement.textContent = '';
        }
    }, 5000);
}

// ================== BFS SOLVER ================== //
async function solveMazeBFS() {
    if (state.isSolving || state.gameWon) return;
    state.isSolving = true;
    solveButton.disabled = true;
    
    const level = config.levels[config.currentLevel].maze;
    const start = { x: state.playerPosition.x, y: state.playerPosition.y };
    const exit = findExit(level);
    
    // BFS setup
    const queue = [{ ...start, path: [] }];
    const visited = new Set();
    visited.add(`${start.x},${start.y}`);
    
    while (queue.length > 0 && !state.gameWon) {
        const current = queue.shift();
        
        // Visualize current cell being processed (except start)
        if (!(current.x === start.x && current.y === start.y)) {
            const cell = mazeElement.rows[current.y].cells[current.x];
            cell.style.backgroundColor = "#ffeb3b55";
            await new Promise(r => setTimeout(r, config.solvingSpeed));
        }
        
        // Check if reached exit with all coins
        if (level[current.y][current.x] === 2 && state.coinsCollected === config.coinsToCollect) {
            // Follow the path
            for (const step of current.path) {
                movePlayer(step.dx, step.dy);
                await new Promise(r => setTimeout(r, config.solvingSpeed));
            }
            break;
        }
        
        // Explore neighbors
        const directions = [
            { dx: 0, dy: -1 }, // up
            { dx: 1, dy: 0 },  // right
            { dx: 0, dy: 1 },  // down
            { dx: -1, dy: 0 }  // left
        ];
        
        for (const dir of directions) {
            const nx = current.x + dir.dx;
            const ny = current.y + dir.dy;
            const key = `${nx},${ny}`;
            
            if (ny >= 0 && ny < level.length && 
                nx >= 0 && nx < level[ny].length && 
                level[ny][nx] !== 1 && 
                !visited.has(key)) {
                
                visited.add(key);
                queue.push({
                    x: nx,
                    y: ny,
                    path: [...current.path, dir]
                });
            }
        }
    }
    
    // Reset cell colors
    for (let y = 0; y < level.length; y++) {
        for (let x = 0; x < level[y].length; x++) {
            if (level[y][x] === 0 || level[y][x] === 2 || level[y][x] === 3) {
                mazeElement.rows[y].cells[x].style.backgroundColor = '';
            }
        }
    }
    
    state.isSolving = false;
    solveButton.disabled = false;
}

function findExit(maze) {
    for (let y = 0; y < maze.length; y++) {
        for (let x = 0; x < maze[y].length; x++) {
            if (maze[y][x] === 2) return { x, y };
        }
    }
    return null;
}

// ================== MAZE GENERATION ================== //
function generateRandomMaze(width, height) {
    // Initialize full walls
    const maze = Array(height).fill().map(() => Array(width).fill(1));
    
    // Prim's algorithm
    const walls = [];
    const start = { x: 1, y: 1 };
    maze[start.y][start.x] = 0;
    
    // Add neighboring walls
    addWalls(start.x, start.y, maze, walls);
    
    while (walls.length) {
        const randomIdx = Math.floor(Math.random() * walls.length);
        const wall = walls[randomIdx];
        walls.splice(randomIdx, 1);
        
        const opposite = getOppositeCell(wall);
        
        if (opposite.x > 0 && opposite.x < width - 1 && 
            opposite.y > 0 && opposite.y < height - 1 && 
            maze[opposite.y][opposite.x] === 1) {
            
            maze[wall.y][wall.x] = 0;
            maze[opposite.y][opposite.x] = 0;
            addWalls(opposite.x, opposite.y, maze, walls);
        }
    }
    
    // Add exit
    maze[height-2][width-2] = 2;
    
    // Add coins (20% of path cells)
    const pathCells = [];
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (maze[y][x] === 0 && !(x === 1 && y === 1)) {
                pathCells.push({ x, y });
            }
        }
    }
    
    const coinCount = Math.floor(pathCells.length * 0.2);
    for (let i = 0; i < coinCount; i++) {
        const randomIdx = Math.floor(Math.random() * pathCells.length);
        const cell = pathCells[randomIdx];
        maze[cell.y][cell.x] = 3;
        pathCells.splice(randomIdx, 1);
    }
    
    return maze;
}

function addWalls(x, y, maze, walls) {
    const directions = [
        { dx: 0, dy: -1 }, // up
        { dx: 1, dy: 0 },  // right
        { dx: 0, dy: 1 },  // down
        { dx: -1, dy: 0 }  // left
    ];
    
    for (const dir of directions) {
        const nx = x + dir.dx * 2;
        const ny = y + dir.dy * 2;
        
        if (nx > 0 && nx < maze[0].length - 1 && 
            ny > 0 && ny < maze.length - 1 && 
            maze[ny][nx] === 1) {
            walls.push({ x: x + dir.dx, y: y + dir.dy });
        }
    }
}

function getOppositeCell(wall) {
    // Determine which side is the original path
    // (simplified for this implementation)
    return { x: wall.x * 2, y: wall.y * 2 };
}

function generateNewMaze() {
    config.levels[config.currentLevel].maze = generateRandomMaze(15, 15);
    state.playerPosition = { x: 1, y: 1 };
    initGame();
}

// ================== EVENT LISTENERS ================== //
document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp': movePlayer(0, -1); break;
        case 'ArrowDown': movePlayer(0, 1); break;
        case 'ArrowLeft': movePlayer(-1, 0); break;
        case 'ArrowRight': movePlayer(1, 0); break;
    }
});

resetButton.addEventListener('click', () => {
    state.playerPosition = { x: 1, y: 1 };
    initGame();
});

hintButton.addEventListener('click', showHint);
solveButton.addEventListener('click', solveMazeBFS);
newMazeButton.addEventListener('click', generateNewMaze);

// Mobile controls
upBtn.addEventListener('click', () => movePlayer(0, -1));
downBtn.addEventListener('click', () => movePlayer(0, 1));
leftBtn.addEventListener('click', () => movePlayer(-1, 0));
rightBtn.addEventListener('click', () => movePlayer(1, 0));

// Start the game
initGame();