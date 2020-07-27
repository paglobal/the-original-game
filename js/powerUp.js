//Power-up class
class PowerUp {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.vel = {
      x: (Math.random() - 0.5) * (canvas.width / 547),
      y: (Math.random() - 0.5) * (canvas.width / 547),
    };
    this.powerUpAuraNumber = 8;
    this.opacity = 0.1;
  }

  //Power-up disappear method
  disappear() {
    for (let i = 0; i < 1; i++) {
      powerUpAuras.push(
        new PowerUpAura(this.x, this.y, this.radius, this.color)
      );
    }
    score += 2;
    let pu = powerUp.cloneNode();
    pu.volume = 0.1;
    pu.play();
  }

  //Power-up draw method
  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.save();
    c.globalAlpha = this.opacity;
    c.fillStyle = this.color;
    c.fill();
    c.restore();
    c.closePath();
    c.fillStyle = textColor;
    c.font = `${this.radius * 2}px Candara`;
    c.fillText(`?`, this.x - this.radius / 3, this.y + (3 * this.radius) / 5);
  }

  //Power-up update method
  update() {
    this.draw();

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

//Power-up aura class
class PowerUpAura {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.ttl = 150;
    this.opacity = 1;
  }

  //Power-up aura draw method
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

  //Power-up aura update method
  update() {
    //Countdown for power-up aura removal create aura effect
    this.radius += 0.2;
    this.ttl -= 1;
    if (this.opacity > 0) {
      this.opacity -= 4 / this.ttl;
      this.opacity = Math.max(0, this.opacity);
    }

    this.draw();
  }
}
