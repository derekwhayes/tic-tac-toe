// IIFE?????
function GameBoard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    // make board 2d
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }
    return { board }
};

// val 0: empty 1: circle 2: cross
function Cell() {
    let val = 0;
    return { val };
}