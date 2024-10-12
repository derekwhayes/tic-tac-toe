// IIFE?????
const gameBoard = (() => {
    const rows = 3;
    const columns = 3;
    const board = [];

    // make board 2d
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(0);
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
        getBoard,
        placeMark
    }
    
})();

function Player() {
    let name;
    let num;
    
    const getName = () => name;
    const getNum = () => num

    const setName = (userName) => name = userName;
    const setNum = (userNum) => num = userNum;

    return {
        getName,
        getNum,
        setName,
        setNum
    }
}

