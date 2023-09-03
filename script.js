

formatTextAreaPlaceholders();

let startScreenElement = document.getElementById("start-screen");
let gameplayScreenElement = document.getElementById("gameplay-screen");
let playersInputElement = document.getElementById("ta-players");
let finalBossesInputElement = document.getElementById("ta-bosses");
let playerForm = document.getElementById("player-form");

let players = new Players();

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
    displayNames();
    
}

function displayNames() {
    document.getElementById("test-result").textContent = players.getAllPlayers();
}

function showStartScreen() {
    startScreenElement.style.display = "block";
    gameplayScreenElement.style.display = "none";
}
