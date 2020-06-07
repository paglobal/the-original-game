//Variable initialization
let canvas;
let c;
let canvasWidth = innerWidth;
let canvasHeight = innerHeight;
let ships = [];
let keys = [];
let asteroids = [];
let shockwavePowerUps = [];
let teleportationPowerUps = [];
let invincibilityPowerUps = [];
let clonePowerUps = [];
let powerUpAuras = [];
let explosionBits = [];
let score = 0;
let fillColor;
let textColor;
let colors;
let bulletColors;
let powerUpColors;
let moreColors;
let isPaused = true;
let paused = true;
let justStarted = true;
let darkTheme = true;
//Audio
window.onload = function () {
  let firstTheme = document.querySelector("#firstTheme");
  firstTheme.volume = 0.4;
  let secondTheme = document.querySelector("#secondTheme");
  secondTheme.volume = 0.4;
  let thirdTheme = document.querySelector("#thirdTheme");
  thirdTheme.volume = 0.4;
  let bulletShot = document.querySelector("#bulletShot");
  let powerUp = document.querySelector("#powerUp");
  let spawned = document.querySelector("#spawned");
  let teleport = document.querySelector("#teleport");
  let asteroidExplode = document.querySelector("#asteroidExplode");
  let alphaShot = document.querySelector("#alphaShot");
  let shockwave = document.querySelector("#shockwave");
};

//Game initiate
addEventListener("DOMContentLoaded", initiate);

