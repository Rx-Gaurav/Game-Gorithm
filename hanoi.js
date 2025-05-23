let towers = [[], [], []];
let moves = 0;
let maxDisks = 3;

function startGame() {
    let diskInput = parseInt(document.getElementById("diskInput").value);
    if (diskInput < 3 || diskInput > 6 || isNaN(diskInput)) {
        alert("Please enter a number between 3 and 6!");
        return;
    }

    maxDisks = diskInput;
    document.getElementById("game").style.display = "flex";
    initializeGame();
}

function initializeGame() {
    towers = [[], [], []];
    for (let i = maxDisks; i > 0; i--) {
        towers[0].push(i);
    }
    moves = 0;
    updateDisplay();
}

function updateDisplay() {
    document.getElementById("moves").textContent = moves;
    document.getElementById("diskCount").textContent = maxDisks;
    document.getElementById("bestCaseMoves").textContent = (2 ** maxDisks) - 1;

    for (let i = 0; i < 3; i++) {
        let towerElement = document.getElementById(`tower${i + 1}`);
        towerElement.innerHTML = '<div class="pole"></div>';
        towers[i].forEach(size => {
            let disk = document.createElement("div");
            disk.classList.add("disk");
            disk.style.width = `${size * 30}px`;
            disk.draggable = true;
            disk.ondragstart = (event) => drag(event, i);
            towerElement.appendChild(disk);
        });
    }

    if (towers[2].length === maxDisks) {
        document.getElementById("winPopup").style.display = "flex";
    }
}

function drag(event, fromTower) {
    event.dataTransfer.setData("tower", fromTower);
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event, toTower) {
    let fromTower = parseInt(event.dataTransfer.getData("tower"));
    if (towers[fromTower].length > 0) {
        let movingDisk = towers[fromTower][towers[fromTower].length - 1]; // peek
        let targetTopDisk = towers[toTower][towers[toTower].length - 1]; // peek

        if (!targetTopDisk || movingDisk < targetTopDisk) {
            towers[fromTower].pop();
            towers[toTower].push(movingDisk);
            moves++;
            updateDisplay();
        } else {
            alert("Invalid move! You can't place a bigger disk on a smaller one.");
        }
    }
}

function resetGame() {
    initializeGame();
}

function closeWinPopup() {
    document.getElementById("winPopup").style.display = "none";
    resetGame();
}

// Initialize on page load
initializeGame();
