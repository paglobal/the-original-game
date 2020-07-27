//Keyboard controls setup
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

//Touchscreen controls setup
let startX1;
let startY1;
let startX2;
let startY2;
let distX;
let distY;
let touchmove1;
let touchmove2;

//Touchstart controls
function touchstartControls(e) {
  e.preventDefault();
  if (paused === true && ships[0].lives !== 0) {
    //Handle play
    if (justStarted) {
      //FirstTheme.play();
      isPaused = false;
      c.fillStyle = fillColor;
      c.fillRect(0, 0, canvas.width, canvas.height);
    }
    justStarted = false;
  }

  for (let i = 0; i < e.changedTouches.length; i++) {
    //Initiate ship rotation
    if (
      e.changedTouches[i].clientX < canvas.width / 2 &&
      !isPaused &&
      ships[0].lives !== 0
    ) {
      startX1 =
        e.changedTouches[i].clientX -
        (ships[0].radius + ships[0].distanceFromCenter) *
          Math.cos(ships[0].radians);
      startY1 =
        e.changedTouches[i].clientY -
        (ships[0].radius + ships[0].distanceFromCenter) *
          Math.sin(ships[0].radians);
      touchmove1 = false;
    }

    //Initiate ship movement (translation)
    if (
      e.changedTouches[i].clientX > canvas.width / 2 &&
      !isPaused &&
      ships[0].lives !== 0
    ) {
      startX2 = e.changedTouches[i].clientX;
      startY2 = e.changedTouches[i].clientY;
      touchmove2 = false;
    }
  }
}

//Touchmove controls
function touchmoveControls(e) {
  e.preventDefault();
  for (let i = 0; i < e.changedTouches.length; i++) {
    if (
      e.changedTouches[i].clientX < canvas.width / 2 &&
      !isPaused &&
      ships[0].lives !== 0
    ) {
      touchmove1 = true;

      //Draw rotation line
      c.save();
      c.beginPath();
      c.strokeStyle = "white";
      c.shadowColor = "white";
      c.shadowBlur = canvas.width / 683;
      c.lineWidth = canvas.width / 683;
      c.moveTo(startX1, startY1);
      c.lineTo(e.changedTouches[i].clientX, e.changedTouches[i].clientY);
      c.stroke();
      c.closePath();
      c.restore();

      //Rotate ship
      let x = startX1 - e.changedTouches[i].clientX;
      let y = startY1 - e.changedTouches[i].clientY;
      ships[0].angle = Math.atan2(y, x) / (Math.PI / 180);
    }

    if (
      e.changedTouches[i].clientX > canvas.width / 2 &&
      !isPaused &&
      ships[0].lives !== 0
    ) {
      touchmove2 = true;
    }
  }
}

//Touchend controls
function touchendControls(e) {
  e.preventDefault();
  for (let i = 0; i < e.changedTouches.length; i++) {
    if (
      e.changedTouches[i].clientX < canvas.width / 2 &&
      !isPaused &&
      touchmove1 === false &&
      ships[0].lives !== 0 &&
      ships[0].teleports !== 0
    ) {
      ships[0].teleport();
      ships[0].teleports--;
    }

    if (
      e.changedTouches[i].clientX > canvas.width / 2 &&
      !isPaused &&
      touchmove2 === false &&
      ships[0].lives !== 0
    ) {
      ships[0].shoot();
    }

    if (
      e.changedTouches[i].clientX > canvas.width / 2 &&
      !isPaused &&
      touchmove2 === true &&
      ships[0].lives !== 0
    ) {
      distX = startX2 - e.changedTouches[i].clientX;
      distY = startY2 - e.changedTouches[i].clientY;

      if (distY > 0) {
        keys[38] = true;
      } else if (distY < 0) {
        keys[38] = false;
      }
    }
  }
}
