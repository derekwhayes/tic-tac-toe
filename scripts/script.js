const gameBoard = (() => {
    const board = [];

    const clearBoard = () => {
        for (let i = 0; i < 9; i++) {
            board.push(0);
        }
    }

    const getBoard = () => board;

    const placeMark = (cell, playerNum) => {
        console.log('placemark playerNum: ', playerNum);
        console.log('placeMark board[cell]:', board[cell]);
        if (board[cell] === 0) {
            board[cell] = playerNum;
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
        displayController.render();
        displayController.cellClicker(player);
    
        
    }

    const checkForWin = (player) => {
        console.log('checkForWin');
        const b = gameBoard.getBoard();
        const pNum = player.getNum();
        console.log(pNum);
        let isWinner = false;
        
        console.log(b[0], b[4], b[8]);
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
            console.log(`${player.getName()} WINS!!!`);
        }
        else {
            togglePlayer(player);
        }
    }

    const togglePlayer = (player) => {
        player === player1 ? takeTurn(player2) : takeTurn(player1);
    }

    return {
        newGame,
        checkForWin
    }
})();

/* DOM STUFF */
const displayController = (() => {
    const cells = document.querySelectorAll('button');

    const render = () => {
        const b = gameBoard.getBoard();
        // let index = 0;
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
            // index++;  
        }
    }

    const cellClicker = (player) => {
        for (let i = 0; i < cells.length; i++) {
            cells[i].addEventListener('click', () => {
                gameBoard.placeMark(i, player.getNum())
                render();
                gameController.checkForWin(player);
            });
        }
    }

    return {
        render,
        cellClicker
    };
})();

gameController.newGame();