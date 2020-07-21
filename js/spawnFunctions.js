//Asteroid spawning function
function spawnAsteroid() {
  if (!isPaused) {
    if (asteroids.length < 30) {
      for (let i = 0; i < 1; i++) {
        const radius =
          Math.floor(Math.random() * 3 + 1) *
          randomIntFromRange(canvas.width / 274, canvas.width / 81);
        let x = randomIntFromRange(canvas.width, canvas.width + 4 * radius);
        let y = randomIntFromRange(canvas.height, canvas.height + 4 * radius);
        const color = "white";

        if (i !== 0) {
          for (let j = 0; j < asteroids.length; j++) {
            if (
              distance(x, y, asteroids[j].x, asteroids[j].y) -
                (radius + asteroids[j].radius) <
              0
            ) {
              x = randomIntFromRange(canvas.width, canvas.width + 4 * radius);
              y = randomIntFromRange(canvas.height, canvas.height + 4 * radius);
              j = -1;
            }
          }
        }

        asteroids.push(new Asteroid(x, y, radius, color));
      }
    }
  }
}

//Shockwave power-up spawning function
function spawnShockwavePowerUp() {
  if (!isPaused) {
    if (shockwavePowerUps.length < 1) {
      const radius = randomIntFromRange(canvas.width / 69, canvas.width / 55);
      let x = randomIntFromRange(canvas.width, canvas.width + 4 * radius);
      let y = randomIntFromRange(canvas.height, canvas.height + 4 * radius);
      const color = randomElement(moreColors);

      shockwavePowerUps.push(new PowerUp(x, y, radius, color));
    }
  }
}

//Clone power-up spawning function
function spawnClonePowerUp() {
  if (!isPaused) {
    if (clonePowerUps.length < 1) {
      const radius = randomIntFromRange(canvas.width / 69, canvas.width / 55);
      let x = randomIntFromRange(canvas.width, canvas.width + 4 * radius);
      let y = randomIntFromRange(canvas.height, canvas.height + 4 * radius);
      const color = randomElement(moreColors);

      clonePowerUps.push(new PowerUp(x, y, radius, color));
    }
  }
}

//Teleportation power-up spawning function
function spawnTeleportationPowerUp() {
  if (!isPaused) {
    if (teleportationPowerUps.length < 1) {
      const radius = randomIntFromRange(canvas.width / 69, canvas.width / 55);
      let x = randomIntFromRange(canvas.width, canvas.width + 4 * radius);
      let y = randomIntFromRange(canvas.height, canvas.height + 4 * radius);
      const color = randomElement(moreColors);

      teleportationPowerUps.push(new PowerUp(x, y, radius, color));
    }
  }
}

//Invincibility power-up spawning function
function spawnInvincibilityPowerUp() {
  if (!isPaused) {
    if (invincibilityPowerUps.length < 1) {
      const radius = randomIntFromRange(canvas.width / 69, canvas.width / 55);
      let x = randomIntFromRange(canvas.width, canvas.width + 4 * radius);
      let y = randomIntFromRange(canvas.height, canvas.height + 4 * radius);
      const color = randomElement(moreColors);

      invincibilityPowerUps.push(new PowerUp(x, y, radius, color));
    }
  }
}
