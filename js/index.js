const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

const image = new Image();
image.src = "./images/background.png";

const playerImage = new Image();
playerImage.src = "./images/dog_awake.png";

console.log(image);
image.onload = () => {
  ctx.scale(canvas.width / image.width, canvas.height / image.height);
  ctx.drawImage(image, 0, 0);
  ctx.save();
  ctx.scale(0.25, 0.25);
  ctx.drawImage(playerImage, 1050, 600);
};
