const canvas = document.getElementById("main-canvas");
const context = canvas.getContext("2d");

formatTextAreaPlaceholders();

let startScreenElement = document.getElementById("start-screen");
let gameplayScreenElement = document.getElementById("gameplay-screen");
let playersInputElement = document.getElementById("ta-players");
let finalBossesInputElement = document.getElementById("ta-bosses");
let playerForm = document.getElementById("player-form");

let players = new Players();
let game;

playerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    startGame();
})



function startGame() {
    players.loadPlayersFromText(
        playersInputElement.value,
        finalBossesInputElement.value
    );
    if (!players.hasPlayers()) {
        return;
    }
    players.randomizePlayers();
    startScreenElement.style.display = "none";
    gameplayScreenElement.style.display = "block";
    game = new Game(
        players.getPlayers(),
        players.getFinalBosses(),
        canvas
        );
    game.beginGame();
    animate();
}

function nextPlayer() {
    game.selectCurrentPlayers();
}

function sendPlayerBack() {
    game.sendPlayerBack();
}

function addParkingLot() {
    if(!game.getPlayers()) {
        return;
    }
    if (document.getElementById("ta-parking-lots").value == "") {
        document.getElementById("ta-parking-lots").value += game.getCurrentPlayerName() + " - ";
    } else {
        document.getElementById("ta-parking-lots").value += "\n" +game.getCurrentPlayerName() + " - ";
    }
}

addEventListener("resize", () => {
    if (game) {
        game.setSize();
    }
})

function showStartScreen() {
    startScreenElement.style.display = "block";
    gameplayScreenElement.style.display = "none";
}

function animate() {
    requestAnimationFrame(animate);
    game.drawFrame();
}