
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

    constructor(name, x, y, color, props) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.color = color;
        this.props = props;
        this.speedX = Math.random() * props.playerSpeedModifier;
        this.speedY = Math.random() * props.playerSpeedModifier;
    }

    drawPlayer() {
        if (this.x > canvas.width || this.x < 0) {
            this.speedX *= -1;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.speedY *= -1;
        }
        this.x += this.speedX;
        this.y += this.speedY;
        context.fillStyle = this.color;
        context.font = "20px Consolas";
        context.fillText(this.name, this.x, this.y);
    }
}