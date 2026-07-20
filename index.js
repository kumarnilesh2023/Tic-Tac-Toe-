document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const statusDisplay = document.querySelector('.status');
    const resetButton = document.getElementById('resetBtn');
    
    // Game state variables
    let gameActive = true;
    let currentPlayer = 'X'; // X always starts first
    let gameState = ['', '', '', '', '', '', '', '', '']; // Represents the 3x3 board
    
    // All possible winning combinations (8 total)
    const winningConditions = [
        [0, 1, 2], // top row
        [3, 4, 5], // middle row
        [6, 7, 8], // bottom row
        [0, 3, 6], // left column
        [1, 4, 7], // middle column
        [2, 5, 8], // right column
        [0, 4, 8], // diagonal top-left to bottom-right
        [2, 4, 6]  // diagonal top-right to bottom-left
    ];
    
    // Handle cell click event
    function handleCellClick(e) {
        const clickedCell = e.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));
        
        // If cell is already filled or game is not active, ignore the click
        if (gameState[clickedCellIndex] !== '' || !gameActive) {
            return;
        }
        
        // Update game state and UI
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        clickedCell.classList.add(currentPlayer); // Adds 'X' or 'O' class for styling
        
        // Check if this move resulted in a win or draw
        checkResult();
    }
    
    // Check if current player won or if it's a draw
    function checkResult() {
        let roundWon = false;
        
        // Check all winning conditions
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            
            // Skip if any cell in the combination is empty
            if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') {
                continue;
            }
            
            // Check if all three cells have the same value
            if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
                roundWon = true;
                
                // Highlight winning cells
                cells[a].classList.add('winning-cell');
                cells[b].classList.add('winning-cell');
                cells[c].classList.add('winning-cell');
                break;
            }
        }
    
        // If someone won
        if (roundWon) {
            statusDisplay.textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
            return;
        }
        
        // If it's a draw (no empty cells left)
        if (!gameState.includes('')) {
            statusDisplay.textContent = "Game ended in a draw!";
            gameActive = false;
            return;
        }
        
        // If game continues, switch player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    }
    
    // Reset the game to initial state
    function resetGame() {
        gameActive = true;
        currentPlayer = 'X';
        gameState = ['', '', '', '', '', '', '', '', ''];
        statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
        
        // Clear all cells
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('X', 'O', 'winning-cell');
        });
    }
    
    // Event listeners
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetGame);
});
