document.addEventListener("DOMContentLoaded", () => {
  const target = document.getElementById("target");
  const target2 = document.getElementById("target2");
  const scoreDisplay = document.getElementById("score");
  const timerDisplay = document.getElementById("timer");
  const startBtn = document.getElementById("start-btn");
  const gameOverScreen = document.getElementById("game-over-screen");
  const finalScore = document.getElementById("final-score");
  const playAgainBtn = document.getElementById("play-again-btn");
  const exitToMenuBtn = document.getElementById("exit-to-menu-btn");
  const exitGameBtn = document.getElementById("exit-game-btn");
  const menu = document.getElementById("main-menu");
  const gameElements = document.querySelectorAll(
    ".box, #game-area, .score, .time"
  );

  let score = 0,
    timeLeft = 30,
    timerId,
    currentTarget,
    currentTarget2;

  const images = [
    { url: "src/img/kam.png", type: "enemy" },
    { url: "src/img/kgd.png", type: "dangerous" },
    { url: "src/img/mw.png", type: "enemy" },
    { url: "src/img/yoda.png", type: "dangerous" },
    { url: "src/img/palpatin.png", type: "civilian" },
    { url: "src/img/pa.png", type: "enemy" },
    { url: "src/img/nut.png", type: "civilian" },
    { url: "src/img/es.png", type: "enemy" },
    { url: "src/img/run.png", type: "civilian" },
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
    document.body.appendChild(ind);
    return ind;
  }
  const indicator1 = createIndicator();
  const indicator2 = createIndicator();

  function setIndicator(ind, type) {
    if (type === "civilian") {
      ind.style.backgroundColor = "green";
      ind.style.border = "2px solid #00FF00";
    } else if (type === "enemy") {
      ind.style.backgroundColor = "red";
      ind.style.border = "2px solid #FF0000";
    } else if (type === "dangerous") {
      ind.style.backgroundColor = "black";
      ind.style.border = "2px solid #000000";
    } else {
      ind.style.display = "none";
      return;
    }
    ind.style.display = "block";
  }

  function moveTarget() {
    const x1 = Math.random() * 1050;
    const y1 = Math.random() * 325;
    const x2 = Math.random() * 1050;
    const y2 = Math.random() * 325;

    target.style.left = x1 + "px";
    target.style.top = y1 + "px";
    target2.style.left = x2 + "px";
    target2.style.top = y2 + "px";

    indicator1.style.left = x1 + 40 + "px";
    indicator1.style.top = y1 - 25 + "px";
    indicator2.style.left = x2 + 40 + "px";
    indicator2.style.top = y2 - 25 + "px";

    target.classList.remove("appear");
    target2.classList.remove("appear");
    setTimeout(() => {
      target.classList.add("appear");
      target2.classList.add("appear");
    }, 50);
  }

  function changeImages() {
    let img1 = images[Math.floor(Math.random() * images.length)];
    let img2;
    do {
      img2 = images[Math.floor(Math.random() * images.length)];
    } while (img1.type === "civilian" && img2.type === "civilian");

    currentTarget = img1;
    currentTarget2 = img2;

    target.style.backgroundImage = `url(${img1.url})`;
    target2.style.backgroundImage = `url(${img2.url})`;
    setIndicator(indicator1, img1.type);
    setIndicator(indicator2, img2.type);
  }

  function updateTimer() {
    timerDisplay.textContent = `${String(Math.floor(timeLeft / 60)).padStart(
      2,
      "0"
    )}:${String(timeLeft % 60).padStart(2, "0")}`;
    if (timeLeft <= 0) {
      clearTimeout(timerId);
      endGame();
    } else {
      timeLeft--;
      timerId = setTimeout(updateTimer, 1000);
    }
  }

  function handleShot(type) {
    if (type === "civilian") alert("Обережно! Мирний!");
    else if (type === "dangerous") score += 2;
    else score += 1;
    scoreDisplay.textContent = score;
    moveTarget();
    changeImages();
  }

  target.addEventListener("click", () => handleShot(currentTarget.type));
  target2.addEventListener("click", () => handleShot(currentTarget2.type));

  function startGame() {
    score = 0;
    timeLeft = 30;
    scoreDisplay.textContent = score;
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

  startBtn.addEventListener("click", startGame);
  playAgainBtn.addEventListener("click", () => {
    gameOverScreen.style.display = "none";
    startGame();
  });
  exitToMenuBtn.addEventListener("click", () => {
    gameOverScreen.style.display = "none";
    showMenu();
  });
  exitGameBtn.addEventListener("click", showMenu);

  showMenu();

  // --- Курсор-меч ---
  const cursor = document.createElement("div");
  Object.assign(cursor.style, {
    position: "fixed",
    width: "125px",
    height: "125px",
    background: "url('src/img/spada.png') no-repeat center / contain",
    pointerEvents: "none",
    zIndex: "9999",
    transform: "translate(-50%, -50%)",
  });
  document.body.appendChild(cursor);
  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });
});
