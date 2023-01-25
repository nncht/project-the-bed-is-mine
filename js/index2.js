const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

const backgroundImage = new Image();
backgroundImage.src = "./images/background.png";

const playerImage = new Image();
playerImage.src = "./images/dog_awake.png";

const ownerImage = new Image();
ownerImage.src = "./images/owner_asleep.png";

backgroundImage.onload = () => {
  ctx.scale(
    canvas.width / backgroundImage.width,
    canvas.height / backgroundImage.height
  );
  ctx.drawImage(backgroundImage, 0, 0);
};

playerImage.onload = () => {
  ctx.save();
  ctx.scale(0.25, 0.25);
  ctx.drawImage(playerImage, 1050, 600);
};

ownerImage.onload = () => {
  ctx.save();
  ctx.scale(2.1, 2.1);
  ctx.drawImage(ownerImage, 840, 70);
};

function animate() {
  window.requestAnimationFrame(animate);
}

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "w":
      console.log("pressed w key");
      break;
    case "a":
      console.log("pressed a key");
      break;
    case "s":
      console.log("pressed s key");
      break;
    case "d":
      console.log("pressed d key");
      break;
    case " ":
      console.log("pressed space key");
      break;
  }
});
