//Ship and asteroid collision
function shipAndAsteroidCollision() {
  //Ship and asteroid collision detection
  //Ship 1
  if (ships[0].visible) {
    if (!isPaused) {
      if (asteroids.length !== 0) {
        for (let i = 0; i < asteroids.length; i++) {
          if (ships[0].invincible) {
            if (
              distance(ships[0].x, ships[0].y, asteroids[i].x, asteroids[i].y) -
                (ships[0].distanceFromCenter +
                  ships[0].radius +
                  ships[0].ringRadius +
                  asteroids[i].radius) <
                0 &&
              !ships[0].freshlySpawned
            ) {
              if (asteroids[i].radius > canvas.width / 92) {
                asteroids[i].radius -= Math.round(canvas.width / 151);
                asteroids[i].explode();
                asteroids.push(
                  new Asteroid(
                    asteroids[i].x,
                    asteroids[i].y,
                    asteroids[i].radius,
                    asteroids[i].color
                  )
                );
                asteroids.push(
                  new Asteroid(
                    asteroids[i].x,
                    asteroids[i].y,
                    asteroids[i].radius,
                    asteroids[i].color
                  )
                );
              } else {
                asteroids[i].explode();
              }
              asteroids.splice(i, 1);
            }
          } else {
            if (
              distance(ships[0].x, ships[0].y, asteroids[i].x, asteroids[i].y) -
                (ships[0].distanceFromCenter +
                  ships[0].fragmentRadius +
                  asteroids[i].radius) <
                0 &&
              !ships[0].freshlySpawned
            ) {
              ships[0].explode();
            }
          }
        }
      }
    }
  }

  //Clone
  if (ships[1].visible) {
    if (!isPaused) {
      if (asteroids.length !== 0) {
        for (let i = 0; i < asteroids.length; i++) {
          if (ships[1].invincible) {
            if (
              distance(ships[1].x, ships[1].y, asteroids[i].x, asteroids[i].y) -
                (ships[1].distanceFromCenter +
                  ships[1].radius +
                  ships[1].ringRadius +
                  asteroids[i].radius) <
                0 &&
              !ships[1].freshlySpawned
            ) {
              if (asteroids[i].radius > canvas.width / 92) {
                asteroids[i].radius -= Math.round(canvas.width / 151);
                asteroids[i].explode();
                asteroids.push(
                  new Asteroid(
                    asteroids[i].x,
                    asteroids[i].y,
                    asteroids[i].radius,
                    asteroids[i].color
                  )
                );
                asteroids.push(
                  new Asteroid(
                    asteroids[i].x,
                    asteroids[i].y,
                    asteroids[i].radius,
                    asteroids[i].color
                  )
                );
              } else {
                asteroids[i].explode();
              }
              asteroids.splice(i, 1);
            }
          } else {
            if (
              distance(ships[1].x, ships[1].y, asteroids[i].x, asteroids[i].y) -
                (ships[1].distanceFromCenter +
                  ships[1].fragmentRadius +
                  asteroids[i].radius) <
                0 &&
              !ships[1].freshlySpawned
            ) {
              ships[1].explode();
            }
          }
        }
      }
    }
  }
}

//Ship and power-up collision
function shipAndPowerUpCollision() {
  //Ship and shockwave power-up collision detection
  //Ship 1
  if (ships[0].visible) {
    if (!isPaused) {
      if (shockwavePowerUps.length !== 0) {
        for (let i = 0; i < shockwavePowerUps.length; i++) {
          if (
            distance(
              ships[0].x,
              ships[0].y,
              shockwavePowerUps[i].x,
              shockwavePowerUps[i].y
            ) -
              (ships[0].distanceFromCenter +
                ships[0].fragmentRadius +
                shockwavePowerUps[i].radius) <
            0
          ) {
            ships[0].shockwaveBlast(canvas.width / 3);
            shockwavePowerUps[i].disappear();
            shockwavePowerUps.splice(i, 1);
          }
        }
      }
    }
  }

  //Clone
  if (ships[1].visible) {
    if (!isPaused) {
      if (shockwavePowerUps.length !== 0) {
        for (let i = 0; i < shockwavePowerUps.length; i++) {
          if (
            distance(
              ships[1].x,
              ships[1].y,
              shockwavePowerUps[i].x,
              shockwavePowerUps[i].y
            ) -
              (ships[1].distanceFromCenter +
                ships[1].fragmentRadius +
                shockwavePowerUps[i].radius) <
            1
          ) {
            ships[1].shockwaveBlast(canvas.width / 3);
            shockwavePowerUps[i].disappear();
            shockwavePowerUps.splice(i, 1);
          }
        }
      }
    }
  }

  //Ship and clone power-up collision detection
  if (ships[0].visible) {
    if (!isPaused) {
      if (clonePowerUps.length !== 0) {
        for (let i = 0; i < clonePowerUps.length; i++) {
          if (
            distance(
              ships[0].x,
              ships[0].y,
              clonePowerUps[i].x,
              clonePowerUps[i].y
            ) -
              (ships[0].distanceFromCenter +
                ships[0].fragmentRadius +
                clonePowerUps[i].radius) <
            0
          ) {
            ships[1].visible = true;
            ships[1].visibilityTicker = 0;
            if (
              distance(ships[0].x, ships[0].y, ships[1].x, ships[1].y) -
                (ships[0].distanceFromCenter + ships[1].distanceFromCenter) >
              0
            ) {
              ships[1].x = Math.round(
                ships[0].x +
                  Math.cos(ships[0].radians) * 3.5 * ships[0].distanceFromCenter
              );
              ships[1].y = Math.round(
                ships[0].y +
                  Math.sin(ships[0].radians) * 3.5 * ships[0].distanceFromCenter
              );
            }
            if (!ships[1].visible) {
              let s = spawned.cloneNode();
              s.volume = 0.2;
              s.play();
            }
            ships[1].shockwaveBlast(200);
            clonePowerUps[i].disappear();
            clonePowerUps.splice(i, 1);
          }
        }
      }
    }
  }

  //Ship and invincibility power-up collision detection
  if (ships[0].visible) {
    if (!isPaused) {
      if (invincibilityPowerUps.length !== 0) {
        for (let i = 0; i < invincibilityPowerUps.length; i++) {
          if (
            distance(
              ships[0].x,
              ships[0].y,
              invincibilityPowerUps[i].x,
              invincibilityPowerUps[i].y
            ) -
              (ships[0].distanceFromCenter +
                ships[0].fragmentRadius +
                invincibilityPowerUps[i].radius) <
            0
          ) {
            ships[0].invincible = true;
            ships[0].invincibilityTicker = 0;
            invincibilityPowerUps[i].disappear();
            invincibilityPowerUps.splice(i, 1);
          }
        }
      }
    }
  }

  //Ship and teleportation power-up collision detection
  if (ships[0].visible) {
    if (!isPaused) {
      if (teleportationPowerUps.length !== 0) {
        for (let i = 0; i < teleportationPowerUps.length; i++) {
          if (
            distance(
              ships[0].x,
              ships[0].y,
              teleportationPowerUps[i].x,
              teleportationPowerUps[i].y
            ) -
              (ships[0].distanceFromCenter +
                ships[0].fragmentRadius +
                teleportationPowerUps[i].radius) <
            0
          ) {
            ships[0].teleports++;
            teleportationPowerUps[i].disappear();
            teleportationPowerUps.splice(i, 1);
          }
        }
      }
    }
  }
}

