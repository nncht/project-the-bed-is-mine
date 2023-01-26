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
