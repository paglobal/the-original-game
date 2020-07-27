//Handle game over
function handleGameOver() {
  //Handle clean up when game is over
  if (ships[0].lives <= 0) {
    ships[0].visible = false;
    ships[0].bullets.splice(0, ships[0].bullets.length);
    ships[1].visible = false;
    ships[1].bullets.splice(0, ships[0].bullets.length);
    asteroids.splice(0, asteroids.length);
    invincibilityPowerUps.splice(0, invincibilityPowerUps.length);
    clonePowerUps.splice(0, clonePowerUps.length);
    teleportationPowerUps.splice(0, teleportationPowerUps.length);
    shockwavePowerUps.splice(0, shockwavePowerUps.length);
  }

  //Handle game over display
  if (!ships[0].visible) {
    c.fillStyle = textColor;
    c.font = `${0.05 * canvas.height}px Candara`;
    c.fillText(
      `GAME OVER!!!`,
      Math.round(canvas.width / 2 - 0.09 * canvas.width),
      Math.round(canvas.height / 2 - 0.08 * canvas.height)
    );
    c.fillText(
      `You scored ${score} points`,
      Math.round(canvas.width / 2 - 0.09 * canvas.width),
      Math.round(
        canvas.height / 2 + 0.05 * canvas.height - 0.08 * canvas.height
      )
    );
    c.fillText(
      `Press R to reset`,
      Math.round(canvas.width / 2 - 0.09 * canvas.width),
      Math.round(canvas.height / 2 + 0.1 * canvas.height - 0.08 * canvas.height)
    );
  }
}

//Handle when ship is freshly spawned
function handleFreshlySpawned() {
  if (ships[0].freshlySpawnedTicker === ships[0].freshlySpawnedDuration) {
    ships[0].freshlySpawned = false;
    ships[0].freshlySpawnedTicker = 0;
  }

  if (ships[0].freshlySpawned === true) {
    ships[0].freshlySpawnedTicker++;
  }
}

//Handle when power-ups are active
function handlePowerUpsActive() {
  //Handle invincibility
  if (ships[0].invincibilityTicker === ships[0].invincibilityDuration) {
    ships[0].invincible = false;
    ships[0].invincibilityTicker = 0;
  }

  if (ships[0].invincible === true) {
    ships[0].invincibilityTicker++;
  }

  //Handle clone
  if (ships[1].visibilityTicker === ships[1].visibilityDuration) {
    ships[1].visible = false;
    ships[1].visibilityTicker = 0;
  }

  if (ships[1].visible === true) {
    ships[1].visibilityTicker++;
  }

  if (ships[1].shotTicker === ships[1].shotDuration) {
    ships[1].canShoot = false;
    ships[1].shotTicker = 0;
  }

  if (ships[1].canShoot === true) {
    ships[1].shotTicker++;
  }

  if (ships[1].nullShotTicker === ships[1].nullShotDuration) {
    ships[1].canShoot = true;
    ships[1].nullShotTicker = 0;
  }

  if (ships[1].canShoot === false) {
    ships[1].nullShotTicker++;
  }

  if (
    !isPaused &&
    ships[1].visible &&
    ships[1].invincible &&
    ships[1].canShoot
  ) {
    ships[1].shoot();
  }

  //Handle teleportation info display
  c.fillStyle = textColor;
  c.font = `${Math.round(0.03 * canvas.height)}px Candara`;
  c.fillText(
    `TELEPORTS: ${ships[0].teleports.toString()}`,
    Math.round(0.015 * canvas.width),
    Math.round(0.07 * canvas.height)
  );
}

//Handle reset
function handleReset() {
  if (keys[82]) {
    if (!isPaused) {
      ships[0].visible = true;
      score = 0;
      ships[0].lives = 7;
      ships[0].angle = 0;
      ships[0].x = Math.round(canvas.width / 2);
      ships[0].y = Math.round(canvas.height / 2);
      ships[0].vel = { x: 0, y: 0 };
      ships[0].bullets.splice(0, ships[0].bullets.length);
      asteroids.splice(0, asteroids.length);
      invincibilityPowerUps.splice(0, invincibilityPowerUps.length);
      clonePowerUps.splice(0, clonePowerUps.length);
      teleportationPowerUps.splice(0, teleportationPowerUps.length);
      shockwavePowerUps.splice(0, shockwavePowerUps.length);
      ships[0].teleports = 0;
      c.fillStyle = fillColor;
      c.fillRect(0, 0, canvas.width, canvas.height);
    }
  }
}

//Handle when game is paused
function handlePaused() {
  if (isPaused === true) {
    paused = true;
  } else {
    paused = false;
  }

  if (isPaused) {
    c.fillStyle = textColor;
    c.font = `${Math.round(0.05 * canvas.height)}px Candara`;
    c.fillText(
      `Paused`,
      Math.round(canvas.width / 2 - 0.09 * canvas.width),
      Math.round(canvas.height / 2 - 0.08 * canvas.height)
    );
    c.fillText(
      `Press P To Proceed`,
      Math.round(canvas.width / 2 - 0.09 * canvas.width),
      Math.round(
        canvas.height / 2 + 0.05 * canvas.height - 0.08 * canvas.height
      )
    );
    c.fillText(
      `Scroll down for further instructions`,
      Math.round(canvas.width / 2 - 0.09 * canvas.width),
      Math.round(canvas.height / 2 + 0.1 * canvas.height - 0.08 * canvas.height)
    );
  }
}

//Handle score and lives display
function handleScoreAndLivesDisplay() {
  //Handle score display
  c.fillStyle = textColor;
  c.font = `${Math.round(0.03 * canvas.height)}px Candara`;
  c.fillText(
    `LIVES: ${ships[0].lives.toString()}`,
    Math.round(0.015 * canvas.width),
    Math.round(0.105 * canvas.height)
  );

  //Handle lives display
  c.fillStyle = textColor;
  c.font = `${Math.round(0.03 * canvas.height)}px Candara`;
  c.fillText(
    `SCORE: ${score.toString()}`,
    Math.round(0.015 * canvas.width),
    Math.round(0.035 * canvas.height)
  );
}
