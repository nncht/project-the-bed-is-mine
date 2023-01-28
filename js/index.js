const myGameArea = {
  canvas: document.createElement("canvas"),
  components: [],
  headProgress: 0,
  buttProgress: 0,
  legsProgress: 0,
  aboutToWake: false,
  isAwake: false,
  pretendAsleep: false,
  remainingLives: 3,
  isGameStarted: false,
  isGamePaused: false,
  isGameWon: false,
  isGameOver: false,
  start: function () {
    this.canvas.width = 1024;
    this.canvas.height = 576;
    this.ctx = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[2]);
  },
  update: function () {
    myGameArea.components.forEach((component) => {
      component.render();
    });

    if (myGameArea.isAwake === false && myGameArea.aboutToWake === false) {
      target.render();
      zzz.render();
    } else if (
      myGameArea.isAwake === false &&
      myGameArea.aboutToWake === true
    ) {
      target.render();
    } else if (myGameArea.isAwake === true) {
      targetAwake.render();
    }

    if (myGameArea.remainingLives === 3) {
      heart1.render();
      heart2.render();
      heart3.render();
    } else if (myGameArea.remainingLives === 2) {
      heart1.render();
      heart2.render();
    } else if (myGameArea.remainingLives === 1) {
      heart1.render();
    } else {
      console.log("Game Over!");
    }

    // Increment progress values
    if (player.checkCollision(head)) {
      player.x = 320;
      myGameArea.headProgress += 10;
      headBar.setValue(myGameArea.headProgress);
    } else if (player.checkCollision(butt)) {
      player.x = 320;
      myGameArea.buttProgress += 10;
      buttBar.setValue(myGameArea.buttProgress);
    } else if (player.checkCollision(legs)) {
      player.x = 320;
      myGameArea.legsProgress += 10;
      legsBar.setValue(myGameArea.legsProgress);
    }

    // Pause
    if (myGameArea.isGamePaused === true) {
      clearTimeout(timeoutID);
    }

    // Create resume function

    // Victory
    if (
      myGameArea.headProgress >= 100 &&
      myGameArea.buttProgress >= 100 &&
      myGameArea.legsProgress >= 100
    ) {
      myGameArea.isGameWon = true;
      clearTimeout(timeoutID);
      console.log("Timeout cleared.");
      document.getElementById("title").innerHTML = "Territory claimed!";
      document.getElementById("pause").style.visibility = "hidden";
      let heart4 = new Life(380, 180, 40, 40);
      myGameArea.components.push(heart4);
      player.x = 270;
      player.y = 200;
      target.x = 630;
      zzz.x = 680;
    }

    // Game Over
    if (myGameArea.remainingLives === 0) {
      myGameArea.isGameOver = true;
      document.querySelector(".all-bars").style.visibility = "hidden";
      document.getElementById("title").innerHTML = "The bed is ours!";
      document.getElementById("pause").style.visibility = "hidden";
      myGameArea.ctx.clearRect(
        0,
        0,
        myGameArea.canvas.width,
        myGameArea.canvas.height
      );
      document.getElementById("game-over").style.display = "flex";
    }
  },
};

myGameArea.start();

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

class Background extends Component {
  constructor(x, y, w, h) {
    super(x, y, w, h);
    this.img = new Image();
    this.img.src = "./images/background.png";
  }
}

class Player extends Component {
  constructor(x, y, w, h) {
    super(x, y, w, h);
    this.img = new Image();
    this.img.src = "./images/dog_awake.png";
  }

  moveLeft() {
    if (this.x < 260) {
      this.x = 240;
    } else {
      this.x -= 20;
    }
  }

  moveRight() {
    if (this.x > 349) {
      this.x = 349;
    } else {
      this.x += 20;
    }
  }

  moveUp() {
    if (this.y < 10) {
      this.y = 10;
    } else {
      this.y -= 20;
    }
  }

  moveDown() {
    if (this.y > 426) {
      this.y = 426;
    } else {
      this.y += 20;
    }
  }

  holdSpace() {
    myGameArea.pretendAsleep = true;
    player.x = 270;
    player.y = 200;
  }
}

class Target extends Component {
  constructor(x, y, w, h) {
    super(x, y, w, h);
    this.img = new Image();
    this.img.src = "./images/owner_asleep.png";
  }
}

class TargetAwake extends Component {
  constructor(x, y, w, h) {
    super(x, y, w, h);
    this.img = new Image();
    this.img.src = "./images/owner_awake.png";
  }
}

class Life extends Component {
  constructor(x, y, w, h) {
    super(x, y, w, h);
    this.img = new Image();
    this.img.src = "./images/heart.png";
  }
}

class Zzz extends Component {
  constructor(x, y, w, h) {
    super(x, y, w, h);
    this.img = new Image();
    this.img.src = "./images/zzz.png";
  }
}

