
/*
Player: Object that stores the name of a player
and can draw itself in a given position
params:
    name: string

functions:
    draw(x, y, scale)
    x = x postion
    y = y postion
    scale = 0 < scale < 1 multiplier for size
*/
class Player {

    constructor(name, x, y, props, playerCanvas) {
        this.props = props;
        this.name = name;
        this.canvas = playerCanvas;
        this.x = x;
        this.y = y;
        this.setRandomPosition();
        this.color = generateColor();
        this.shadowColor = this.color;
        this.blur = this.props.mainTextBlur;
        this.font = this.props.textPlayer;
        this.setRandomSpeeds();
        this.isCurrentPlayer = false;
        this.isNextPlayer = false;
    }

    getName() {
        return this.name;
    }

    getHeight() {
        // lower number = higher on screen
        return this.y;
    }

    resetPlayer() {
        this.x = this.canvas.width / 2;
        this.y = this.canvas.height - 20; // near bottom
        this.color = this.props.mainTextColor;
        this.blur = this.props.mainTextBlur;
        this.shadowColor = this.props.mainTextShadowColor;
        this.font = this.props.textPlayer;
        this.setRandomSpeeds();
        this.isCurrentPlayer = false;
        this.isNextPlayer = false;
    }

    setSpeed(speedX, speedY) {
        this.speedX = speedX;
        this.speedY = speedY;
    }
    
    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    setIsCurrentPlayer() {
        this.font = this.props.textCurrentPlayer;
        this.color = this.props.heroTextColor;
        this.shadowColor = this.props.heroShadowColor;
        this.blur = this.props.heroTextBlur;
        this.isCurrentPlayer = true;
        this.isNextPlayer = false;
    }

    setIsNextPlayer() {
        this.font = this.props.textNextPlayer;
        //this.color = this.props.sidekickTextColor;
        //this.shadowColor = this.props.sidekickShadowColor;
        this.blur = this.props.sidekickTextBlur;
        this.isCurrentPlayer = false;
        this.isNextPlayer = true;
    }

    drawPlayer() {
        this.calculatePosition();
        this.drawText();
    }

    drawAsCurrentPlayer() {
        context.textAlign = "center";
        context.fillStyle = this.color;
        context.font = this.font;
        context.fillText(this.name, this.canvas.width / 2, 40);
    }

    drawText() {
        context.textAlign = "center";
        context.strokeStyle = this.shadowColor;
        context.font = this.font;
        context.filter = this.blur;
        context.strokeText(this.name, this.x, this.y);
        context.strokeStyle = this.color;
        context.filter = "blur(0px)";
        context.strokeText(this.name, this.x, this.y);
    }

    calculatePosition() {
        if (this.x > this.canvas.width || this.x < 0) {
            this.speedX *= -1;
        }
        if (this.y > this.canvas.height || this.y < this.canvas.height * 0.4) {
            this.speedY *= -1;
        }
        this.x += this.speedX;
        this.y += this.speedY;
        this.bringMeHome();
    }

    bringMeHome() {
        if (
            this.x > this.canvas.width + 2
            || this.x < -2
            || this.y > this.canvas.height + 2
            || this.y < -2
            ) {
                this.x = this.canvas.width / 2;
                this.y = this.canvas.height / 2;
        }
    }

    setRandomSpeeds() {
        this.speedX = (Math.random() - 0.5) * this.props.playerSpeedModifier;
        this.speedY = (Math.random() - 0.5) * this.props.playerSpeedModifier;
    }

    setRandomPosition() {
        this.x = this.canvas.width * Math.random();
        this.y = ((this.canvas.height * 0.6) * Math.random()) + this.canvas.height * 0.4;
    }
}