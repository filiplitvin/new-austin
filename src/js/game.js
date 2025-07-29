document.addEventListener("DOMContentLoaded", () => {
  const target = document.getElementById("target");
  const target2 = document.createElement("div");
  target2.id = "target2";
  Object.assign(target2.style, {
    position: "absolute",
    width: "100px",
    height: "150px",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    cursor: "crosshair",
  });
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
  let currentTarget, currentTarget2;

  const images = [
    { url: "src/img/bohhh.png", type: "enemy" },
    { url: "src/img/arthur.png", type: "dangerous" },
    { url: "src/img/bill.png", type: "enemy" },
    { url: "src/img/dutch.png", type: "dangerous" },
    { url: "src/img/jm.png", type: "dangerous" },
    { url: "src/img/rat.png", type: "dangerous" },
    { url: "src/img/javier.png", type: "enemy" },
    { url: "src/img/abbi.png", type: "enemy" },
    { url: "src/img/cs.png", type: "enemy" },
    { url: "src/img/hm.png", type: "dangerous" },
    { url: "src/img/lenny.png", type: "enemy" },
    { url: "src/img/leopold.png", type: "enemy" },
    { url: "src/img/mb.png", type: "civilian" },
    { url: "src/img/person.png", type: "civilian" },
    { url: "src/img/sean.png", type: "enemy" },
    { url: "src/img/swanson.png", type: "civilian" },
    { url: "src/img/tilly.png", type: "enemy" },
    { url: "src/img/uncle.png", type: "enemy" },
    { url: "src/img/susan.png", type: "civilian" },
  ];

  function createIndicator() {
    const ind = document.createElement("div");
    Object.assign(ind.style, {
      position: "absolute",
      width: "20px",
      height: "20px",
      borderRadius: "50%",
      top: "-25px",
      left: "40px",
      pointerEvents: "none",
    });
    return ind;
  }

  const indicator1 = createIndicator();
  const indicator2 = createIndicator();
  target.parentElement.appendChild(indicator1);
  target2.parentElement.appendChild(indicator2);

  function setIndicator(indicator, type) {
    switch (type) {
      case "civilian":
        indicator.style.backgroundColor = "green";
        indicator.style.border = "2px solid #00FF00";
        break;
      case "enemy":
        indicator.style.backgroundColor = "red";
        indicator.style.border = "2px solid #FF0000";
        break;
      case "dangerous":
        indicator.style.backgroundColor = "black";
        indicator.style.border = "2px solid #000000";
        break;
      default:
        indicator.style.display = "none";
        return;
    }
    indicator.style.display = "block";
  }

  function moveTarget() {
    const x1 = Math.floor(Math.random() * (1150 - 100));
    const y1 = Math.floor(Math.random() * (375 - 150));
    const x2 = Math.floor(Math.random() * (1150 - 100));
    const y2 = Math.floor(Math.random() * (375 - 150));

    target.style.left = `${x1}px`;
    target.style.top = `${y1}px`;
    target2.style.left = `${x2}px`;
    target2.style.top = `${y2}px`;

    indicator1.style.left = `${x1 + 40}px`;
    indicator1.style.top = `${y1 - 25}px`;
    indicator2.style.left = `${x2 + 40}px`;
    indicator2.style.top = `${y2 - 25}px`;

    target.classList.remove("appear");
    target2.classList.remove("appear");
    setTimeout(() => {
      target.classList.add("appear");
      target2.classList.add("appear");
    }, 50);
  }

  function changeImages() {
    currentTarget = images[Math.floor(Math.random() * images.length)];
    currentTarget2 = images[Math.floor(Math.random() * images.length)];

    target.style.backgroundImage = `url(${currentTarget.url})`;
    target2.style.backgroundImage = `url(${currentTarget2.url})`;

    setIndicator(indicator1, currentTarget.type);
    setIndicator(indicator2, currentTarget2.type);
  }

  function updateTimer() {
    const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
    const seconds = String(timeLeft % 60).padStart(2, "0");
    timerDisplay.textContent = `${minutes}:${seconds}`;

    if (timeLeft === 0) {
      clearTimeout(timerId);
      endGame();
      return;
    }

    timeLeft--;
    timerId = setTimeout(updateTimer, 1000);
  }

  function handleShot(targetType) {
    if (targetType === "civilian") {
      alert("Careful! That was a civilian!");
    } else if (targetType === "dangerous") {
      score += 2;
    } else if (targetType === "enemy") {
      score += 1;
    }
    scoreDisplay.textContent = score;
    moveTarget();
    changeImages();
  }

  target.addEventListener("click", () => {
    handleShot(currentTarget.type);
  });

  target2.addEventListener("click", () => {
    handleShot(currentTarget2.type);
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

  function endGame() {
    target.style.display = "none";
    target2.style.display = "none";
    indicator1.style.display = "none";
    indicator2.style.display = "none";
    gameElements.forEach((el) => (el.style.display = "none"));
    finalScore.textContent = score;
    gameOverScreen.style.display = "flex";
  }

  function showGame() {
    menu.style.display = "none";
    gameElements.forEach((el) => (el.style.display = "block"));
  }

  function showMenu() {
    menu.style.display = "flex";
    gameElements.forEach((el) => (el.style.display = "none"));
  }

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

  showMenu();
});
