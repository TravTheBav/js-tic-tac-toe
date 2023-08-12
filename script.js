// factory pattern
const playerFactory = ((name, symbol) => {
    return { name, symbol };
});

// module pattern
const gameBoard = (() => {
    let board = [
                [null, null, null],
                [null, null, null],
                [null, null, null]
                ]

    const updatePos = (row, col, symbol) => {
        board[row][col] = symbol;
    }
    return { board, updatePos }
})();

// module pattern
const displayController = (() => {
    const setListeners = function () {
        for (let row = 0; row < gameBoard.board.length; row++) {
            for (let col = 0; col < gameBoard.board.length; col++) {
                let box = _getDisplayBox(row, col);
                    box.addEventListener('click', _boxClicked.bind(this, row, col), false);
            }
        }
    }    

    const renderBoard = function () {
        for (row = 0; row < gameBoard.board.length; row++) {
            for (col = 0; col < gameBoard.board.length; col++) {
                let symbol = _getDisplayBox(row, col).firstChild;
                symbol.innerHTML = gameBoard.board[row][col];                
            }
        }
    }

    const _getDisplayBox = function (row, col) {
        return document.querySelector(`div[data-row="${row}"]`).querySelector(`[data-col="${col}"]`);
    }

    const _boxClicked = function (row, col) {
        let box = _getDisplayBox(row, col);
        let symbol = box.firstChild;
        if (!symbol.innerHTML) {
            gameBoard.updatePos(row, col, Game.getCurrentSymbol());            
            Game.playerClick();
        }
    }

    return { renderBoard, setListeners }
})();

// module pattern
const Game = (function () {
    let gameOver = false;
    const playerOne = playerFactory(prompt('Enter player 1 name: '), 'X');
    const playerTwo = playerFactory(prompt('Enter player 2 name: '), 'O');
    let currentPlayer = playerOne;

    const playerClick = function () {
        if (!gameOver) {
            displayController.renderBoard();
            _toggleCurrentPlayer();
        }
    }

    const _toggleCurrentPlayer = function () {
        console.log(currentPlayer);
        if (currentPlayer == playerOne) {
            currentPlayer = playerTwo;
        }   else  {
            currentPlayer = playerOne;
        }
    }

    const getCurrentSymbol = function () {
        return currentPlayer.symbol;
    }

    return { getCurrentSymbol, playerClick }    
})();

displayController.setListeners();
