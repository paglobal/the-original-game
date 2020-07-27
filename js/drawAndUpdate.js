//Draw and update ships
function drawAndUpdateShips() {
  //Update ship 1
  if (!isPaused && ships[0].visible) {
    //Update ship 1 linear displacement
    ships[0].movingForward = keys[38];
    ships[0].movingBackward = keys[40];

    //Update ship 1 angular displacement
    if (keys[39]) {
      ships[0].rotate(1);
      ships[0].shipFragments.forEach((shipFragment) => {
        shipFragment.staticRadians -= 2 * shipFragment.staticAngularVel;
      });
    }
    if (keys[37]) {
      ships[0].rotate(-1);
    }
  }

  //Update clone
  if (!isPaused && ships[1].visible) {
    //Update clone linear displacement
    ships[1].x =
      ships[0].x +
      Math.round(
        Math.cos(ships[0].radians) * 3.5 * ships[0].distanceFromCenter
      );
    ships[1].y = Math.round(
      ships[0].y +
        Math.sin(ships[0].radians) * 3.5 * ships[0].distanceFromCenter
    );

    //Update clone angular displacement
    ships[1].angle = ships[0].angle + 180;
  }

  //Relay parameter changes and draw ship
  //Ship 1
  if (ships[0].visible) {
    if (!isPaused) {
      ships[0].update();
    } else {
      ships[0].draw();
    }
  }

  //Clone
  if (ships[1].visible) {
    if (!isPaused) {
      ships[1].update();
    } else {
      ships[1].draw();
    }
  }

  //Relay parameter changes and draw ship fragments
  //Ship 1
  ships[0].shipFragments.forEach((shipFragment) => {
    if (ships[0].visible) {
      if (!isPaused) {
        shipFragment.update();
      } else {
        if (!justStarted) {
          //Move points over time
          shipFragment.staticRadians += shipFragment.staticAngularVel;
          //Circular motion
          shipFragment.x1 =
            ships[0].x +
            Math.round(
              Math.sin(shipFragment.staticRadians) *
                shipFragment.distanceFromCenter
            );
          shipFragment.y1 = Math.round(
            ships[0].y +
              Math.cos(shipFragment.staticRadians) *
                shipFragment.distanceFromCenter
          );
        }
        shipFragment.draw();
      }
    }
  });

  //Clone
  ships[1].shipFragments.forEach((shipFragment) => {
    if (ships[1].visible) {
      if (!isPaused) {
        shipFragment.update();
      } else {
        if (!justStarted) {
          //Move points over time
          shipFragment.staticRadians += shipFragment.staticAngularVel;
          //Circular motion
          shipFragment.x1 = Math.round(
            ships[1].x +
              Math.sin(shipFragment.staticRadians) *
                shipFragment.distanceFromCenter
          );
          shipFragment.y1 = Math.round(
            ships[1].y +
              Math.cos(shipFragment.staticRadians) *
                shipFragment.distanceFromCenter
          );
        }
        shipFragment.draw();
      }
    }
  });
}

//Draw and update bullets
function drawAndUpdateBullets() {
  //Draw and update bullets
  //Ship 1
  if (ships[0].visible) {
    if (ships[0].bullets.length !== 0) {
      ships[0].bullets.forEach((bullet, index) => {
        if (
          bullet.x < 0 ||
          bullet.x > canvas.width ||
          bullet.y < 0 ||
          bullet.y > canvas.height
        ) {
          ships[0].bullets.splice(index, 1);
        } else {
          if (!isPaused) {
            bullet.update();
          } else {
            bullet.draw();
          }
        }
      });
    }
  }

  //Clone
  if (ships[1].visible) {
    if (ships[1].bullets.length !== 0) {
      ships[1].bullets.forEach((bullet, index) => {
        if (
          bullet.x < 0 ||
          bullet.x > canvas.width ||
          bullet.y < 0 ||
          bullet.y > canvas.height
        ) {
          ships[1].bullets.splice(index, 1);
        } else {
          if (!isPaused) {
            bullet.update();
          } else {
            bullet.draw();
          }
        }
      });
    }
  }
}

//Draw and update shockwaves
function drawAndUpdateShockwaves() {
  //Draw and update shockwaves
  //Ship 1
  if (ships[0].visible) {
    if (ships[0].shockwaves.length !== 0) {
      ships[0].shockwaves.forEach((shockwave, index) => {
        if (shockwave.radius >= shockwave.maxBlastRadius) {
          ships[0].shockwaves.splice(index, 1);
        } else {
          if (!isPaused) {
            shockwave.update();
          } else {
            shockwave.draw();
          }
        }
      });
    }
  }

  //Clone
  if (ships[1].visible) {
    if (ships[1].shockwaves.length !== 0) {
      ships[1].shockwaves.forEach((shockwave, index) => {
        if (shockwave.radius >= shockwave.maxBlastRadius) {
          ships[1].shockwaves.splice(index, 1);
        } else {
          if (!isPaused) {
            shockwave.update();
          } else {
            shockwave.draw();
          }
        }
      });
    }
  }
}

//Draw and update asteroids
function drawAndUpdateAsteroids() {
  //Draw and update asteroids
  if (asteroids.length !== 0) {
    asteroids.forEach((asteroid) => {
      if (!isPaused) {
        asteroid.update();
      } else {
        asteroid.draw();
      }
    });
  }
}

//Draw and update power-ups
function drawAndUpdatePowerUps() {
  //Draw and update shockwave power-ups
  if (shockwavePowerUps.length !== 0) {
    shockwavePowerUps.forEach((shockwavePowerUp) => {
      if (!isPaused) {
        shockwavePowerUp.update();
      } else {
        shockwavePowerUp.draw();
      }
    });
  }

  //Draw and update teleportation power-ups
  if (teleportationPowerUps.length !== 0) {
    teleportationPowerUps.forEach((teleportationPowerUp) => {
      if (!isPaused) {
        teleportationPowerUp.update();
      } else {
        teleportationPowerUp.draw();
      }
    });
  }

  //Draw and update clone power-ups
  if (clonePowerUps.length !== 0) {
    clonePowerUps.forEach((clonePowerUp) => {
      if (!isPaused) {
        clonePowerUp.update();
      } else {
        clonePowerUp.draw();
      }
    });
  }

  //Draw and update invincibility power-ups
  if (invincibilityPowerUps.length !== 0) {
    invincibilityPowerUps.forEach((invincibilityPowerUp) => {
      if (!isPaused) {
        invincibilityPowerUp.update();
      } else {
        invincibilityPowerUp.draw();
      }
    });
  }
}

//Draw and update remnants
function drawAndUpdateRemnants() {
  //Draw and update explosion bits
  if (explosionBits.length !== 0) {
    explosionBits.forEach((explosionBit, index) => {
      if (!isPaused) {
        explosionBit.update();
      } else {
        explosionBit.draw();
      }
      if (explosionBit.ttl === 0) {
        explosionBits.splice(index, 1);
      }
    });
  }

  //Draw and update power-up auras
  if (powerUpAuras.length !== 0) {
    powerUpAuras.forEach((powerUpAura, index) => {
      if (!isPaused) {
        powerUpAura.update();
      } else {
        powerUpAura.draw();
      }
      if (powerUpAura.ttl === 0) {
        powerUpAuras.splice(index, 1);
      }
    });
  }
}
