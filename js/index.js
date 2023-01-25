const myGameArea = {
  canvas: document.createElement("canvas"),
  components: [],
  start: function () {
    this.canvas.width = 1024;
    this.canvas.height = 576;
    this.ctx = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
  },
  update: function () {
    myGameArea.components.forEach((component) => {
      component.render();
    });
  },
};

class Component {
  constructor(x, y, w, h, color) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    if (color) this.color = color;
  }

  render() {
    const ctx = myGameArea.ctx;
    if (this.img) {
      ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    } else if (this.color) {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.w, this.h);
    }
  }
}

class Player extends Component {
  constructor(x, y, w, h) {
    super(x, y, w, h);
    this.img = new Image();
    this.img.src = "./images/dog_awake.png";
  }

  moveLeft() {
    this.x -= 20;
  }

  moveRight() {
    this.x += 20;
  }
  moveUp() {
    this.y -= 20;
  }
  moveDown() {
    this.y += 20;
  }
}

class Target extends Component {
  constructor(x, y, w, h) {
    super(x, y, w, h);
    this.img = new Image();
    this.img.src = "./images/owner_asleep.png";
  }
}

myGameArea.start();

let background = new Component(
  0,
  0,
  myGameArea.canvas.width,
  myGameArea.canvas.height,
  "pink"
);
myGameArea.components.push(background);

let player = new Player(350, 200, 100, 100);
myGameArea.components.push(player);

let target = new Target(500, 50, 150, 470);
myGameArea.components.push(target);

setInterval(myGameArea.update, 1000 / 30);

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "w":
      player.moveUp();
      break;
    case "a":
      player.moveLeft();
      break;
    case "s":
      player.moveDown();
      break;
    case "d":
      player.moveRight();
      break;
    case " ":
      console.log("pressed space key");
      break;
  }
});
