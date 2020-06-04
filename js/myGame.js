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
  powerUpColors = ["yellow", "orange"];

  //Object instantiation
  //Ship nose instantiation
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
    if (e.keyCode === 80 && paused === true) {
      //Handle play
      isPaused = false;
      c.fillStyle = fillColor;
      c.fillRect(0, 0, canvas.width, canvas.height);
      justStarted = false;
      firstTheme.play();
    }
    if (e.keyCode === 80 && paused === false) {
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

  // //Spawn shockwave power-up timeout
  // window.setInterval(spawnShockwavePowerUp, 40000);

  // function spawnShockwavePowerUp() {
  //   if (!isPaused) {
  //     if (shockwavePowerUps.length < 30) {
  //       for (let i = 0; i < 1; i++) {
  //         const radius =
  //           Math.floor(Math.random() * 3 + 1) * randomIntFromRange(5, 17);
  //         let x = randomIntFromRange(canvas.width, canvas.width + 4 * radius);
  //         let y = randomIntFromRange(canvas.height, canvas.height + 4 * radius);
  //         const color = randomElement(powerUpColors);

  //         if (i !== 0) {
  //           for (let j = 0; j < shockwavePowerUps.length; j++) {
  //             if (
  //               distance(x, y, shockwavePowerUps[j].x, shockwavePowerUps[j].y) -
  //                 (radius + shockwavePowerUps[j].radius) <
  //               0
  //             ) {
  //               x = randomIntFromRange(canvas.width, canvas.width + 4 * radius);
  //               y = randomIntFromRange(
  //                 canvas.height,
  //                 canvas.height + 4 * radius
  //               );
  //               j = -1;
  //             }
  //           }
  //         }

  //         shockwavePowerUps.push(new Asteroid(x, y, radius, color));
  //       }
  //     }
  //   }
  // }

  // //Spawn clone power-up timeout
  // window.setInterval(spawnClonePowerUp, 44000);

  // function spawnClonePowerUp() {
  //   if (!isPaused) {
  //     if (clonePowerUps.length < 30) {
  //       for (let i = 0; i < 1; i++) {
  //         const radius =
  //           Math.floor(Math.random() * 3 + 1) * randomIntFromRange(5, 17);
  //         let x = randomIntFromRange(canvas.width, canvas.width + 4 * radius);
  //         let y = randomIntFromRange(canvas.height, canvas.height + 4 * radius);
  //         const color = randomElement(powerUpColors);

  //         if (i !== 0) {
  //           for (let j = 0; j < clonePowerUps.length; j++) {
  //             if (
  //               distance(x, y, clonePowerUps[j].x, clonePowerUps[j].y) -
  //                 (radius + clonePowerUps[j].radius) <
  //               0
  //             ) {
  //               x = randomIntFromRange(canvas.width, canvas.width + 4 * radius);
  //               y = randomIntFromRange(
  //                 canvas.height,
  //                 canvas.height + 4 * radius
  //               );
  //               j = -1;
  //             }
  //           }
  //         }

  //         clonePowerUps.push(new Asteroid(x, y, radius, color));
  //       }
  //     }
  //   }
  // }

  // //Spawn teleportation power-up timeout
  // window.setInterval(spawnTeleportationPowerUp, 36000);

  // function spawnTeleportationPowerUp() {
  //   if (!isPaused) {
  //     if (teleportationPowerUps.length < 30) {
  //       for (let i = 0; i < 1; i++) {
  //         const radius =
  //           Math.floor(Math.random() * 3 + 1) * randomIntFromRange(5, 17);
  //         let x = randomIntFromRange(canvas.width, canvas.width + 4 * radius);
  //         let y = randomIntFromRange(canvas.height, canvas.height + 4 * radius);
  //         const color = randomElement(powerUpColors);

  //         if (i !== 0) {
  //           for (let j = 0; j < teleportationPowerUps.length; j++) {
  //             if (
  //               distance(
  //                 x,
  //                 y,
  //                 teleportationPowerUps[j].x,
  //                 teleportationPowerUps[j].y
  //               ) -
  //                 (radius + teleportationPowerUps[j].radius) <
  //               0
  //             ) {
  //               x = randomIntFromRange(canvas.width, canvas.width + 4 * radius);
  //               y = randomIntFromRange(
  //                 canvas.height,
  //                 canvas.height + 4 * radius
  //               );
  //               j = -1;
  //             }
  //           }
  //         }

  //         teleportationPowerUps.push(new Asteroid(x, y, radius, color));
  //       }
  //     }
  //   }
  // }

  // //Spawn invincibility power-up timeout
  // window.setInterval(spawnInvincibilityPowerUp, 48000);

  // function spawnInvincibilityPowerUp() {
  //   if (!isPaused) {
  //     if (invincibilityPowerUps.length < 30) {
  //       for (let i = 0; i < 1; i++) {
  //         const radius =
  //           Math.floor(Math.random() * 3 + 1) * randomIntFromRange(5, 17);
  //         let x = randomIntFromRange(canvas.width, canvas.width + 4 * radius);
  //         let y = randomIntFromRange(canvas.height, canvas.height + 4 * radius);
  //         const color = randomElement(powerUpColors);

  //         if (i !== 0) {
  //           for (let j = 0; j < invincibilityPowerUps.length; j++) {
  //             if (
  //               distance(
  //                 x,
  //                 y,
  //                 invincibilityPowerUps[j].x,
  //                 invincibilityPowerUps[j].y
  //               ) -
  //                 (radius + invincibilityPowerUps[j].radius) <
  //               0
  //             ) {
  //               x = randomIntFromRange(canvas.width, canvas.width + 4 * radius);
  //               y = randomIntFromRange(
  //                 canvas.height,
  //                 canvas.height + 4 * radius
  //               );
  //               j = -1;
  //             }
  //           }
  //         }

  //         invincibilityPowerUps.push(new Asteroid(x, y, radius, color));
  //       }
  //     }
  //   }
  // }

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

  //Draw And Update bullets
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

  //Draw and update explosion bits
  if (explosionBits.length !== 0) {
    explosionBits.forEach((explosionBit, index) => {
      if (!isPaused) {
        explosionBit.update();
      } else {
        explosionBit.draw();
      }
      if (explosionBit.ttl == 0) {
        explosionBits.splice(index, 1);
      }
    });
  }

  //Handle collision detection and life subtraction
  //Ship and asteroid collision detection
  if (asteroids.length !== 0) {
    for (let i = 0; i < asteroids.length; i++) {
      if (
        distance(ships[0].x, ships[0].y, asteroids[i].x, asteroids[i].y) -
          (ships[0].distanceFromCenter + asteroids[i].radius) <
          0 &&
        !ships[0].freshlySpawned
      ) {
        ships[0].explode();
      }
    }
  }

  //Bullet And Asteroid Collision Detection
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

  //Handle lives and score display, game over, reset, pause, play and freshlySpawned
  //Handle lives and game over
  if (ships[0].lives <= 0) {
    ships[0].visible = false;
    ships[0].bullets.splice(0, ships[0].bullets.length);
    asteroids.splice(0, asteroids.length);
  }

  //Handle freshlySpawned
  if (ships[0].freshlySpawnedTicker === ships[0].freshlySpawnedDuration) {
    ships[0].freshlySpawned = false;
    ships[0].freshlySpawnedTicker = 0;
  }

  if (ships[0].freshlySpawned === true) {
    ships[0].freshlySpawnedTicker++;
  }

  //Handle reset
  if (keys[82]) {
    if (!isPaused) {
      freshlySpawned = true;
      ships[0].visible = true;
      score = 0;
      ships[0].lives = 7;
      ships[0].angle = 0;
      ships[0].x = canvasWidth / 2;
      ships[0].y = canvasHeight / 2;
      ships[0].vel = { x: 0, y: 0 };
      ships[0].bullets.splice(0, ships[0].bullets.length);
      asteroids.splice(0, asteroids.length);
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
