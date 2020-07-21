function keyboardControls(e) {
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
      //FirstTheme.play();
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
  if (
    e.keyCode === 17 &&
    !isPaused &&
    ships[0].lives !== 0 &&
    ships[0].teleports !== 0
  ) {
    ships[0].teleport();
    ships[0].teleports--;
  }
}
