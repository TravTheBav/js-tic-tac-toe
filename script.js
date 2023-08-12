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

    const threeInARow = function () {
        if (_completeRow() || _completeCol() || _completeDiagonal()) {
            return true;
        }   else  {
            return false;
        }
    }

    const _completeRow = function () {
        for (let i = 0; i < board.length; i++) {
            if (_allEqual(board[i])) {
                return true;
            }
        }
        return false;
    }

    const _completeCol = function () {
        cols = [[], [], []];
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {
                cols[j].push(board[i][j]);
            }
        }

        for (let i = 0; i < 3; i++) {
            if (_allEqual(cols[i])) {
                return true;
            }
        }
        return false;
    }

    const _completeDiagonal = function () {
        diagOne = [board[0][0], board[1][1], board[2][2]];
        diagTwo = [board[2][0], board[1][1], board[0][2]];

        if (_allEqual(diagOne) || _allEqual(diagTwo)) {
            return true;
        }   else  {
            return false;
        }
    }

    const _allEqual = (arr) => {
        return arr.every(ele => ele === arr[0] && ele != null);
    }

    return { board, updatePos, threeInARow }
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

    const getCurrentSymbol = function () {
        return currentPlayer.symbol;
    }

    const playerClick = function () {
        if (!gameOver) {
            displayController.renderBoard();
            if (gameBoard.threeInARow()) {
                gameOver = true;
                setTimeout(() => {
                    window.alert(`${currentPlayer.name} wins this round`)
                }, 100);
            }
            _toggleCurrentPlayer();
        }
    }

    const _toggleCurrentPlayer = function () {
        if (currentPlayer == playerOne) {
            currentPlayer = playerTwo;
        }   else  {
            currentPlayer = playerOne;
        }
    }

    return { getCurrentSymbol, playerClick }    
})();

displayController.setListeners();
