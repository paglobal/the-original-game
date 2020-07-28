//Bullet class
class Bullet {
  constructor(radius, color, vel, ship) {
    this.ship = ship;
    this.x = this.ship.x1;
    this.y = this.ship.y1;
    this.lastPoint = { x: this.x, y: this.y };
    this.radius = radius;
    this.color = color;
    this.vel = vel;
    // this.angle = angle;
    this.radians = ship.radians;
  }

  // //Bullet rotate method
  // rotate(dir) {
  //   if (angle <= Math.PI * 2) {
  //     this.angle += angularVel * dir;
  //   } else {
  //     this.angle = 0;
  //   }
  // }

  //Bullet draw method
  draw() {
    c.beginPath();
    c.strokeStyle = this.color;
    c.lineWidth = this.radius;
    c.moveTo(this.lastPoint.x, this.lastPoint.y);
    c.lineTo(this.x, this.y);
    c.stroke();
    c.closePath();
  }

  //Bullet update method
  update() {
    //Grab last bullet point
    this.lastPoint = { x: this.x, y: this.y };

    // //Change bullet direction
    // this.radians = (this.angle / Math.PI) * 180;
    // if (keys[37]) {
    //   this.rotate(1);
    // }
    // if (keys[39]) {
    //   this.rotate(-1);
    // }

    //Move bullet
    this.x -= Math.cos(this.radians) * this.vel;
    this.y -= Math.sin(this.radians) * this.vel;

    this.draw();
  }
}
