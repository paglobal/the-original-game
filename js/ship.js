//Ship class
class Ship {
  constructor(x, y, radius, color, lives) {
    this.visible = true;
    this.borders = true;
    this.visibilityDuration = 900;
    this.visibilityTicker = 0;
    this.invincible = false;
    this.invincibilityDuration = 900;
    this.invincibilityTicker = 0;
    this.canShoot = true;
    this.shotTicker = 0;
    this.shotDuration = 10;
    this.nullShotTicker = 0;
    this.nullShotDuration = 50;
    this.teleports = 0;
    this.lives = lives;
    this.shipFragments = [];
    this.bullets = [];
    this.shockwaves = [];
    this.x = x;
    this.y = y;
    this.vel = { x: 0, y: 0 };
    this.velocityFactor = canvas.width / 15178;
    this.angle = 0;
    this.radians = this.angle * (Math.PI / 180);
    this.angularVel = 2;
    this.movingForward = false;
    this.movingBackward = false;
    this.mass = 1;
    this.explosionBitSize = Math.round(canvas.width / 1366);
    this.explosionBitNumber = 30;
    this.radius = radius;
    this.fragmentRadius = Math.round(canvas.width / 547);
    this.ringRadius = Math.round(canvas.width / 228);
    this.color = color;
    this.distanceFromCenter = Math.round(canvas.width / 76);
    this.freshlySpawned = false;
    this.freshlySpawnedDuration = 200;
    this.freshlySpawnedTicker = 0;
  }

  //Instantiate fragments method
  instantiateFragments() {
    for (let i = 0; i < 50; i++) {
      this.shipFragments.push(
        new ShipFragment(
          this.fragmentRadius,
          randomElement(moreColors),
          this,
          this.distanceFromCenter
        )
      );
    }
    for (let i = 0; i < 1; i++) {
      let radius = Math.round(canvas.width / 196);
      this.shipFragments.push(new ShipFragment(radius, "white", this, 0));
    }
  }

  //Ship rotate method
  rotate(dir) {
    if (this.invincible) {
      this.angularVel = 2.5;
    } else {
      this.angularVel = 2;
    }
    if (this.radians <= Math.PI * 2) {
      this.angle += this.angularVel * dir;
    } else {
      this.angle = 0;
    }
  }

  //Ship shoot method
  shoot() {
    let bulletSpeed;
    let bulletRadius = Math.round(canvas.width / 683);
    let maxBullets;

    if (this.invincible) {
      bulletSpeed = Math.round(canvas.width / 69);
      maxBullets = 10;
    } else {
      bulletSpeed = Math.round(canvas.width / 137);
      maxBullets = 3;
    }

    const bsTracker = this.bullets.length;
    if (!isPaused) {
      if (this.bullets.length < maxBullets) {
        this.bullets.push(
          new Bullet(
            bulletRadius,
            randomElement(bulletColors),
            bulletSpeed,
            this
          )
        );
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
  }

  //Shockwave blast method
  shockwaveBlast(maxBlastRadius) {
    let shockwaveSpeed;

    if (this.invincible) {
      shockwaveSpeed = Math.round(canvas.width / 137);
    } else {
      shockwaveSpeed = Math.round(canvas.width / 274);
    }
    this.shockwaves.push(
      new Shockwave(
        this.radius + this.distanceFromCenter + Math.round(canvas.width / 228),
        "#FF7F66",
        shockwaveSpeed,
        this,
        maxBlastRadius
      )
    );
    let sw = shockwave.cloneNode();
    sw.volume = 0.2;
    sw.play();
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
    this.x = Math.round(canvas.width / 2);
    this.y = Math.round(canvas.height / 2);
    this.vel = { x: 0, y: 0 };
    this.angle = 0;
    this.lives -= 1;
    let s = spawned.cloneNode();
    s.volume = 0.2;
    s.play();
  }

  //Ship teleport method
  teleport() {
    this.x = randomIntFromRange(
      this.radius + this.distanceFromCenter,
      canvas.width - (this.radius + this.distanceFromCenter)
    );
    this.y = randomIntFromRange(
      this.radius + this.distanceFromCenter,
      canvas.height - (this.radius + this.distanceFromCenter)
    );

    if (!this.invincible) {
      for (let i = 0; i < asteroids.length; i++) {
        if (
          distance(ships[0].x, ships[0].y, asteroids[i].x, asteroids[i].y) -
            (ships[0].distanceFromCenter +
              ships[0].radius +
              Math.round(canvas.width / 28) +
              asteroids[i].radius) <
          0
        ) {
          this.x = randomIntFromRange(
            this.radius + this.distanceFromCenter,
            canvas.width - (this.radius + this.distanceFromCenter)
          );
          this.y = randomIntFromRange(
            this.radius + this.distanceFromCenter,
            canvas.height - (this.radius + this.distanceFromCenter)
          );
          i = -1;
        }
      }
    }
    let t = teleport.cloneNode();
    t.volume = 0.2;
    t.play();
  }

  //Ship draw method
  draw() {
    //Draw and update ship nose
    c.beginPath();
    c.arc(this.x1, this.y1, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();

    //Relay parameter changes and draw ship direction line
    c.save();
    c.beginPath();
    c.strokeStyle = this.color;
    c.lineWidth = Math.round(canvas.width / 683);
    c.moveTo(this.x, this.y);
    c.lineTo(this.x1, this.y1);
    c.stroke();
    c.closePath();
    c.restore();

    //Draw and update invincibility ring
    if (this.invincible || this.freshlySpawned) {
      c.save();
      c.globalAlpha = 0.1;
      c.beginPath();
      c.arc(
        this.x,
        this.y,
        this.radius + this.distanceFromCenter + this.ringRadius,
        0,
        Math.PI * 2,
        false
      );
      c.fillStyle = this.color;
      c.fill();
      c.restore();
      if (this.invincible) {
        c.save();
        c.strokeStyle = this.color;
        c.lineWidth = Math.round(canvas.width / 342);
        c.stroke();
        c.closePath();
        c.restore();
      }
    }
  }

  //Ship update method
  update() {
    //Update ship angular displacement
    this.radians = this.angle * (Math.PI / 180);

    //Move ship forward or backward on keypress
    if (this.invincible) {
      this.velocityFactor = canvas.width / 12419;
    } else {
      this.velocityFactor = canvas.width / 15178;
    }
    if (this.movingForward) {
      this.vel.x += Math.cos(this.radians) * this.velocityFactor;
      this.vel.y += Math.sin(this.radians) * this.velocityFactor;
    }

    if (this.movingBackward) {
      this.vel.x -= Math.cos(this.radians) * this.velocityFactor;
      this.vel.y -= Math.sin(this.radians) * this.velocityFactor;
    }

    //Handle ship movement through screen borders
    if (this.borders === true) {
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
    }

    //Deceleration
    this.vel.x *= 0.99;
    this.vel.y *= 0.99;

    //Set coordinates for ship movement
    this.x -= this.vel.x;
    this.y -= this.vel.y;

    //Move ship
    this.x1 = Math.round(
      this.x - (this.radius + this.distanceFromCenter) * Math.cos(this.radians)
    );
    this.y1 = Math.round(
      this.y - (this.radius + this.distanceFromCenter) * Math.sin(this.radians)
    );

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
    this.x1 = Math.round(
      this.ship.x + Math.sin(this.staticRadians) * this.distanceFromCenter
    );
    this.y1 = Math.round(
      this.ship.y + Math.cos(this.staticRadians) * this.distanceFromCenter
    );

    this.draw();
  }
}
