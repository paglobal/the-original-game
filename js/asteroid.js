//Asteroid class
class Asteroid {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.vel = {
      x: (Math.random() - 0.5) * (canvas.width / 547),
      y: (Math.random() - 0.5) * (canvas.width / 547),
    };
    this.mass = 1;
    this.explosionBitSize = canvas.width / 3415;
    this.explosionBitNumber = 4;
    this.opacity = 0.1;
  }

  //Asteroid explode method
  explode() {
    for (let i = 0; i < this.explosionBitNumber; i++) {
      explosionBits.push(
        new ExplosionBit(
          this.x + randomIntFromRange(0, this.radius),
          this.y + randomIntFromRange(0, this.radius),
          this.explosionBitSize,
          this.color
        )
      );
    }
    score += 2;
    let ae = asteroidExplode.cloneNode();
    ae.volume = 0.1;
    ae.play();
  }

  //Asteroid draw method
  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.save();
    c.globalAlpha = this.opacity;
    c.fillStyle = this.color;
    c.fill();
    c.restore();
    c.closePath();
  }

  //Asteroid update method
  update() {
    this.draw();

    //Collision between asteroids
    for (let i = 0; i < asteroids.length; i++) {
      if (this === asteroids[i]) continue;
      if (
        distance(this.x, this.y, asteroids[i].x, asteroids[i].y) -
          (this.radius + asteroids[i].radius) <
        0
      ) {
        resolveAsteroidCollision(this, asteroids[i]);
      }
    }

    //Behaviour of asteroid relative to proximity of ship
    if (
      distance(ships[0].x, ships[0].y, this.x, this.y) < 600 &&
      this.opacity < 1
    ) {
      this.opacity += 0.02;
    } else if (this.opacity > 0.1) {
      this.opacity -= 0.02;
      this.opacity = Math.max(0, this.opacity);
    }

    //Handle asteroid movement through screen borders
    if (this.x + this.radius < 0) {
      this.x = canvas.width + this.radius;
    }
    if (this.x - this.radius > canvas.width) {
      this.x = -this.radius;
    }
    if (this.y + this.radius < 0) {
      this.y = canvas.height + this.radius;
    }
    if (this.y - this.radius > canvas.height) {
      this.y = -this.radius;
    }

    if (ships[0].invincible) {
      this.x += this.vel.x / 5;
      this.y += this.vel.y / 5;
    } else {
      this.x += this.vel.x;
      this.y += this.vel.y;
    }
  }
}
