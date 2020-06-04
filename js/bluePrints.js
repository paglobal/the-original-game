//Ship nose class
class Ship {
  constructor(x, y, radius, color, lives) {
    this.visible = true;
    this.lives = lives;
    this.shipFragments = [];
    this.bullets = [];
    this.x = x;
    this.y = y;
    this.vel = { x: 0, y: 0 };
    this.velocityFactor = 0.09;
    this.angle = 0;
    this.radians = this.angle * (Math.PI / 180);
    this.angularVel = 2;
    this.movingForward = false;
    this.movingBackward = false;
    this.mass = 1;
    this.explosionBitSize = 1;
    this.explosionBitNumber = 30;
    this.radius = radius;
    this.color = color;
    this.distanceFromCenter = 18;
    this.freshlySpawned = true;
    this.freshlySpawnedDuration = 300;
    this.freshlySpawnedTicker = 0;
  }

  //Instantiate fragments method
  instantiateFragments() {
    for (let i = 0; i < 50; i++) {
      let radius = Math.random() * 1 + 2;
      this.shipFragments.push(
        new ShipFragment(
          radius,
          randomElement(moreColors),
          this,
          this.distanceFromCenter
        )
      );
    }
    for (let i = 0; i < 1; i++) {
      let radius = 7;
      this.shipFragments.push(new ShipFragment(radius, "white", this, 0));
    }
  }

  //Ship rotate method
  rotate(dir) {
    if (this.radians <= Math.PI * 2) {
      this.angle += this.angularVel * dir;
    } else {
      this.angle = 0;
    }
  }

  //Ship shoot method
  shoot() {
    const bulletSpeed = 10;
    const bulletRadius = 2;
    const maxBullets = 3;
    const bsTracker = this.bullets.length;
    if (!isPaused) {
      this.bullets.push(
        new Bullet(bulletRadius, randomElement(bulletColors), bulletSpeed, this)
      );
    }
    if (this.bullets.length > maxBullets) {
      this.bullets.splice(maxBullets, this.bullets.length);
    }
    if (this.freshlySpawned === true) {
      this.freshlySpawned = false;
    }
    if (
      this.bullets.length - bsTracker > 0 &&
      this.visible === true &&
      isPaused === false
    ) {
      let bs = bulletShot.cloneNode();
      bs.volume = 0.2;
      bs.play();
    }
  }

  //Ship explode method
  explode() {
    for (let i = 0; i < this.explosionBitNumber; i++) {
      explosionBits.push(
        new ExplosionBit(
          this.x + randomIntFromRange(0, this.distanceFromCenter),
          this.y + randomIntFromRange(0, this.distanceFromCenter),
          this.explosionBitSize,
          randomElement(moreColors)
        )
      );
    }
    this.freshlySpawned = true;
    this.x = canvasWidth / 2;
    this.y = canvasHeight / 2;
    this.vel = { x: 0, y: 0 };
    this.angle = 0;
    this.lives -= 1;
    let s = spawned.cloneNode();
    s.volume = 0.2;
    s.play();
  }

  //Ship nose draw method
  draw() {
    c.beginPath();
    c.arc(this.x1, this.y1, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();

    //Relay parameter changes and draw ship direction line
    c.save();
    c.beginPath();
    c.strokeStyle = this.color;
    c.shadowColor = this.color;
    c.shadowBlur = 2;
    c.lineWidth = 2;
    c.moveTo(this.x, this.y);
    c.lineTo(this.x1, this.y1);
    c.stroke();
    c.closePath();
    c.restore();

    // //Relay parameter changes and draw ship aim direction line
    // if (keys[32]) {
    //   c.save();
    //   c.beginPath();
    //   c.strokeStyle = this.color;
    //   c.shadowColor = this.color;
    //   c.shadowBlur = 2;
    //   c.lineWidth = 0.5;
    //   c.moveTo(this.x1, this.y1);
    //   c.lineTo(
    //     this.x1 - 1000 * Math.cos(this.radians),
    //     this.y1 - 1000 * Math.sin(this.radians)
    //   );
    //   c.stroke();
    //   c.closePath();
    //   c.restore();
    // }
  }

  //Ship nose update method
  update() {
    //Update ship angular displacement
    this.radians = this.angle * (Math.PI / 180);

    //Move ship forward or backward on keypress
    if (this.movingForward) {
      this.vel.x += Math.cos(this.radians) * this.velocityFactor;
      this.vel.y += Math.sin(this.radians) * this.velocityFactor;
    }

    if (this.movingBackward) {
      this.vel.x -= Math.cos(this.radians) * this.velocityFactor;
      this.vel.y -= Math.sin(this.radians) * this.velocityFactor;
    }

    //Handle ship movement through screen borders
    if (this.x + (this.radius + this.distanceFromCenter) < 0) {
      this.x = canvas.width + this.radius + this.distanceFromCenter;
    }
    if (this.x - (this.radius + this.distanceFromCenter) > canvas.width) {
      this.x = -(this.radius + this.distanceFromCenter);
    }
    if (this.y + (this.radius + this.distanceFromCenter) < 0) {
      this.y = canvas.height + this.radius + this.distanceFromCenter;
    }
    if (this.y - (this.radius + this.distanceFromCenter) > canvas.height) {
      this.y = -(this.radius + this.distanceFromCenter);
    }

    //Deceleration
    this.vel.x *= 0.99;
    this.vel.y *= 0.99;

    //Set coordinates for ship movement
    this.x -= this.vel.x;
    this.y -= this.vel.y;

    //Move ship
    this.x1 =
      this.x - (this.radius + this.distanceFromCenter) * Math.cos(this.radians);
    this.y1 =
      this.y - (this.radius + this.distanceFromCenter) * Math.sin(this.radians);

    this.draw();
  }
}

//Ship fragment class
class ShipFragment {
  constructor(radius, color, ship, distanceFromCenter) {
    this.ship = ship;
    this.radius = radius;
    this.color = color;
    this.staticAngularVel = 0.05;
    this.staticRadians = Math.random() * Math.PI * 2;
    this.distanceFromCenter = distanceFromCenter;
  }

  //Ship fragment draw method
  draw() {
    c.beginPath();
    c.arc(this.x1, this.y1, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }

  //Ship fragment update method
  update() {
    //Move points over time
    this.staticRadians += this.staticAngularVel;

    //Circular motion
    this.x1 =
      this.ship.x + Math.sin(this.staticRadians) * this.distanceFromCenter;
    this.y1 =
      this.ship.y + Math.cos(this.staticRadians) * this.distanceFromCenter;

    this.draw();
  }
}

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

//Asteroid class
class Asteroid {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.vel = {
      x: (Math.random() - 0.5) * 2.5,
      y: (Math.random() - 0.5) * 2.5,
    };
    this.mass = 1;
    this.explosionBitSize = 0.8;
    this.explosionBitNumber = 8;
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

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.save();
    c.globalAlpha = this.opacity;
    c.fillStyle = this.color;
    c.shadowColor = this.color;
    c.shadowBlur = 7;
    c.fill();
    c.restore();
    c.closePath();
  }

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
        resolveCollision(this, asteroids[i]);
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

    this.x += this.vel.x;
    this.y += this.vel.y;
  }
}

//ExplosionBit class
class ExplosionBit {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.vel = {
      x: randomIntFromRange(-2, 2),
      y: randomIntFromRange(-2, 2),
    };
    this.ttl = 100;
    this.opacity = 1;
  }

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
