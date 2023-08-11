// module pattern
const gameBoard = (() => {
    let board = [
                [' ', ' ', ' '],
                [' ', ' ', ' '],
                [' ', ' ', ' ']
                ]

    const updatePos = (row, col, symbol) => {
        board[row][col] = symbol;
    }
    return { board, updatePos }
})();

// module pattern
const displayController = ((board, game) => {
    const setupBoxClickListeners = () => {
        for (row = 0; row < board.length; row++) {
            for (col = 0; col < board.length; col++) {
                let displayBox = document.querySelector(`div[data-row="${row}"]`).querySelector(`[data-col="${col}"]`);
                    displayBox.addEventListener('click', () => {
                        symbol = displayBox.firstChild;
                        // TO DO
                        // make a game object that keeps track of game state
                        // to start, a game should have alternating players that can be accessed
                        if (symbol == ' ') {
                            board.updatePos(row, col, game.getCurrentPlayer.symbol);
                        }
                    })           
            }
        }
    }

    const renderBoard = () => {
        for (row = 0; row < board.length; row++) {
            for (col = 0; col < board.length; col++) {
                let symbol = document.querySelector(`div[data-row="${row}"]`).querySelector(`[data-col="${col}"]`).firstChild;
                symbol.innerHTML = board[row][col];                
            }
        }
    }
    return { renderBoard }
})(gameBoard.board);

// factory pattern
const playerFactory = ((name, symbol) => {
    return { name, symbol };
});