//Initiate function
function initiate() {
  //Canvas instantiation
  canvas = document.querySelector("#vortex");
  c = canvas.getContext("2d");
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  fillColor = "rgba(23, 30, 38, 1)";
  textColor = "white";
  colors = ["#2185C5", "#7ECEFD", "#FFCAD4", "#FFF6E5"];
  bulletColors = ["#FF7F66", "#B0D0D3", "#C08497", "#FFFFFF"];
  moreColors = ["#20A4F3", "#BFDBF7", "#66D7D1", "#0075F2", "#096B72"];

  //Object instantiation
  //Ship instantiation
  ships.push(new Ship(canvas.width / 2, canvas.height / 2, 3, "white", 7));

  //Ship fragments instantiation
  ships.forEach((ship) => {
    ship.instantiateFragments();
  });

  //Asteroids instantiation
  // for (let i = 0; i < 10; i++) {
  //   const radius =
  //     Math.floor(Math.random() * 3 + 1) * randomIntFromRange(5, 17);
  //   let x = randomIntFromRange(radius, canvas.width - radius);
  //   let y = randomIntFromRange(radius, canvas.height - radius);
  //   const color = randomElement(asteroidColors);

  //   if (i !== 0) {
  //     for (let j = 0; j < asteroids.length; j++) {
  //       if (
  //         distance(x, y, asteroids[j].x, asteroids[j].y) -
  //           (radius + asteroids[j].radius) <
  //         0
  //       ) {
  //         x = randomIntFromRange(radius, canvas.width - radius);
  //         y = randomIntFromRange(radius, canvas.height - radius);
  //         j = -1;
  //       }
  //     }
  //   }

  //   asteroids.push(new Asteroid(x, y, radius, color));
  // }

  //Event listeners
  addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
  });

  addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
    if (e.keyCode === 32) {
      e.preventDefault();
      ships[0].shoot();
    }
    if (e.keyCode === 80 && paused === true && ships[0].lives !== 0) {
      //Handle play
      isPaused = false;
      c.fillStyle = fillColor;
      c.fillRect(0, 0, canvas.width, canvas.height);
      if (justStarted) {
        firstTheme.play();
      }
      justStarted = false;
    }
    if (e.keyCode === 80 && paused === false && ships[0].lives !== 0) {
      isPaused = true;
    }
    if (e.keyCode === 38) {
      e.preventDefault();
    }
    if (e.keyCode === 40) {
      e.preventDefault();
    }
  });
  addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
  });

  //Clear screen timeout
  window.setInterval(clearScreen, 5000);

  function clearScreen() {
    c.fillStyle = fillColor;
    c.fillRect(0, 0, canvas.width, canvas.height);
  }

  //Spawn asteroids timeout
  window.setInterval(spawnAsteroid, 2000);

  function spawnAsteroid() {
    if (!isPaused) {
      if (asteroids.length < 30) {
        for (let i = 0; i < 1; i++) {
          const radius =
            Math.floor(Math.random() * 3 + 1) * randomIntFromRange(5, 17);
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
                y = randomIntFromRange(
                  canvas.height,
                  canvas.height + 4 * radius
                );
                j = -1;
              }
            }
          }

          asteroids.push(new Asteroid(x, y, radius, color));
        }
      }
    }
  }

  //Spawn shockwave power-up timeout
  window.setInterval(spawnShockwavePowerUp, 30000);

  function spawnShockwavePowerUp() {
    if (!isPaused) {
      if (shockwavePowerUps.length < 1) {
        const radius = randomIntFromRange(20, 25);
        let x = randomIntFromRange(canvas.width, canvas.width + 4 * radius);
        let y = randomIntFromRange(canvas.height, canvas.height + 4 * radius);
        const color = randomElement(moreColors);

        shockwavePowerUps.push(new PowerUp(x, y, radius, color));
      }
    }
  }

  // //Spawn clone power-up timeout
  // window.setInterval(spawnClonePowerUp, 44000);

  // function spawnClonePowerUp() {
  //   if (!isPaused) {
  //     if (clonePowerUps.length < 1) {
  //       const radius =
  //        randomIntFromRange(20, 25);
  //       let x = randomIntFromRange(canvas.width, canvas.width + 4 * radius);
  //       let y = randomIntFromRange(canvas.height, canvas.height + 4 * radius);
  //       const color = randomElement(moreColors);

  //       clonePowerUps.push(new PowerUp(x, y, radius, color));
  //     }
  //   }
  // }

  // //Spawn teleportation power-up timeout
  // window.setInterval(spawnTeleportationPowerUp, 36000);

  // function spawnTeleportationPowerUp() {
  //   if (!isPaused) {
  //     if (teleportationPowerUps.length < 1) {
  //       const radius =
  //        randomIntFromRange(20, 25);
  //       let x = randomIntFromRange(canvas.width, canvas.width + 4 * radius);
  //       let y = randomIntFromRange(canvas.height, canvas.height + 4 * radius);
  //       const color = randomElement(moreColors);

  //       teleportationPowerUps.push(new PowerUp(x, y, radius, color));
  //     }
  //   }
  // }

  //Spawn invincibility power-up timeout
  window.setInterval(spawnInvincibilityPowerUp, 60000);

  function spawnInvincibilityPowerUp() {
    if (!isPaused) {
      if (invincibilityPowerUps.length < 1) {
        const radius = randomIntFromRange(20, 25);
        let x = randomIntFromRange(canvas.width, canvas.width + 4 * radius);
        let y = randomIntFromRange(canvas.height, canvas.height + 4 * radius);
        const color = randomElement(moreColors);

        invincibilityPowerUps.push(new PowerUp(x, y, radius, color));
      }
    }
  }

  //Handle theme music playback
  firstTheme.addEventListener("ended", second, false);

  function second() {
    firstTheme.pause();
    secondTheme.play();
  }

  secondTheme.addEventListener("ended", third, false);

  function third() {
    secondTheme.pause();
    thirdTheme.play();
  }

  thirdTheme.addEventListener("ended", first, false);

  function first() {
    thirdTheme.pause();
    firstTheme.play();
  }

  letTheMagicBegin();
}

//DrawLifeShips Function
function drawLifeShips() {
  //Declare points
  let startX = 0.98 * canvas.width;
  let startY = 0.01 * canvas.height;
  let points = [
    [0.02 * canvas.height, 0.02 * canvas.height],
    [-0.02 * canvas.height, 0.02 * canvas.height],
  ];

  //Draw life ships
  for (let i = 0; i < ships[0].lives; i++) {
    c.fillStyle = textColor;
    c.beginPath();
    c.moveTo(startX, startY);
    for (let j = 0; j < points.length; j++) {
      c.lineTo(startX + points[j][0], startY + points[j][1]);
    }
    c.closePath();
    c.fill();
    startX -= 0.02 * canvas.width;
  }
}

