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
