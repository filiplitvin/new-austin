document.addEventListener("DOMContentLoaded", () => {
  const target = document.getElementById("target");
  const target2 = document.getElementById("target2");
  const scoreDisplay = document.getElementById("score");
  const timerDisplay = document.getElementById("timer");
  const startBtn = document.getElementById("startBtn");
  const gameOverScreen = document.getElementById("game-over-screen");
  const finalScore = document.getElementById("final-score");
  const exitToMenuBtn = document.getElementById("exit-to-menu-btn");
  const exitGameBtn = document.getElementById("exit-game-btn");
  const menu = document.getElementById("main-menu");

  const gameElements = document.querySelectorAll(
    ".box, #game-area, .score, .time, .exit-button-box, .creators"
  );

  let score = 0;
  let timeLeft = 30;
  let timerId;
  let currentTarget, currentTarget2;

  const images = [
    { url: "src/img/mw.png", type: "enemy" },
    { url: "src/img/obi-wan.png", type: "dangerous" },
    { url: "src/img/nut.png", type: "civilian" },
    { url: "src/img/kgd.png", type: "dangerous" },
    { url: "src/img/run.png", type: "civilian" },
    { url: "src/img/kam.png", type: "enemy" },
    { url: "src/img/palpatin.png", type: "civilian" },
    { url: "src/img/pa.png", type: "enemy" },
    { url: "src/img/es.png", type: "enemy" },
    { url: "src/img/yoda.png", type: "dangerous" },
  ];

  function showGame() {
    menu.style.display = "none";
    gameOverScreen.style.display = "none";
    score = 0;
    timeLeft = 30;
    scoreDisplay.textContent = score;
    timerDisplay.textContent = "00:30";

    gameElements.forEach((el) => (el.style.display = "block"));

    startTimer();
    changeImages();
    moveTargets();
  }

  function showMenu() {
    clearTimeout(timerId);
    gameOverScreen.style.display = "none";
    menu.style.display = "flex";
    gameElements.forEach((el) => (el.style.display = "none"));
  }

  function endGame() {
    clearTimeout(timerId);
    gameElements.forEach((el) => (el.style.display = "none"));
    finalScore.textContent = score;
    gameOverScreen.style.display = "flex";
  }

  function startTimer() {
    updateTimer();
  }

  function updateTimer() {
    const min = String(Math.floor(timeLeft / 60)).padStart(2, "0");
    const sec = String(timeLeft % 60).padStart(2, "0");
    timerDisplay.textContent = `${min}:${sec}`;

    if (timeLeft <= 0) {
      endGame();
    } else {
      timeLeft--;
      timerId = setTimeout(updateTimer, 1000);
    }
  }

  function moveTargets() {
    const x1 = Math.random() * 1050;
    const y1 = Math.random() * 325;
    const x2 = Math.random() * 1050;
    const y2 = Math.random() * 325;

    target.style.left = `${x1}px`;
    target.style.top = `${y1}px`;
    target2.style.left = `${x2}px`;
    target2.style.top = `${y2}px`;
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

    // Видаляємо попередні класи
    target.classList.remove("enemy", "dangerous", "civilian");
    target2.classList.remove("enemy", "dangerous", "civilian");

    // Додаємо класи за типом
    target.classList.add(img1.type);
    target2.classList.add(img2.type);
  }

  function handleShot(type) {
    if (type === "civilian") {
      alert("Обережно! Це мирний!");
    } else if (type === "dangerous") {
      score += 2;
    } else {
      score += 1;
    }
    scoreDisplay.textContent = score;
    moveTargets();
    changeImages();
  }

  target.addEventListener("click", () => handleShot(currentTarget.type));
  target2.addEventListener("click", () => handleShot(currentTarget2.type));

  // Кнопки
  startBtn.addEventListener("click", showGame);
  exitGameBtn.addEventListener("click", showMenu);
  exitToMenuBtn.addEventListener("click", showMenu);

  // Почати з меню
  showMenu();
});