//Bullet and asteroid collision
function bulletAndAsteroidCollision() {
  //Bullet and asteroid collision detection
  //Ship 1
  if (!isPaused) {
    if (asteroids.length !== 0 && ships[0].bullets.length !== 0) {
      loop1: for (let i = 0; i < asteroids.length; i++) {
        for (let j = 0; j < ships[0].bullets.length; j++) {
          if (
            distance(
              asteroids[i].x,
              asteroids[i].y,
              ships[0].bullets[j].x,
              ships[0].bullets[j].y
            ) -
              (asteroids[i].radius + ships[0].bullets[j].radius) <
            0
          ) {
            if (asteroids[i].radius > canvas.width / 92) {
              asteroids[i].radius -= Math.round(canvas.width / 151);
              asteroids[i].explode();
              asteroids.push(
                new Asteroid(
                  asteroids[i].x,
                  asteroids[i].y,
                  asteroids[i].radius,
                  asteroids[i].color
                )
              );
              asteroids.push(
                new Asteroid(
                  asteroids[i].x,
                  asteroids[i].y,
                  asteroids[i].radius,
                  asteroids[i].color
                )
              );
            } else {
              asteroids[i].explode();
            }
            asteroids.splice(i, 1);
            ships[0].bullets.splice(j, 1);
            break loop1;
          }
        }
      }
    }
  }

  //Clone
  if (!isPaused) {
    if (asteroids.length !== 0 && ships[1].bullets.length !== 0) {
      loop1: for (let i = 0; i < asteroids.length; i++) {
        for (let j = 0; j < ships[1].bullets.length; j++) {
          if (
            distance(
              asteroids[i].x,
              asteroids[i].y,
              ships[1].bullets[j].x,
              ships[1].bullets[j].y
            ) -
              (asteroids[i].radius + ships[1].bullets[j].radius) <
            0
          ) {
            if (asteroids[i].radius > canvas.width / 92) {
              asteroids[i].radius -= Math.round(canvas.width / 151);
              asteroids[i].explode();
              asteroids.push(
                new Asteroid(
                  asteroids[i].x,
                  asteroids[i].y,
                  asteroids[i].radius,
                  asteroids[i].color
                )
              );
              asteroids.push(
                new Asteroid(
                  asteroids[i].x,
                  asteroids[i].y,
                  asteroids[i].radius,
                  asteroids[i].color
                )
              );
            } else {
              asteroids[i].explode();
            }
            asteroids.splice(i, 1);
            ships[1].bullets.splice(j, 1);
            break loop1;
          }
        }
      }
    }
  }
}

//Shockwave and asteroid collision
function shockwaveAndAsteroidCollision() {
  //Shockwave and asteroid collision detection
  //Ship 1
  if (!isPaused) {
    if (asteroids.length !== 0 && ships[0].shockwaves.length !== 0) {
      loop1: for (let i = 0; i < asteroids.length; i++) {
        for (let j = 0; j < ships[0].shockwaves.length; j++) {
          if (
            distance(
              asteroids[i].x,
              asteroids[i].y,
              ships[0].shockwaves[j].x,
              ships[0].shockwaves[j].y
            ) -
              (asteroids[i].radius + ships[0].shockwaves[j].radius) <
            0
          ) {
            asteroids[i].explode();
            asteroids.splice(i, 1);
            break loop1;
          }
        }
      }
    }
  }

  //Clone
  if (!isPaused) {
    if (asteroids.length !== 0 && ships[1].shockwaves.length !== 0) {
      loop1: for (let i = 0; i < asteroids.length; i++) {
        for (let j = 0; j < ships[1].shockwaves.length; j++) {
          if (
            distance(
              asteroids[i].x,
              asteroids[i].y,
              ships[1].shockwaves[j].x,
              ships[1].shockwaves[j].y
            ) -
              (asteroids[i].radius + ships[1].shockwaves[j].radius) <
            0
          ) {
            asteroids[i].explode();
            asteroids.splice(i, 1);
            break loop1;
          }
        }
      }
    }
  }
}
