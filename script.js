let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameOver = false; // Flag to check if the game is over

function createBoard() {
    const boardElement = document.getElementById("board");
    boardElement.innerHTML = '';  // Clear the board first
    board.forEach((cell, index) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        cellElement.textContent = cell;
        cellElement.onclick = () => makeMove(index);  // Attach click event
        boardElement.appendChild(cellElement);
    });
}

function makeMove(index) {
    if (board[index] === '' && !gameOver) {  // Check if game is not over
        board[index] = currentPlayer;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';  // Alternate turns
        createBoard();
        checkWinner();
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
            document.getElementById("status").textContent = `${board[a]} wins!`;
            gameOver = true;  // Set the game over flag to true
            showCelebration();  // Trigger celebration
            return;
        }
    }

    if (!board.includes('')) {
        document.getElementById("status").textContent = "It's a draw!";
        gameOver = true;  // Set the game over flag to true
    }
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';  // Reset to player X
    gameOver = false;  // Reset game over flag
    createBoard();
    document.getElementById("status").textContent = '';  // Reset status message
    hideCelebration();  // Hide celebration
}

function showCelebration() {
    const celebrationElement = document.getElementById('celebrationBackground');
    celebrationElement.style.display = 'block';  // Show the celebration background

    // Hide the celebration background after 5 seconds (celebration duration)
    setTimeout(() => {
        celebrationElement.style.display = 'none';  // Hide after 5 seconds
        resetGame();  // Automatically reset the game
    }, 5000);  // 5 seconds delay
}

function hideCelebration() {
    const celebrationElement = document.getElementById('celebrationBackground');
    celebrationElement.style.display = 'none';  // Hide the celebration background
}

function toggleTheme() {
    document.body.classList.toggle('night-mode');
    document.body.classList.toggle('light-mode');
    const isNightMode = document.body.classList.contains('night-mode');
    document.getElementById("toggleTheme").textContent = isNightMode ? "Switch to Light Mode" : "Switch to Night Mode";
}

// Set the default to Night Mode on page load
document.body.classList.add('night-mode');

createBoard();