//Where the magic begins
function letTheMagicBegin() {
  //Create background gradient
  const backgroundGradient = c.createLinearGradient(0, 0, 0, canvas.height);
  backgroundGradient.addColorStop(0, "rgba(23, 30, 38, 0.5)");
  backgroundGradient.addColorStop(1, "rgba(63,84,107, 0.5)");

  //Clear screen with trail effect
  c.fillStyle = "rgba(23, 30, 38, 0.2)";
  // c.fillStyle = "rgba(255, 255, 255, 0.08)";
  c.fillRect(0, 0, canvas.width, canvas.height);

  //Update ship
  //Update ship linear displacement
  if (!isPaused) {
    ships[0].movingForward = keys[38];
    ships[0].movingBackward = keys[40];

    //Update ship angular displacement
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

  //Relay parameter changes and draw ship nose
  if (ships[0].visible) {
    if (!isPaused) {
      ships[0].update();
    } else {
      ships[0].draw();
    }
  }

  //Relay parameter changes and draw ship fragments
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
            Math.sin(shipFragment.staticRadians) *
              shipFragment.distanceFromCenter;
          shipFragment.y1 =
            ships[0].y +
            Math.cos(shipFragment.staticRadians) *
              shipFragment.distanceFromCenter;
        }
        shipFragment.draw();
      }
    }
  });

  //Draw and update bullets
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

  //Draw and update shockwaves
  if (ships[0].visible) {
    if (ships[0].shockwaves.length !== 0) {
      ships[0].shockwaves.forEach((shockwave, index) => {
        if (shockwave.radius >= 420) {
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

  //Handle collision detection and life subtraction
  //Ship and asteroid collision detection
  if (!isPaused) {
    if (asteroids.length !== 0) {
      for (let i = 0; i < asteroids.length; i++) {
        if (
          distance(ships[0].x, ships[0].y, asteroids[i].x, asteroids[i].y) -
            (ships[0].distanceFromCenter + asteroids[i].radius) <
            0 &&
          !ships[0].freshlySpawned
        ) {
          if (ships[0].invincible) {
            if (asteroids[i].radius > 12) {
              asteroids[i].radius -= 9;
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
          } else {
            ships[0].explode();
          }
        }
      }
    }
  }

  //Ship and shockwave power-up collision detection
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
            (ships[0].distanceFromCenter + shockwavePowerUps[i].radius) <
          0
        ) {
          ships[0].shockwaveBlast();
          shockwavePowerUps[i].disappear();
          shockwavePowerUps.splice(i, 1);
        }
      }
    }

    //Ship and clone power-up collision detection
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
              (ships[0].distanceFromCenter + clonePowerUps[i].radius) <
            0
          ) {
            clonePowerUps[i].disappear();
            clonePowerUps.splice(i, 1);
          }
        }
      }
    }
  }

  //Ship and invincibility power-up collision detection
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
            (ships[0].distanceFromCenter + invincibilityPowerUps[i].radius) <
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

  //Ship and teleportation power-up collision detection
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
            (ships[0].distanceFromCenter + teleportationPowerUps[i].radius) <
          0
        ) {
          teleportationPowerUps[i].disappear();
          teleportationPowerUps.splice(i, 1);
        }
      }
    }
  }

  //Bullet and asteroid collision detection
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
            if (asteroids[i].radius > 12) {
              asteroids[i].radius -= 9;
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

  //Shockwave and asteroid collision detection
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
            if (asteroids[i].radius > 12) {
              asteroids[i].radius -= 9;
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
            break loop1;
          }
        }
      }
    }
  }

  //Handle lives and score display, game over, reset, pause, play and freshlySpawned
  //Handle lives and game over
  if (ships[0].lives <= 0) {
    ships[0].visible = false;
    ships[0].bullets.splice(0, ships[0].bullets.length);
    asteroids.splice(0, asteroids.length);
    invincibilityPowerUps.splice(0, invincibilityPowerUps.length);
    clonePowerUps.splice(0, clonePowerUps.length);
    teleportationPowerUps.splice(0, teleportationPowerUps.length);
    shockwavePowerUps.splice(0, shockwavePowerUps.length);
  }

  //Handle freshlySpawned
  if (ships[0].freshlySpawnedTicker === ships[0].freshlySpawnedDuration) {
    ships[0].freshlySpawned = false;
    ships[0].freshlySpawnedTicker = 0;
  }

  if (ships[0].freshlySpawned === true) {
    ships[0].freshlySpawnedTicker++;
  }

  //Handle power-ups
  //Handle invincibility
  if (ships[0].invincibilityTicker === ships[0].invincibilityDuration) {
    ships[0].invincible = false;
    ships[0].invincibilityTicker = 0;
  }

  if (ships[0].invincible === true) {
    ships[0].invincibilityTicker++;
  }

  if (!isPaused && ships[0].visible && keys[32] && ships[0].invincible) {
    ships[0].shoot();
  }

  //Handle reset
  if (keys[82]) {
    if (!isPaused) {
      ships[0].visible = true;
      score = 0;
      ships[0].lives = 7;
      ships[0].angle = 0;
      ships[0].x = canvasWidth / 2;
      ships[0].y = canvasHeight / 2;
      ships[0].vel = { x: 0, y: 0 };
      ships[0].bullets.splice(0, ships[0].bullets.length);
      asteroids.splice(0, asteroids.length);
      invincibilityPowerUps.splice(0, invincibilityPowerUps.length);
      clonePowerUps.splice(0, clonePowerUps.length);
      teleportationPowerUps.splice(0, teleportationPowerUps.length);
      shockwavePowerUps.splice(0, shockwavePowerUps.length);
      c.fillStyle = fillColor;
      c.fillRect(0, 0, canvas.width, canvas.height);
    }
  }

  if (isPaused === true) {
    paused = true;
  } else {
    paused = false;
  }

  if (isPaused) {
    c.fillStyle = textColor;
    c.font = `${0.05 * canvas.height}px Candara`;
    c.fillText(
      `Paused`,
      canvas.width / 2 - 0.09 * canvas.width,
      canvas.height / 2 - 0.08 * canvas.height
    );
    c.fillText(
      `Press P To Proceed`,
      canvas.width / 2 - 0.09 * canvas.width,
      canvas.height / 2 + 0.05 * canvas.height - 0.08 * canvas.height
    );
    c.fillText(
      `Scroll down for further instructions`,
      canvas.width / 2 - 0.09 * canvas.width,
      canvas.height / 2 + 0.1 * canvas.height - 0.08 * canvas.height
    );
  }

  //Handle score display
  c.fillStyle = textColor;
  c.font = `${0.03 * canvas.height}px Candara`;
  c.fillText(
    `SCORE: ${score.toString()}`,
    0.015 * canvas.width,
    0.035 * canvas.height
  );

  //Handle game over
  if (!ships[0].visible) {
    c.fillStyle = textColor;
    c.font = `${0.05 * canvas.height}px Candara`;
    c.fillText(
      `GAME OVER!!!`,
      canvas.width / 2 - 0.09 * canvas.width,
      canvas.height / 2 - 0.08 * canvas.height
    );
    c.fillText(
      `You scored ${score} points`,
      canvas.width / 2 - 0.09 * canvas.width,
      canvas.height / 2 + 0.05 * canvas.height - 0.08 * canvas.height
    );
    c.fillText(
      `Press R to reset`,
      canvas.width / 2 - 0.09 * canvas.width,
      canvas.height / 2 + 0.1 * canvas.height - 0.08 * canvas.height
    );
  }
  drawLifeShips();

  requestAnimationFrame(letTheMagicBegin);
}
