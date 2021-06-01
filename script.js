const GameBoard = (function () {
    let _game = [];
    let _gamePads = document.querySelectorAll(".gamePad");
    let play = (marker) => {_game.push(marker)}
    let populateDisplay =  () => {
        for (let i = 0; i < _gamePads.length; i++) {
            _gamePads[i].textContent = _game[i];
        }
    }
    return {
        populateDisplay,
        play
    }
})()

const Player = (name, marker) => {
    return {
        name,
        marker
    }
}


