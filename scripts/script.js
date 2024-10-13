const gameBoard = (() => {
    let board = [];

    const clearBoard = () => {
        board = [];
        for (let i = 0; i < 9; i++) {
            board.push(0);
        }
    }

    const getBoard = () => board;

    const placeMark = (cell, playerNum) => {
        console.log('placemark playerNum: ', playerNum);
        if (board[cell] === 0) {
            board[cell] = playerNum;
        }
        console.log('placeMark board[cell]:', board[cell]);
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
        displayController.render();
        displayController.cellClicker(player);
    
        
    }

    const checkForWin = (player) => {
        const b = gameBoard.getBoard();
        const pNum = player.getNum();
        let isWinner = false;
        let isBoardFull = true;
        
        // check for cross win
        if (b[0] === pNum && b[4] === pNum && b[8] === pNum || b[2] === pNum && b[4] === pNum && b[6] === pNum) {
            isWinner = true;
        }
        // check for row win
        else if (b[0] === pNum && b[1] === pNum && b[2] === pNum || b[3] === pNum && b[4] === pNum && b[5] === pNum || b[6] === pNum && b[7] === pNum && b[8] === pNum) {
            isWinner = true;
        }
        else if (b[0] === pNum && b[3] === pNum && b[6] === pNum || b[1] === pNum && b[4] === pNum && b[7] === pNum || b[2] === pNum && b[5] === pNum && b[8] === pNum) {
            isWinner = true;
        }
        
        if (isWinner) {
            
            endGame(player.getName());
        }
        else {
            // check for empty spots on the board
            for (let i = 0; i < b.length; i++) {
                if (b[i] === 0) {
                    isBoardFull = false;
                }
            }
            if (isBoardFull) {
                endGame(-1);
            }
            else {
                togglePlayer(player);
            }
        }
    }

    const togglePlayer = (player) => {
        player === player1 ? takeTurn(player2) : takeTurn(player1);
    }

    
    const endGame = (winner) => {
        if (winner === -1) {
            alert(`CATS game! It's a tie!`);
        }
        else {
            alert(`Congratulations! ${winner} is our winner!`);
        }
        newGame();
    }
    
    return {
        newGame,
        checkForWin
    }
})();

/* DOM STUFF */
const displayController = (() => {
    const cells = document.querySelectorAll('button');
    // make array that holds individual handlers
    const handlers = [];

    const render = () => {
        const b = gameBoard.getBoard();
        for (let i = 0; i < b.length; i++) {
            if (b[i] === 1) {
                cells[i].textContent = 'X';
            }
            else if (b[i] === 2) {
                cells[i].textContent = 'O';
            }
            else {
                cells[i].textContent = '';
            }  
        }
    }

    const clickHandler = (i, player) => {
        gameBoard.placeMark(i, player.getNum())
        render();
        gameController.checkForWin(player);
    }
    
    // has to be a way to handle clicks without passing arguments so we can avoid this hack
    const cellClicker = (player) => {
        for (let i = 0; i < cells.length; i++) {
            if (handlers[i]) {
                cells[i].removeEventListener('click', handlers[i]);
            }

            // make function call anonymous so it won't run immediately
            const newHandler = () => clickHandler(i, player);

            handlers[i] = newHandler;

            cells[i].addEventListener('click', newHandler);
        }
    }

    return {
        render,
        cellClicker
    };
})();

gameController.newGame();