const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
    lives: document.querySelector("#lives"),
  },
  values: {
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    currentTime: 10,
    lives: 3,
  },
  actions: {
    timerId: setInterval(randomSquare, 1000),
    countDownTimerId: setInterval(countDown, 1000),
  },
};

function countDown() {
  state.values.currentTime--;
  state.view.timeLeft.textContent = state.values.currentTime;

  if (state.values.currentTime < 0) {
    resetCountDown();
    alert("O seu resultado foi: " + state.values.result);
    reset();
  }
}

function resetCountDown() {
  clearInterval(state.actions.countDownTimerId);
  clearInterval(state.actions.timerId);
}

function reset() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });

  state.actions.timerId = setInterval(randomSquare, 1000);
  state.actions.countDownTimerId = setInterval(countDown, 1000);

  state.values.lives = 3;
  state.values.result = 0;
  state.values.currentTime = 10;

  state.view.score.textContent = state.values.result;
  state.view.lives.textContent = state.values.lives;
  state.view.timeLeft.textContent = state.values.currentTime;
}

function playSound(sound, volume) {
  let audio = new Audio(`./src/sounds/${sound}.m4a`);
  audio.volume = volume || 0.2;
  audio.play();
}

function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });

  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.squares[randomNumber];

  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.hitPosition) {
        state.values.hitPosition = null;
        state.values.result++;
        state.view.score.textContent = state.values.result;
        playSound("hit", 0.2);
        square.classList.remove("enemy");
      } else {
        playSound("miss", 0.5);
        state.values.lives--;
        state.view.lives.textContent = state.values.lives;

        if (state.values.lives <= 0) {
          resetCountDown();
          alert("Game Over! O seu resultado foi: " + state.values.result);
          reset();
        }
      }
    });
  });
}

function init() {
  state.view.score.textContent = state.values.result;
  state.view.lives.textContent = state.values.lives;
  state.view.timeLeft.textContent = state.values.currentTime;

  addListenerHitBox();
}

init();
