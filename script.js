const GameBoard = (function () {
    let _gamePads = document.querySelectorAll(".gamePad");
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    updateGameboard = (_gamePad) => {
        if (_gamePad.textContent === "") {
            let player = Game.getCurrentPlayer()
            let num = player.addMark(_gamePad);
            gameBoard.splice(num, 1, player.marker);
            if (Game.isOver()) console.log("over")
            else Game.switchPlayer();        
            return          
        }        
    }
    _gamePads.forEach((_gamePad) => _gamePad.addEventListener('click', () => {updateGameboard(_gamePad)}))  
    return {
        gameBoard
    }
})()

const Player = (name, marker) => {
    let addMark = (_gamePad) => {
         _gamePad.textContent = marker;
         return _gamePad.dataset.num
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

    function isOver() {
        let player1Game = [];
        let player2Game = [];
        let end = false;

        for(let i = 0; i < GameBoard.gameBoard.length; i++) {
            if(GameBoard.gameBoard[i] === player1.marker) player1Game.push(i)
            else if(GameBoard.gameBoard[i] === player2.marker) player2Game.push(i)
        }
        
        winningCombinations.forEach((combination) => {
            if (combination.every((index) => {
                return player1Game.includes(index);
            }) || combination.every((index) => {
                return player2Game.includes(index);
            })) {
                end = true;
            }
        })

        return end
    }


    return {
        getCurrentPlayer,
        switchPlayer,
        isOver
    }
})();

