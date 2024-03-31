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
let resetReady = false;
let props = new Properties();

playerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    startGame();
})

selectTheme(); // sets the theme based on the currently selected dropdown item in "theme-select"

console.log(window.getComputedStyle(document.getElementById("main-text")).color);

function startGame() {
    props.initTheme();
    players.loadPlayersFromText(
        playersInputElement.value,
        finalBossesInputElement.value
    );
    if (!players.hasPlayers()) {
        return;
    }
    players.randomizePlayers();
    showGameScreen();
    game = new Game(
        players.getPlayers(),
        players.getFinalBosses(),
        props,
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
        game.preparePlayers();
    }
})

function resetGame() {
    if (resetReady) {
        showStartScreen();
    } else {
        resetReady = true;
        document.getElementById("reset-button").innerText = "Confirm";
    }
}

function showStartScreen() {
    startScreenElement.style.display = "block";
    gameplayScreenElement.style.display = "none";
}

function showGameScreen() {
    resetReady = false;
    document.getElementById("reset-button").innerText = "Reset";
    startScreenElement.style.display = "none";
    gameplayScreenElement.style.display = "block";
}

function animate() {
    requestAnimationFrame(animate);
    game.drawFrame();
}

function selectTheme() {
    document.getElementById("main-body").className = "";
    document.getElementById("main-body").classList.add(document.getElementById("theme-select").value);
    props.initTheme();
}