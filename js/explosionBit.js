//Explosion bit class
class ExplosionBit {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.vel = {
      x: randomIntFromRange(-canvas.width / 683, canvas.width / 683),
      y: randomIntFromRange(-canvas.width / 683, canvas.width / 683),
    };
    this.ttl = canvas.width / 14;
    this.opacity = 1;
  }

  //Explosion bit draw method
  draw() {
    c.save();
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.globalAlpha = this.opacity;
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
    c.restore();
  }

  //Explosion bit update method
  update() {
    //Move explosion bit
    this.y += this.vel.y;
    this.x += this.vel.x;

    //Countdown for explosion bit removal and decrease opacity of explosion bit
    this.ttl -= 1;
    if (this.opacity > 0) {
      this.opacity -= 1 / this.ttl;
      this.opacity = Math.max(0, this.opacity);
    }

    this.draw();
  }
}
