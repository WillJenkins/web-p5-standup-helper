const canvas = document.getElementById("cw");
const context = canvas.getContext("2d");
context.globalAlpha = 0.5;

const cursor = {
    x: innerWidth / 2,
    y: innerHeight / 2
};

let particlesArray = [];

generateParticles(9);
setSize();
animate();

addEventListener("mousemove", (e) => {
    cursor.x = e.clientX;
    cursor.y = e.clientY;
});

addEventListener("resize", () => setSize());


function generateParticles(amount) {
    for (let i = 0; i < amount; i++) {
        particlesArray[i] = new Particle(
            innerWidth / 2,
            innerHeight / 2,
            5,
            generateColor(),
            0.01
        );
    }
}

function generateColor() {
    let hexSet = "0123456789ABCDEF";
    let finalHexString = "#";
    for (let i = 0; i < 6; i++) {
        finalHexString += hexSet[Math.ceil(Math.random() * 15)];
    }
    return finalHexString;
}

function setSize() {
    canvas.height = innerHeight;
    canvas.width = innerWidth;
}

function Particle(x, y, particleTrailWidth, strokeColor, rotationSpeed) {
    this.x = x;
    this.y = y;
    this.particleTrailWidth = particleTrailWidth;
    this.strokeColor = strokeColor;
    this.theta = Math.random() * Math.PI * 2;
    this.rotationSpeed =rotationSpeed;
    this.t = Math.random() * 250;

    this.rotate = () => {
        const ls = {
            x: this.x,
            y: this.y
        };
        this.theta += this.rotationSpeed;
        this.x = cursor.x + Math.cos(this.theta) * this.t;
        this.y = cursor.y + Math.sin(this.theta) * this.t;
        // context.beginPath();
        // context.lineWidth = this.particleTrailWidth;
        // context.strokeStyle = this.strokeColor;
        // context.moveTo(ls.x, ls.y);
        // context.lineTo(this.x, this.y);
        // context.stroke();
        context.fillStyle = this.strokeColor;
        context.font = "20px Consolas";
        context.fillText("Hello Atlas", ls.x, ls.y);
    };
}

function animate() {
    requestAnimationFrame(animate);

    context.fillStyle = "rgba(0,0,16,0.09)";
    context.fillRect(0, 0, canvas.width, canvas.height);

    particlesArray.forEach((particle) => particle.rotate());
    drawBox();
}

function drawBox() {
    context.beginPath();
    context.lineWidth = 2;
    context.strokeStyle = "rgba(50,255,255,0.2";
    context.rect(20, 20, 200, 100);
    context.filter = "blur(6px)";
    context.stroke();
    context.strokeStyle = "rgba(50,255,255,1";
    context.filter = "blur(0)"
    context.stroke();
}