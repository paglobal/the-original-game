//Variable initialization
let canvas;
let c;
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
  // let secondTheme = document.querySelector("#secondTheme");
  // secondTheme.volume = 0.4;
  // let thirdTheme = document.querySelector("#thirdTheme");
  // thirdTheme.volume = 0.4;
  let bulletShot = document.querySelector("#bulletShot");
  let powerUp = document.querySelector("#powerUp");
  let spawned = document.querySelector("#spawned");
  let teleport = document.querySelector("#teleport");
  let asteroidExplode = document.querySelector("#asteroidExplode");
  let shockwave = document.querySelector("#shockwave");
};

//Game initiate
addEventListener("DOMContentLoaded", initiate);

//Initiate function
function initiate() {
  //Canvas instantiation
  canvas = document.querySelector("canvas");
  c = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  fillColor = "rgba(23, 30, 38, 1)";
  textColor = "white";
  colors = ["#2185C5", "#7ECEFD", "#FFCAD4", "#FFF6E5"];
  bulletColors = ["#FF7F66", "#B0D0D3", "#C08497", "#FFFFFF"];
  moreColors = ["#20A4F3", "#BFDBF7", "#66D7D1", "#0075F2", "#096B72"];

  //Object instantiation
  //Ship instantiation
  //Player ship
  ships.push(
    new Ship(
      canvas.width / 2,
      canvas.height / 2,
      canvas.width / 466,
      "white",
      7
    )
  );
  //Clone
  ships.push(
    new Ship(
      ships[0].x +
        Math.cos(ships[0].radians) * 3.5 * ships[0].distanceFromCenter,
      ships[0].y +
        Math.sin(ships[0].radians) * 3.5 * ships[0].distanceFromCenter,
      canvas.width / 466,
      "#FF7F66",
      7
    )
  );
  ships[1].visible = false;
  ships[1].invincible = true;
  ships[1].borders = false;

  //Ship fragments instantiation
  ships.forEach((ship) => {
    ship.instantiateFragments();
  });

  // //Asteroids instantiation
  // for (let i = 0; i < 10; i++) {
  //   const radius =
  //     Math.floor(Math.random() * 3 + 1) * randomIntFromRange(canvas.width / 274, canvas.width / 81);
  //   let x = randomIntFromRange(radius, canvas.width - radius);
  //   let y = randomIntFromRange(radius, canvas.height - radius);
  //   const color = "white"

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

  //Resize event listener
  addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  //Keyboard controls event listeners
  addEventListener("keydown", keyboardControls);

  addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
  });

  //Touchscreen controls event listeners
  canvas.addEventListener("touchstart", touchstartControls);

  canvas.addEventListener("touchmove", touchmoveControls);

  canvas.addEventListener("touchend", touchendControls);

  //Clear screen timeout
  window.setInterval(clearScreen, 5000);

  function clearScreen() {
    c.fillStyle = fillColor;
    c.fillRect(0, 0, canvas.width, canvas.height);
  }

  //Spawn asteroids timeout
  window.setInterval(spawnAsteroid, 2000);

  //Spawn shockwave power-up timeout
  window.setInterval(spawnShockwavePowerUp, 25000);

  //Spawn clone power-up timeout
  window.setInterval(spawnClonePowerUp, 80000);

  //Spawn teleportation power-up timeout
  window.setInterval(spawnTeleportationPowerUp, 20000);

  //Spawn invincibility power-up timeout
  window.setInterval(spawnInvincibilityPowerUp, 60000);

  // //Handle theme music playback
  // firstTheme.addEventListener("ended", second, false);

  // function second() {
  //   firstTheme.pause();
  //   secondTheme.play();
  // }

  // secondTheme.addEventListener("ended", third, false);

  // function third() {
  //   secondTheme.pause();
  //   thirdTheme.play();
  // }

  // thirdTheme.addEventListener("ended", first, false);

  // function first() {
  //   thirdTheme.pause();
  //   firstTheme.play();
  // }

  function startMusic() {
    firstTheme.play();
    document.removeEventListener("keyup", startMusic);
  }

  document.addEventListener("keyup", startMusic);

  firstTheme.addEventListener("ended", first, false);

  function first() {
    thirdTheme.pause();
    firstTheme.play();
  }

  letTheMagicBegin();
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

  drawAndUpdateShips();

  drawAndUpdateBullets();

  drawAndUpdateShockwaves();

  drawAndUpdateAsteroids();

  drawAndUpdatePowerUps();

  drawAndUpdateRemnants();

  shipAndAsteroidCollision();

  shipAndPowerUpCollision();

  bulletAndAsteroidCollision();

  shockwaveAndAsteroidCollision();

  handleGameOver();

  handleFreshlySpawned();

  handlePowerUpsActive();

  handleReset();

  handlePaused();

  handleScoreAndLivesDisplay();

  requestAnimationFrame(letTheMagicBegin);
}
