// const canvas = document.getElementById("main-canvas");
// const context = canvas.getContext("2d");

class Game {
    constructor(
        playersNames,
        sizeX,
        sizeY
    ) {
        this.playersNames = playersNames;
        console.log("got here" + this.playersNames);
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.players = [];
        this.props = new Properties();
        this.setCanvasSize();
    };

    setSize(sizeX, sizeY) {
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.setCanvasSize();
    };

    setCanvasSize() {
        canvas.height = this.sizeY;
        canvas.width = this.sizeX;
    };

    beginGame() {
        this.initPlayers();
        //this.animate();
    };

    initPlayers() {
        this.playersNames.forEach(player => {
            this.players.push(new Player(
                player, 
                this.sizeX /2,
                this.sizeY /2,
                this.props.mainTextColor,
                this.props
                )
            )
            console.log("Players: " + this.players);
        });
    };

    getPlayers() {
        return this.players;
    };

    drawFrame() {
        //console.log("drawFrame is being called!");
        context.fillStyle = "rgba(0,0,20,0.09)";
        context.fillRect(0, 0, this.sizeX, this.sizeY);
        this.players.forEach(player => {
            player.drawPlayer();
        });
    };

}