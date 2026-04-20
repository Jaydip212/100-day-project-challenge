const puzzleContainer = document.querySelector(".puzzle-container");
let tiles = [];
let order = [];

function createTiles() {
    tiles = [];
    order = [];
    puzzleContainer.innerHTML = "";

    for (let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.classList.add("tile");
        tile.style.backgroundPosition = `-${(i % 3) * 100}px -${Math.floor(i / 3) * 100}px`;
        tile.dataset.index = i;
        tile.draggable = true;

        // Drag Events
        tile.addEventListener("dragstart", dragStart);
        tile.addEventListener("dragover", dragOver);
        tile.addEventListener("drop", drop);

        tiles.push(tile);
        order.push(i);
        puzzleContainer.appendChild(tile);
    }
}

// Drag & Drop Functions
let draggedTile = null;

function dragStart(event) {
    draggedTile = event.target;
}

function dragOver(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    if (event.target.classList.contains("tile")) {
        let fromIndex = tiles.indexOf(draggedTile);
        let toIndex = tiles.indexOf(event.target);
        
        // Swap tiles
        puzzleContainer.insertBefore(draggedTile, event.target.nextSibling);
        puzzleContainer.insertBefore(event.target, tiles[fromIndex]);

        // Swap positions in array
        [tiles[fromIndex], tiles[toIndex]] = [tiles[toIndex], tiles[fromIndex]];

        checkWin();
    }
}

// Check if Puzzle is Solved
function checkWin() {
    let isCorrect = tiles.every((tile, idx) => parseInt(tile.dataset.index) === idx);
    if (isCorrect) {
        setTimeout(() => alert("🎉 Puzzle Solved!"), 500);
    }
}

createTiles();