const GameBoard = (function () {
    let _gamePads = document.querySelectorAll(".gamePad");
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let restartButton = document.querySelector("#restart");
    let winInfo = document.querySelector(".win");

    _updateGameboard = (gamePad) => {
        if (gamePad.textContent === "") {
            let player = Game.getCurrentPlayer()
            let num = player.addMark(gamePad);
            gameBoard.splice(num, 1, player.marker);
            if (Game.isOver()) {
                _gamePads.forEach((gamePad) => gamePad.removeEventListener('click', _gamePadHandler));
                winInfo.textContent = "Win";
                winInfo.classList.add("visible");
            }
            else if (Game.isOver() === null) {
                winInfo.textContent = "Tie";
                winInfo.classList.add("visible");
            }
            else Game.switchPlayer();
            return
        }
    }

    _gamePadHandler = (e) => {
        _updateGameboard(e.target);
    }
    _gamePads.forEach((gamePad) => gamePad.addEventListener('click', _gamePadHandler));

    restart = () => {
        _gamePads.forEach((gamePad) => {
            gamePad.textContent = ""
            gamePad.addEventListener('click', _gamePadHandler)
        });
        gameBoard.forEach((element, index, arr) => { arr[index] = "" });
        document.querySelector(".currentlyPlaying").textContent = "1";
        winInfo.classList.remove("visible");
    }

    restartButton.addEventListener('click', restart);

    return {
        gameBoard,
    }
})()

const Player = (name, marker) => {
    let addMark = (gamePad) => {
        gamePad.textContent = marker;
        return gamePad.dataset.num
    }
    return {
        name,
        marker,
        addMark
    }
}

const Game = (function () {
    let player1 = Player("tony", "X");
    let player2 = Player("many", "O");

    let winningCombinations = [
        [0, 1, 2], [3, 4, 5],
        [6, 7, 8], [0, 3, 6],
        [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    function getCurrentPlayer() {
        let player
        document.querySelector(".currentlyPlaying").textContent === "1" ? player = player1 : player = player2;
        return player;
    }

    function switchPlayer() {
        let playerId = document.querySelector(".currentlyPlaying").textContent;
        playerId === "1" ? document.querySelector(".currentlyPlaying").textContent = "2" : document.querySelector(".currentlyPlaying").textContent = "1";
        return
    }

    isOver = () => {
        let player1Game = [];
        let player2Game = [];
        let end = false;
        for (let i = 0; i < GameBoard.gameBoard.length; i++) {
            if (GameBoard.gameBoard[i] === player1.marker) player1Game.push(i);
            else if (GameBoard.gameBoard[i] === player2.marker) player2Game.push(i);
        }


        //Look for 3 in a row
        winningCombinations.forEach((combination) => {
            if (combination.every((index) => {
                return player1Game.includes(index);
            }) || combination.every((index) => {
                return player2Game.includes(index);
            })) {
                end = true;
            }
        })

        //Look for tie
        if (player1Game.length + player2Game.length === 9 && end === false) end = null;

        return end
    }

    return {
        getCurrentPlayer,
        switchPlayer,
        isOver,
    }
})();