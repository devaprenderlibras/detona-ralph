const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
  },
  values: {
    timerId: null,
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    currentTime: 10,
  },
  actions: {
    countDownTimerId: setInterval(countDown, 1000),
  },
};

function countDown() {
  state.values.currentTime--;
  state.view.timeLeft.textContent = state.values.currentTime;

  if (state.values.currentTime <= 0) {
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);

    alert("Game Over! O seu resultado foi: " + state.values.result);
    reset();
  }
}

function reset() {
  state.values.currentTime = 10;
  state.actions.countDownTimerId = setInterval(countDown, 1000);
  state.values.result = 0;
  state.view.score.textContent = state.values.result;
}

function moveEnemy() {
  state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

function playSound(){
  let audio = new Audio('./src/sounds/hit.m4a');
  audio.volume = 0.2;
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
        playSound();
      }
    });
  });
}

function init() {
  moveEnemy();
  addListenerHitBox();
}

init();
