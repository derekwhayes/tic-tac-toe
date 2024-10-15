/* GAME BOARD */
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

/* PLAYER FACTORY */
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

/* GAME CONTROLLER */
const gameController = (() => {
    
    const player1 = Player(1);
    const player2 = Player(2);

    const setPlayer = () => {
        formData = sideBar.getFormData();
        let playerName;
        for (let info of formData) {
            playerName = info[1];
        }
        if (playerName) {
            player1.setName(playerName);
        }
        else {
            player1.setName('HUMAN!')
        }
        player2.setName('BoBot!');
        
        sideBar.changeSideBar();
    }

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
        setTimeout(() => displayController.cellSelector(cell), 1000); 
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
        getCurrPlayer,
        setPlayer,
        player1,
        player2
    }
})();

/* DOM STUFF */

/* DISPLAY CONTROLLER */
const displayController = (() => {
    const cells = document.querySelectorAll('.cellBtn');
    
    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener('click', () => cellSelector(i));
    }

    const render = () => {
        const b = gameBoard.getBoard();
        for (let i = 0; i < b.length; i++) {
            if (b[i] === 1) {
                cells[i].innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="190px" viewBox="0 -960 960 960" width="190px" fill="#FB8500"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>';
            }
            else if (b[i] === 2) {
                cells[i].innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="150px" viewBox="0 -960 960 960" width="150px" fill="#219EBC"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>';
            }
            else {
                cells[i].textContent = '';
            }  
        }
    }

    const cellSelector = (i) => {
        
        gameBoard.placeMark(i, gameController.getCurrPlayer().getNum());
        render();
        gameController.checkForWin(gameController.getCurrPlayer());
    }
    
    return {
        render,
        cellSelector
    };
})();

/* SIDE BAR CONTROLLER */
sideBar = (() => {
    const goBtn = document.querySelector("button[type='submit']")
    const form = document.querySelector('form');
    let formData;
    
    goBtn.addEventListener('click', (e) => {
        e.preventDefault();
        formData = new FormData(form, goBtn)
        gameController.setPlayer();
    });
    

    const changeSideBar = () => {
        const sideBar = document.querySelector('aside');
        const namesDiv = document.createElement('div');
        namesDiv.classList.add('sidebar-names');

        const humanName = document.createElement('h2');
        humanName.innerText = gameController.player1.getName();
        namesDiv.appendChild(humanName);

        const vsText = document.createElement('h2');
        vsText.innerText = 'vs';
        namesDiv.appendChild(vsText);

        const computerName = document.createElement('h2');
        computerName.innerText = gameController.player2.getName();
        namesDiv.appendChild(computerName);

        const startBtn = document.createElement('button');
        startBtn.classList.add('start-btn');
        startBtn.innerText = 'Start Game';
        // sideBar.append(namesDiv);
        sideBar.append(startBtn);
        form.replaceWith(namesDiv);
        
        startBtn.addEventListener('click', () => {
            startBtn.remove();
            gameController.newGame();
        });
    }

    const getFormData = () => {return formData};

    return {
        getFormData,
        changeSideBar
    }
})();