const myGameArea = {
  canvas: document.createElement("canvas"),
  components: [],
  headProgress: 0,
  bodyProgress: 0,
  legsProgress: 0,
  isGameOver: false,
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
    if (player.checkCollision(head)) {
      player.x = 320;
      myGameArea.headProgress += 0.5;
      console.log(myGameArea.headProgress);
    } else if (player.checkCollision(body)) {
      player.x = 320;
      myGameArea.bodyProgress += 0.5;
      console.log(myGameArea.bodyProgress);
    } else if (player.checkCollision(legs)) {
      player.x = 320;
      myGameArea.legsProgress += 0.5;
      console.log(myGameArea.legsProgress);
    }
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

  checkCollision(otherComponent) {
    if (
      this.x < otherComponent.x + otherComponent.w &&
      this.x + this.w > otherComponent.x &&
      this.y < otherComponent.y + otherComponent.h &&
      this.y + this.h > otherComponent.y
    ) {
      return true;
    } else {
      return false;
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
    if (this.x < 250) {
      this.x = 250;
    } else {
      this.x -= 10;
    }
  }

  moveRight() {
    if (this.x > 349) {
      this.x = 349;
    } else {
      this.x += 10;
    }
  }
  moveUp() {
    if (this.y < 10) {
      this.y = 10;
    } else {
      this.y -= 10;
    }
  }
  moveDown() {
    if (this.y > 426) {
      this.y = 426;
    } else {
      this.y += 10;
    }
  }
}

class Target extends Component {
  constructor(x, y, w, h) {
    super(x, y, w, h);
    this.img = new Image();
    this.img.src = "./images/owner_asleep.png";
  }
}

class Background extends Component {
  constructor(x, y, w, h) {
    super(x, y, w, h);
    this.img = new Image();
    this.img.src = "./images/background.png";
  }
}

class ProgressBar {
  constructor(element, initialValue = 0) {
    this.valueElem = element.querySelector(".progress-bar-value");
    this.fillElem = element.querySelector(".progress-bar-fill");

    this.setValue(initialValue);
  }

  setValue(newValue) {
    if (newValue < 0) {
      newValue = 0;
    }

    if (newValue > 100) {
      newValue = 100;
    }

    myGameArea.headProgress = newValue;
    this.update();
  }

  update() {
    const percentage = myGameArea.headProgress + "%";
    this.fillElem.style.width = percentage;
    this.valueElem.textContent = percentage;
    console.log(percentage);
  }
}

myGameArea.start();

// Render background
let background = new Background(
  0,
  0,
  myGameArea.canvas.width,
  myGameArea.canvas.height
);

myGameArea.components.push(background);

// Sleeping person
let target = new Target(430, 40, 150, 470);
myGameArea.components.push(target);

// Collision hitboxes for head, body and legs
let head = new Component(450, 38, 100, 120, "red");
myGameArea.components.push(head);

let body = new Component(450, 200, 100, 140, "yellow");
myGameArea.components.push(body);

let legs = new Component(450, 380, 100, 135, "green");
myGameArea.components.push(legs);

// Dog
let player = new Player(270, 200, 100, 100);
myGameArea.components.push(player);

// Progress bar
let headBar = new ProgressBar(document.querySelector(".progress-bar"), 25);

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
