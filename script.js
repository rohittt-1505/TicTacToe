let player1 = { name: "", symbol: "", wins: 0 };
let player2 = { name: "", symbol: "", wins: 0 };
let currentPlayer = player1;
let totalMatches = 0;
let draws = 0;
let board = Array(9).fill("");
let gameOver = false;

function initializePlayers() {
    // Fetch player names from index.html using URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    player1.name = urlParams.get("player1") || "Player 1";
    player2.name = urlParams.get("player2") || "Player 2";

    // Show symbol selection modal
    openModal("symbolModal");
}

function selectSymbol(symbol) {
    player1.symbol = symbol;
    player2.symbol = symbol === "X" ? "O" : "X";

    currentPlayer = player1;
    updateStatus();
    closeModal("symbolModal");
    renderBoard();
}

function updateStatus() {
    document.getElementById("status").innerText = `${currentPlayer.name}'s turn (${currentPlayer.symbol})`;
}

function renderBoard() {
    const boardContainer = document.getElementById("board");
    boardContainer.innerHTML = "";
    board.forEach((cell, index) => {
        const cellDiv = document.createElement("div");
        cellDiv.classList.add("cell");
        cellDiv.innerText = cell;
        cellDiv.onclick = () => handleCellClick(index);
        boardContainer.appendChild(cellDiv);
    });
}

function handleCellClick(index) {
    if (board[index] !== "" || gameOver) return;

    board[index] = currentPlayer.symbol;
    renderBoard();
    checkWinner();
    if (!gameOver) switchTurn();
}

function switchTurn() {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    updateStatus();
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combo of winningCombinations) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameOver = true;
            currentPlayer.wins++;
            totalMatches++;
            document.getElementById("status").innerText = `${currentPlayer.name} wins!`;
            setTimeout(resetGame, 5000);
            return;
        }
    }

    if (!board.includes("")) {
        gameOver = true;
        draws++;
        totalMatches++;
        document.getElementById("status").innerText = "It's a draw!";
        setTimeout(resetGame, 5000);
    }
}

function resetGame() {
    board = Array(9).fill("");
    gameOver = false;
    currentPlayer = player1;
    updateStatus();
    renderBoard();
}

function openScoreboard() {
    document.getElementById("modalPlayer1NameLabel").innerText = player1.name;
    document.getElementById("modalPlayer2NameLabel").innerText = player2.name;
    document.getElementById("modalPlayer1Wins").innerText = player1.wins;
    document.getElementById("modalPlayer2Wins").innerText = player2.wins;
    document.getElementById("modalDraws").innerText = draws;
    document.getElementById("modalTotalMatches").innerText = totalMatches;
    openModal("scoreboardModal");
}

function closeScoreboard() {
    closeModal("scoreboardModal");
}

function goBack() {
    window.history.back();
}

// Set the default theme to dark mode when the page loads
document.addEventListener("DOMContentLoaded", function () {
    document.body.classList.add("night-mode"); // Start in dark mode
    updateTheme("night"); // Update icon and text
});

// Function to toggle between light and dark modes
function toggleTheme() {
    const body = document.body;

    if (body.classList.contains("night-mode")) {
        // Switch to light mode
        body.classList.remove("night-mode");
        body.classList.add("light-mode");
        updateTheme("light");
    } else {
        // Switch to dark mode
        body.classList.remove("light-mode");
        body.classList.add("night-mode");
        updateTheme("night");
    }
}

// Function to update the icon and text
function updateTheme(mode) {
    const themeIcon = document.getElementById("themeIcon");
    const themeText = document.getElementById("themeText");

    if (mode === "night") {
        themeIcon.className = "fas fa-sun"; // Set to sun icon
        themeText.textContent = "";
    } else {
        themeIcon.className = "fas fa-moon"; // Set to moon icon
        themeText.textContent = "";
    }
}

function openModal(id) {
    document.getElementById(id).style.display = "block";
    document.getElementById("overlay").style.display = "block";
}

function closeModal(id) {
    document.getElementById(id).style.display = "none";
    document.getElementById("overlay").style.display = "none";
}

// Initialize game
window.onload = function () {
    initializePlayers();
};
