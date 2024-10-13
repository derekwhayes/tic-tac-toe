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
        
        player1.setName('Derek');
        player2.setName('BoBot'); 
        
        const playsFirst = Math.floor(Math.random() * 2);
        if (playsFirst === 0) {
            takeTurn(player1);
        }
        else {
            takeTurn(player2);
        }
    }

    const takeTurn = (player) => {
        console.log(`${player.getName()}'s turn.`);
        console.log(gameBoard.getBoard());
        // player placeMark()'s 
        gameBoard.placeMark(0, 0, 1);
        gameBoard.placeMark(0, 1, 1);
        gameBoard.placeMark(0, 2, 1);

        const gameStatus = checkForWin();
        // console.log(gameStatus);
        switch (gameStatus) {
            case 1:
                console.log(`${player1.getName} WINS!!!`);
                break;
            case 2:
                console.log(`${player2.getName} WINS!!!`);
                break;
            case 0:
                console.log(`CATS!!!`);
                break;
            default:
                togglePlayer(player);
        }
    }

    const checkForWin = () => {
        const b = gameBoard.getBoard();
        console.log(b);
        let p1Count = 0;
        let p2Count = 0;
        let emptyCount = 0;
        // check rows
        for (let i = 0; i < b.length; i++) {
            p1Count = 0;
            p2Count = 0;
            for (let j = 0; j < b.length; j++) {
                if (b[i][j] === 1) {
                    p1Count++;
                }
                else if (b[i][j] === 2) {
                    p2Count++;
                }
                else {
                    emptyCount++;
                }

                // console.log(p1Count);
                if (p1Count === 3) {
                    return 1;
                }
                else if (p2Count === 3) {
                    return 2;
                }
            }
        }
        // check columns
        for (let i = 0; i < b.length; i++) {
            p1Count = 0;
            p2Count = 0;
            for (let j = 0; j < b.length; j++) {
                if (b[j][i] === 1) {
                    p1Count++;
                }
                else if (b[j][i] === 2) {
                    p2Count++;
                }
                else {
                    emptyCount++;
                }

                if (p1Count === 3) {
                    return 1;
                }
                else if (p2Count === 3) {
                    return 2;
                }
            }
        }
        // check for cross win
        if (b[0][0] === 1 && b[1][1] === 1 && b[2][2] === 1 || b[0][2] === 1 && b[1][1] === 1 && b[2][0] === 1) {
            return 1;
        }
        else if (b[0][0] === 2 && b[1][1] === 2 && b[2][2] === 2 || b[0][2] === 2 && b[1][1] === 2 && b[2][0] === 2) {
            return 2;
        }
        else if (emptyCount === 0) {
            return 0;
        }
        
        return -1;
    }

    const togglePlayer = (player) => player === player1 ? takeTurn(player2) : takeTurn(player1);

    return {
        newGame
    }
})();

gameController.newGame();