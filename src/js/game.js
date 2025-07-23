document.addEventListener("DOMContentLoaded", () => {
  const target = document.getElementById("target");
  const target2 = document.createElement("div");
  target2.id = "target2";
  target2.style.position = "absolute";
  target2.style.width = "100px";
  target2.style.height = "150px";
  target2.style.backgroundSize = "contain";
  target2.style.backgroundRepeat = "no-repeat";
  target2.style.cursor = "crosshair";
  target.parentElement.appendChild(target2);

  const scoreDisplay = document.getElementById("score");
  const timerDisplay = document.getElementById("timer");
  const startBtn = document.getElementById("start-btn");
  const gameOverScreen = document.getElementById("game-over-screen");
  const finalScore = document.getElementById("final-score");
  const playAgainBtn = document.getElementById("play-again-btn");
  const exitToMenuBtn = document.getElementById("exit-to-menu-btn");

  const gameElements = document.querySelectorAll(
    ".box, #game-area, .score, .clock, .time, .text"
  );
  const menu = document.getElementById("main-menu");

  let score = 0;
  let timeLeft = 30;
  let timerId;

  const images = [
    { url: "../src/img/bohhh.png", type: "enemy" },
    { url: "../src/img/arthur.png", type: "dangerous" },
    { url: "../src/img/bill.png", type: "enemy" },
    { url: "../src/img/dutch.png", type: "dangerous" },
    { url: "../src/img/jm.png", type: "dangerous" },
    { url: "../src/img/rat.png", type: "dangerous" },
    { url: "../src/img/javier.png", type: "enemy" },
    { url: "../src/img/abbi.png", type: "enemy" },
    { url: "../src/img/cs.png", type: "enemy" },
    { url: "../src/img/hm.png", type: "dangerous" },
    { url: "../src/img/lenny.png", type: "enemy" },
    { url: "../src/img/leopold.png", type: "enemy" },
    { url: "../src/img/mb.png", type: "civilian" },
    { url: "../src/img/person.png", type: "civilian" },
    { url: "../src/img/sean.png", type: "enemy" },
    { url: "../src/img/swanson.png", type: "civilian" },
    { url: "../src/img/tilly.png", type: "enemy" },
    { url: "../src/img/uncle.png", type: "enemy" },
    { url: "../src/img/susan.png", type: "civilian" },
  ];

  function createIndicator() {
    const ind = document.createElement("div");
    ind.style.position = "absolute";
    ind.style.width = "20px";
    ind.style.height = "20px";
    ind.style.borderRadius = "50%";
    ind.style.top = "-25px";
    ind.style.left = "40px";
    ind.style.pointerEvents = "none";
    return ind;
  }

  const indicator1 = createIndicator();
  const indicator2 = createIndicator();

  target.parentElement.appendChild(indicator1);
  target2.parentElement.appendChild(indicator2);

  function setIndicator(indicator, type) {
    if (type === "civilian") {
      indicator.style.backgroundColor = "green";
      indicator.style.border = "2px solid #00FF00";
      indicator.style.display = "block";
    } else if (type === "enemy") {
      indicator.style.backgroundColor = "red";
      indicator.style.border = "2px solid #FF0000";
      indicator.style.display = "block";
    } else if (type === "dangerous") {
      indicator.style.backgroundColor = "black";
      indicator.style.border = "2px solid #000000";
      indicator.style.display = "block";
    } else {
      indicator.style.display = "none";
    }
  }

  function moveTarget() {
    const x1 = Math.floor(Math.random() * (1150 - 100));
    const y1 = Math.floor(Math.random() * (375 - 150));
    target.style.left = `${x1}px`;
    target.style.top = `${y1}px`;

    const x2 = Math.floor(Math.random() * (1150 - 100));
    const y2 = Math.floor(Math.random() * (375 - 150));
    target2.style.left = `${x2}px`;
    target2.style.top = `${y2}px`;

    target.classList.remove("appear");
    target2.classList.remove("appear");

    setTimeout(() => {
      target.classList.add("appear");
      target2.classList.add("appear");
    }, 50);

    indicator1.style.left = `${x1 + 40}px`;
    indicator1.style.top = `${y1 - 25}px`;

    indicator2.style.left = `${x2 + 40}px`;
    indicator2.style.top = `${y2 - 25}px`;
  }

  let currentTarget, currentTarget2;

  function changeImages() {
    const index1 = Math.floor(Math.random() * images.length);
    const index2 = Math.floor(Math.random() * images.length);

    currentTarget = images[index1];
    currentTarget2 = images[index2];

    target.style.backgroundImage = `url(${currentTarget.url})`;
    target2.style.backgroundImage = `url(${currentTarget2.url})`;

    target.style.border = "none";
    target2.style.border = "none";

    setIndicator(indicator1, currentTarget.type);
    setIndicator(indicator2, currentTarget2.type);
  }

  function updateTimer() {
    const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
    const seconds = String(timeLeft % 60).padStart(2, "0");
    timerDisplay.textContent = `${minutes}:${seconds}`;

    if (timeLeft === 0) {
      clearTimeout(timerId);
      target.style.display = "none";
      target2.style.display = "none";
      indicator1.style.display = "none";
      indicator2.style.display = "none";
      gameElements.forEach((el) => (el.style.display = "none"));

      finalScore.textContent = score;
      gameOverScreen.style.display = "flex";
      return;
    }

    timeLeft--;
    timerId = setTimeout(updateTimer, 1000);
  }

  target.addEventListener("click", () => {
    if (currentTarget.type === "civilian") {
      alert("Careful! That was a civilian!");
    } else {
      score++;
      scoreDisplay.textContent = score;
    }
    moveTarget();
    changeImages();
  });

  target2.addEventListener("click", () => {
    if (currentTarget2.type === "civilian") {
      alert("Careful! That was a civilian!");
    } else {
      score++;
      scoreDisplay.textContent = score;
    }
    moveTarget();
    changeImages();
  });

  startBtn.addEventListener("click", () => {
    startGame();
  });

  playAgainBtn.addEventListener("click", () => {
    gameOverScreen.style.display = "none";
    startGame();
  });

  exitToMenuBtn.addEventListener("click", () => {
    gameOverScreen.style.display = "none";
    showMenu();
  });

  function startGame() {
    clearTimeout(timerId);
    score = 0;
    timeLeft = 30;
    scoreDisplay.textContent = score;
    target.style.display = "block";
    target2.style.display = "block";
    indicator1.style.display = "block";
    indicator2.style.display = "block";

    changeImages();
    moveTarget();
    updateTimer();
    showGame();
  }

  function showGame() {
    menu.style.display = "none";
    gameElements.forEach((el) => (el.style.display = "block"));
  }

  function showMenu() {
    menu.style.display = "flex";
    gameElements.forEach((el) => (el.style.display = "none"));
  }

  showMenu();
});
