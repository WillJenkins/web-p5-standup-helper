
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

    constructor(name, properties) {
        this.name = name;
        this.props = properties;
    }

    draw(x, y, scale) {
        fill(this.props.mainTextColor);
        textFont(this.props.textMainFont);
        textSize(scale * this.props.textHeaderSize);
        text(this.name, x, y);
    }
}