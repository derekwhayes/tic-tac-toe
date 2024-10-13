const cells = document.querySelectorAll('.cellBtn');
const form = document.querySelector('form');
for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', () => displayController.clickHandler(i));
}

const sideBar = (() => {
    const goBtn = document.querySelector("button[type='submit']")
    const player1 = Player(1);
    const player2 = Player(2);
    
    const setPlayers = () => {
        goBtn.addEventListener('click', (e) => {
            e.preventDefault();
            let formData = new FormData(form, goBtn)
            let playerName;
            for (let info of formData) {
                playerName = info[1];
            }
            player1.setName(playerName);
            player2.setName('BoBot');

            changeSideBar();
        });
    }

    const changeSideBar = () => {
        const names = document.createElement('h2');
        names.textContent = `${player1.getName()} vs BoBot!`;
        form.replaceWith(names);
    }

    return {setPlayers}
})();

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

    let currPlayer;
    

    const newGame = () => {
        gameBoard.clearBoard(); 
        
        const playsFirst = Math.floor(Math.random() * 2);
        if (playsFirst === 0) {
            currPlayer = player1;
        }
        else {
            currPlayer = player2;
        }
        takeTurn(currPlayer);
    }

    const takeTurn = (player) => {
        console.log(`${player.getName()}'s turn.`);
        displayController.render();
        
        // handle AI opponent
        let cell;
        b = gameBoard.getBoard();
        if (player === player2) {
        do {   
            cell = Math.floor(Math.random() * 9);
            console.log(cell);
        } while (b[cell] > 0);

        // delay pc opponent. anon function needed because clickHandler is a function call not just a function. this is driving me nuts
        setTimeout(() => displayController.clickHandler(cell), 1000); 
        }
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
        player === player1 ? currPlayer = player2 : currPlayer = player1;
        takeTurn(currPlayer);
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

    const getCurrPlayer = () => {
        return currPlayer;
    }
    
    return {
        newGame,
        checkForWin,
        getCurrPlayer
    }
})();

/* DOM STUFF */
const displayController = (() => {

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

    const clickHandler = (i) => {
        
        gameBoard.placeMark(i, gameController.getCurrPlayer().getNum());
        render();
        gameController.checkForWin(gameController.getCurrPlayer());
    }
    
    return {
        render,
        clickHandler
    };
})();

sideBar.setPlayers();