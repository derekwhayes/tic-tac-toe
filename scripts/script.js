// IIFE?????
const gameBoard = (() => {
    const rows = 3;
    const columns = 3;
    const board = [];

    const clearBoard = () => {
        for (let i = 0; i < rows; i++) {
            board[i] = [];
            for (let j = 0; j < columns; j++) {
                board[i].push(0);
            }
        }
    }

    const getBoard = () => board;

    const placeMark = (row, column, playerNum) => {
        if (board[row][column] === 0) {
            board[row][column] = playerNum;
        }
        else {
            console.log('pick empty cell');
        }
    }

    return {
        clearBoard,
        getBoard,
        placeMark
    }
    
})();

function Player(num) {
    let name;
    this.num = num;
    
    const getName = () => name;
    const getNum = () => num

    const setName = (userName) => name = userName;

    return {
        getName,
        getNum,
        setName
    }
}

const gameController = (() => {

    const player1 = Player(1);
    const player2 = Player(2);

    const newGame = () => {
        gameBoard.clearBoard();
        
        player1.setName(prompt("What is player1's name?"));
        player2.setName(prompt("What is player2's name?"));   
    }

    return {
        newGame
    }
})();

gameController.newGame();