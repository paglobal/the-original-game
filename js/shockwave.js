//Shockwave class
class Shockwave {
  constructor(radius, color, vel, ship, maxBlastRadius) {
    this.ship = ship;
    this.visible = true;
    this.x = this.ship.x;
    this.y = this.ship.y;
    this.radius = radius;
    this.maxBlastRadius = maxBlastRadius;
    this.color = color;
    this.vel = vel;
  }

  //Shockwave draw method
  draw() {
    c.save();
    c.beginPath();
    c.arc(this.ship.x, this.ship.y, this.radius, 0, Math.PI * 2, false);
    c.strokeStyle = this.color;
    c.lineWidth = Math.round(canvas.width / 274);
    c.stroke();
    c.closePath();
    c.restore();
  }

  //Shockwave update method
  update() {
    //Move shockwave
    this.radius += this.vel;

    this.draw();
  }
}