class ProgressBar {
  constructor(element, initialValue = 0, type) {
    this.fillElem = element.querySelector(".progress-bar-fill");
    this.setValue(initialValue);
    this.type = type;
  }

  setValue(newValue) {
    if (newValue > 100) {
      newValue = 100;
    }

    this.type = newValue;
    this.update();
  }

  update() {
    const percentage = this.type + "%";
    this.fillElem.style.width = percentage;
  }
}

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
let targetAwake = new TargetAwake(430, 40, 150, 470);

let zzz = new Zzz(470, 10, 50, 57);

// Dog
let player = new Player(270, 200, 100, 100);
myGameArea.components.push(player);

let heart1 = new Life(myGameArea.canvas.width - 70, 18, 50, 50);
let heart2 = new Life(myGameArea.canvas.width - 140, 18, 50, 50);
let heart3 = new Life(myGameArea.canvas.width - 210, 18, 50, 50);

// Collision hitboxes for head, butt and legs
let head = new Component(440, 38, 100, 50, "rgba(0,0,0,0.0)");
myGameArea.components.push(head);

let butt = new Component(440, 250, 100, 20, "rgba(0,0,0,0.0)");
myGameArea.components.push(butt);

let legs = new Component(440, 450, 100, 50, "rgba(0,0,0,0.0)");
myGameArea.components.push(legs);

let tempGameOver = new Component(0, 0, 255, 550, "rgba(0,0,0,0.0)");
myGameArea.components.push(tempGameOver);

// Progress bars
let headBar = new ProgressBar(
  document.getElementById("head-progress"),
  0,
  myGameArea.headProgress
);
let buttBar = new ProgressBar(
  document.getElementById("butt-progress"),
  0,
  myGameArea.buttProgress
);
let legsBar = new ProgressBar(
  document.getElementById("legs-progress"),
  0,
  myGameArea.legsProgress
);

// Random wakeup loop
// let timeoutID;
// function wakeupLoop() {
//   let randomTime = Math.floor(Math.random() * (10 - 6 + 1) + 6);
//   let randomDuration = Math.floor(Math.random() * (5 - 3 + 1) + 3);

//   timeoutID = setTimeout(function () {
//     myGameArea.isAwake = true;
//     setTimeout(function () {
//       myGameArea.isAwake = false;
//       myGameArea.aboutToWake = false;
//     }, randomDuration * 1000);
//     wakeupLoop();
//   }, randomTime * 1000);
// }

function wakeupLoop() {
  let randomTime = Math.floor(Math.random() * (10 - 6 + 1) + 6);
  let randomDuration = Math.floor(Math.random() * (5 - 3 + 1) + 3);

  timeoutID = setTimeout(function () {
    myGameArea.aboutToWake = true;
    setTimeout(function () {
      myGameArea.isAwake = true;
    }, 1000 / 3);

    setTimeout(function () {
      myGameArea.isAwake = false;
      myGameArea.aboutToWake = false;
    }, randomDuration * 1000);
    wakeupLoop();
  }, randomTime * 1000);
}

function isKeyPressed(event) {
  if (
    event.key === "w" ||
    event.key === "a" ||
    event.key === "s" ||
    event.key === "d"
  ) {
    return true;
  } else {
    return false;
  }
}

document.addEventListener("keydown", function (event) {
  if (isKeyPressed(event) === true && myGameArea.isAwake === true) {
    myGameArea.remainingLives -= 1;
  }
});

// Start Game
document.getElementById("play").addEventListener("click", (event) => {
  myGameArea.isGameStarted = true;
  setInterval(myGameArea.update, 1000 / 30);
  document.querySelector(".all-bars").style.visibility = "visible";
  document.querySelector(".instructions").style.visibility = "hidden";
  document.getElementById("play").style.display = "none";
  document.getElementById("restart").style.visibility = "visible";
  document.getElementById("pause").style.visibility = "visible";
  wakeupLoop();
});

// Restart Game
document.getElementById("restart").addEventListener("click", (event) => {
  location.reload();
});

// Pause Game
document.getElementById("pause").addEventListener("click", (event) => {
  myGameArea.isGamePaused = true;
  document.getElementById("pause-game").style.display = "flex";
  document.getElementById("pause-game").style.visibility = "visible";
  document.getElementById("pause").style.visibility = "hidden";
});

// Resume Game
document.getElementById("resume").addEventListener("click", (event) => {
  myGameArea.isGamePaused = false;
  document.getElementById("pause-game").style.display = "none";
  document.getElementById("pause").style.visibility = "visible";
});

// Movement
document.addEventListener("keydown", (event) => {
  if (myGameArea.isGamePaused === false) {
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
      case "W":
        player.moveUp();
        break;
      case "A":
        player.moveLeft();
        break;
      case "S":
        player.moveDown();
        break;
      case "D":
        player.moveRight();
        break;
      case " ":
        player.holdSpace();
        break;
    }
  }
});
