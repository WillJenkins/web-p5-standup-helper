// const canvas = document.getElementById("main-canvas");
// const context = canvas.getContext("2d");

class Game {
    currentPlayer;
    nextPlayer;

    constructor(
        playersNames,
        finalBossesNames,
        mainCanvas
    ) {
        this.mainCanvas = mainCanvas;
        this.mainContext = mainCanvas.getContext("2d");
        this.playersNames = playersNames;
        this.finalBossesNames = finalBossesNames;
        console.log("got here" + this.playersNames);
        this.setSize();
        this.players = [];
        this.props = new Properties();
        this.setCanvasSize();
    };

    setSize() {
        this.sizeX = innerWidth * 0.9;
        this.sizeY = innerHeight / 2;
        this.setCanvasSize();
    };

    setCanvasSize() {
        this.mainCanvas.height = this.sizeY;
        this.mainCanvas.width = this.sizeX;
    };

    getCurrentPlayerName() {
        return this.currentPlayer.getName();
    }

    beginGame() {
        this.initPlayers();
        this.selectCurrentPlayers();
        //this.animate();
    };

    initPlayers() {
        this.playersNames.forEach(player => {
            this.players.push(new Player(
                player, 
                this.sizeX /2,
                this.sizeY /2,
                this.props,
                this.mainCanvas
                )
            )
            console.log("Players: " + this.players);
        });
    };

    getPlayers() {
        return this.players;
    };

    selectCurrentPlayers() {
        if (this.nextPlayer) {
            this.currentPlayer = this.nextPlayer;
        } else {
            this.currentPlayer = this.players.pop();
        }
        this.nextPlayer = this.players.pop();
        this.preparePlayers();
    }

    preparePlayers() {
        if (this.currentPlayer) {
            this.currentPlayer.setSpeed(0, 0);
            this.currentPlayer.setPosition(this.sizeX / 2, 50);
            this.currentPlayer.setIsCurrentPlayer();
        }

        if(this.nextPlayer) {
            this.nextPlayer.setSpeed(0, 0);
            this.nextPlayer.setPosition(this.sizeX / 2, 100);
            this.nextPlayer.setIsNextPlayer();
        }
    }

    sendPlayerBack() {
        this.currentPlayer.resetPlayer();
        this.players.unshift(this.currentPlayer);
        this.selectCurrentPlayers();
    }

    drawFrame() {
        this.drawBackground();
        this.drawBorder();
        this.drawPlayers();
        this.drawLineOfDefense();
    };

    drawBackground() {
        this.mainContext.fillStyle = this.props.globalBackgroundColor;
        this.mainContext.fillRect(0, 0, this.sizeX, this.sizeY);
    }

    drawPlayers() {
        this.players.forEach(player => {
            player.drawPlayer();
        });
        if (this.currentPlayer) {
            this.currentPlayer.drawPlayer();
        }
        if (this.nextPlayer) {
            this.nextPlayer.drawPlayer();
        }
        if (this.players.length == 0) {
            this.playersNames = this.finalBossesNames;
            this.finalBossesNames = [];
            this.initPlayers();
        }
    }

    drawBorder() {
        this.mainContext.beginPath();
        this.mainContext.strokeStyle = this.props.mainTextColor;
        this.mainContext.lineWidth = 2;
        this.mainContext.rect(2, 2, this.sizeX - 4, this.sizeY - 4);
        this.mainContext.stroke();
    }

    drawLineOfDefense() {
        this.mainContext.beginPath();
        this.mainContext.strokeStyle = this.props.mainTextColor;
        this.mainContext.lineWidth = 2;
        this.mainContext.moveTo(2, this.mainCanvas.height * 0.35);
        this.mainContext.lineTo(this.mainCanvas.width - 2, this.mainCanvas.height * 0.35);
        this.mainContext.filter = "blur(4px)";
        this.mainContext.stroke();
        this.mainContext.filter = "blur(0px)";
        this.mainContext.stroke();
    }

}