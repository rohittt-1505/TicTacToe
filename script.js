let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameOver = false;
let player1Symbol = '';
let player2Symbol = '';
let player1Name = 'Player 1';
let player2Name = 'Player 2';

let player1Wins = 0;
let player2Wins = 0;
let draws = 0;
let totalMatches = 0;  // To track the total number of matches played

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
            document.getElementById('status').textContent = `Congratulations ${winnerName} You win!`;
            gameOver = true; // Set the game over flag to true
            if (winner === player1Symbol) {
                player1Wins++;
                document.getElementById('player1Wins').textContent = player1Wins;
            } else {
                player2Wins++;
                document.getElementById('player2Wins').textContent = player2Wins;
            }
            totalMatches++;  // Increment the total match count
            document.getElementById('totalMatches').textContent = totalMatches;
            showCelebration(winner); // Trigger celebration
            return;
        }
    }

    // Check for a draw
    if (!board.includes('')) {
        draws++;
        document.getElementById('draws').textContent = draws;
        document.getElementById('status').textContent = "It's a draw!";
        gameOver = true; // Set the game over flag to true
        totalMatches++;  // Increment the total match count
        document.getElementById('totalMatches').textContent = totalMatches;
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
        setTimeout(resetGame, 5000); // Automatically reset the game after 5 seconds
    }, 5000); // 5 seconds delay
}

function hideCelebration() {
    const celebrationElement = document.getElementById('celebrationBackground');
    celebrationElement.style.display = 'none'; // Hide the celebration background
}

function toggleTheme() {
    // Toggle night and light mode
    document.body.classList.toggle('night-mode');
    document.body.classList.toggle('light-mode');
    
    // Check if it's in night mode
    const isNightMode = document.body.classList.contains('night-mode');
    
    // Update the text and icon
    const themeText = document.getElementById('themeText');
    const themeIcon = document.getElementById('themeIcon');
    
    if (isNightMode) {
        themeText.textContent = '';
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    } else {
        themeText.textContent = '';
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
}

// Set the default to Night Mode on page load
document.body.classList.add('night-mode');

function goBack() {
    window.history.back();
}

// Set player names in the scoreboard
document.getElementById('player1NameLabel').textContent = player1Name;
document.getElementById('player2NameLabel').textContent = player2Name;

// Reset score stat
// Function to reset the scoreboard
function resetScores() {
    // Reset the scores
    player1Wins = 0;
    player2Wins = 0;
    draws = 0;
    totalMatches = 0;

    // Update the HTML elements with the reset values
    document.getElementById('player1Wins').textContent = player1Wins;
    document.getElementById('player2Wins').textContent = player2Wins;
    document.getElementById('draws').textContent = draws;
    document.getElementById('totalMatches').textContent = totalMatches;
}

function openScoreboard() {
    // Update the scoreboard modal with the current scores
    document.getElementById('modalPlayer1NameLabel').textContent = player1Name;
    document.getElementById('modalPlayer2NameLabel').textContent = player2Name;
    document.getElementById('modalPlayer1Wins').textContent = player1Wins;
    document.getElementById('modalPlayer2Wins').textContent = player2Wins;
    document.getElementById('modalDraws').textContent = draws;
    document.getElementById('modalTotalMatches').textContent = totalMatches;

    // Show the modal and overlay
    document.getElementById('scoreboardModal').style.display = 'block';
    document.getElementById('scoreboardOverlay').style.display = 'block';
}

function closeScoreboard() {
    // Hide the modal and overlay
    document.getElementById('scoreboardModal').style.display = 'none';
    document.getElementById('scoreboardOverlay').style.display = 'none';
}
