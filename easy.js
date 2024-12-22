let board = ['', '', '', '', '', '', '', '', '']; // Empty board
let player = 'X'; // Player X starts
let ai = 'O'; // AI is player O
let gameOver = false;
let resetTimeout = null; // Variable to hold the timeout ID

document.addEventListener('DOMContentLoaded', () => {
    startGame();

    // Force dark mode when the game is first opened
    document.body.classList.add('night-mode');
    updateThemeIcon('night-mode');  // Ensure the correct icon is shown for night mode

    // Attach event listener for reset button
    document.getElementById('resetButton').addEventListener('click', resetGame);
});

function startGame() {
    const boardElement = document.getElementById('board');

    // Dynamically create the cells for the board
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        boardElement.appendChild(cell);
        cell.addEventListener('click', handleClick);
    }

    // AI starts after player moves if player is 'X'
    if (player === 'X') {
        aiMove();
    }
}

function handleClick(event) {
    const index = event.target.dataset.index;
    if (board[index] === '' && !gameOver) {
        board[index] = player;
        event.target.textContent = player;

        if (checkWinner(player)) {
            displayWinner('Player wins!');
            gameOver = true;
            clearTimeout(resetTimeout); // Clear any existing timeout
            resetTimeout = setTimeout(resetGame, 5000); // Reset after 5 seconds
            return;
        }

        if (checkDraw()) {
            displayWinner('It\'s a draw!');
            gameOver = true;
            clearTimeout(resetTimeout); // Clear any existing timeout
            resetTimeout = setTimeout(resetGame, 5000); // Reset after 5 seconds
            return;
        }

        player = (player === 'X') ? 'O' : 'X'; // Switch players
        if (!gameOver) {
            aiMove();
        }
    }
}

function aiMove() {
    const emptyCells = board.map((value, index) => value === '' ? index : -1).filter(value => value !== -1);
    const randomMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];

    board[randomMove] = ai;
    document.querySelector(`[data-index='${randomMove}']`).textContent = ai;

    if (checkWinner(ai)) {
        displayWinner('AI wins!');
        gameOver = true;
        clearTimeout(resetTimeout); // Clear any existing timeout
        resetTimeout = setTimeout(resetGame, 5000); // Reset after 5 seconds
        return;
    }

    if (checkDraw()) {
        displayWinner('It\'s a draw!');
        gameOver = true;
        clearTimeout(resetTimeout); // Clear any existing timeout
        resetTimeout = setTimeout(resetGame, 5000); // Reset after 5 seconds
        return;
    }

    player = 'X'; // Switch back to Player X
}

function checkWinner(currentPlayer) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
        [0, 4, 8], [2, 4, 6] // Diagonal
    ];

    return winPatterns.some(pattern => {
        return pattern.every(index => board[index] === currentPlayer);
    });
}

function checkDraw() {
    return board.every(cell => cell !== '') && !checkWinner('X') && !checkWinner('O');
}

function displayWinner(message) {
    const statusElement = document.getElementById('status');
    statusElement.textContent = message;
}

// Reset Game function
function resetGame() {
    board = ['', '', '', '', '', '', '', '', '']; // Clear the board
    gameOver = false; // Reset game over state
    player = 'X'; // Reset to player X starting

    // Reset the UI: clear all cells
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.textContent = '';  // Clear each cell's text
    });

    // Reset status message
    document.getElementById('status').textContent = "Player 1's turn (X)";

    // AI starts after the player moves
    if (player === 'X') {
        aiMove();
    }

    // Clear the existing reset timeout if the user manually restarts the game
    clearTimeout(resetTimeout); // Ensure no reset happens if clicked on restart manually
}

// Go back
function goBack() {
    window.history.back();  // This goes back to the previous page in browser history
}

// Theme Toggle function
document.getElementById("toggleTheme").addEventListener("click", function () {
    document.body.classList.toggle("light-mode");
    document.body.classList.toggle("night-mode");

    // Save the theme preference
    if (document.body.classList.contains("light-mode")) {
        localStorage.setItem("theme", "light");
    } else {
        localStorage.setItem("theme", "night");
    }

    // Change the icon based on the theme
    const icon = document.getElementById("themeIcon");
    if (document.body.classList.contains("light-mode")) {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
    } else {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
    }
});

// Update the theme icon based on the current theme
function updateThemeIcon(theme) {
    const icon = document.getElementById("themeIcon");
    if (theme === 'light') {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
    } else {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
    }
}
