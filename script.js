const GameBoard = (function () {
    let _gamePads = document.querySelectorAll(".gamePad");
    let _gameBoard = [];


    updateGameboard = (_gamePad) => {
        if (_gamePad.textContent === "") {
            let player = Game.getCurrentPlayer()
            player.addMark(_gamePad);
            _gameBoard.push(player.marker)
            console.log(_gameBoard)
            Game.switchPlayer();           
        }        
    }

    _gamePads.forEach((_gamePad) => _gamePad.addEventListener('click', () => {updateGameboard(_gamePad)}))
 
    function isOver() {
        
    }

    return {
        _gameBoard
    }
})()

const Player = (name, marker) => {
    let addMark = (_gamePad) => {
         _gamePad.textContent = marker;
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

    return {
        getCurrentPlayer,
        switchPlayer
    }
})();

