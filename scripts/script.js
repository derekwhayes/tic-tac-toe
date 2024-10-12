// IIFE?????
function GameBoard() {
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

    const placeMark = (row, column, player) => {
        board[row][column] = player;
    }

    return {
        getBoard,
        placeMark
    }
    
};


