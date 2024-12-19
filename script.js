let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameOver = false;
let player1Symbol = '';
let player2Symbol = '';
let player1Name = 'Player 1';
let player2Name = 'Player 2';

// Get player names from URL parameters
const urlParams = new URLSearchParams(window.location.search);
player1Name = decodeURIComponent(urlParams.get('player1') || 'Player 1');
player2Name = decodeURIComponent(urlParams.get('player2') || 'Player 2');

// Show the modal to select symbols
const modal = document.getElementById('symbolModal');
const overlay = document.getElementById('overlay');
modal.style.display = 'block';
overlay.style.display = 'block';

// Function to select symbols
function selectSymbol(symbol) {
    player1Symbol = symbol;
    player2Symbol = symbol === 'X' ? 'O' : 'X';
    currentPlayer = player1Symbol;
    document.getElementById('status').textContent = `${player1Name}'s turn`;
    modal.style.display = 'none';
    overlay.style.display = 'none';
    createBoard();
}

function createBoard() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = ''; // Clear the board first
    board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.textContent = cell;
        cellElement.onclick = () => makeMove(index); // Attach click event
        boardElement.appendChild(cellElement);
    });
}

function makeMove(index) {
    if (board[index] === '' && !gameOver) {
        board[index] = currentPlayer;
        currentPlayer = currentPlayer === player1Symbol ? player2Symbol : player1Symbol;
        const currentPlayerName =
            currentPlayer === player1Symbol ? player1Name : player2Name;
        document.getElementById('status').textContent = `${currentPlayerName}'s turn`;
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
        [2, 4, 6],
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
            const winner = board[a];
            const winnerName = winner === player1Symbol ? player1Name : player2Name;
            document.getElementById('status').textContent = `Congratulations ${winnerName}! You win!`;
            gameOver = true; // Set the game over flag to true
            showCelebration(winner); // Trigger celebration
            return;
        }
    }

    if (!board.includes('')) {
        document.getElementById('status').textContent = "It's a draw!";
        gameOver = true; // Set the game over flag to true
        setTimeout(resetGame, 5000); // Restart the game after 5 seconds
    }
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = player1Symbol; // Reset to player 1's symbol
    gameOver = false; // Reset game over flag
    createBoard();
    document.getElementById('status').textContent = `${player1Name}'s turn`;
    hideCelebration(); // Hide celebration
}

function showCelebration(winnerSymbol) {
    const celebrationElement = document.getElementById('celebrationBackground');
    celebrationElement.style.display = 'block'; // Show the celebration background

    // Hide the celebration background after 5 seconds (celebration duration)
    setTimeout(() => {
        celebrationElement.style.display = 'none'; // Hide after 5 seconds
        resetGame(); // Automatically reset the game
    }, 5000); // 5 seconds delay
}

function hideCelebration() {
    const celebrationElement = document.getElementById('celebrationBackground');
    celebrationElement.style.display = 'none'; // Hide the celebration background
}

function toggleTheme() {
    document.body.classList.toggle('night-mode');
    document.body.classList.toggle('light-mode');
    const isNightMode = document.body.classList.contains('night-mode');
    document.getElementById('toggleTheme').textContent = isNightMode
        ? 'Light Mode'
        : 'Night Mode';
}

// Set the default to Night Mode on page load
document.body.classList.add('night-mode');
