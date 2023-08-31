
let props;
let player, input; //delete this

function setup() {
    createCanvas(windowWidth, windowHeight);
    this.props = new Properties();
    this.player = new Player("Atlas", this.props);
    this.input = createInput();
    //input.position(100, 50);
}
  
function draw() {
    background(this.props.globalBackgroundColor);
    this.player.draw(100, 100, 0.5);
}