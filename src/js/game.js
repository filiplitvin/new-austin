document.addEventListener("DOMContentLoaded", () => {
  const target = document.getElementById("target");
  const scoreDisplay = document.getElementById("score");
  const timerDisplay = document.getElementById("timer");
  const shotSound = document.getElementById("shot-sound");
  const startBtn = document.getElementById("start-btn");
  const gameElements = document.querySelectorAll(
    ".box, #game-area, .score, .clock, .time, .text"
  );
  const menu = document.getElementById("main-menu");

  let score = 0;
  let timeLeft = 30;
  let timerId;

  // Масив зображень для зміни
  const images = [
    "../../src/img/bohhh.webp",
    "../src/img/arthur.webp",
    "../src/img/boh.webp",
    "../src/img/bill.png",
    "../src/img/dutch.png",
    "../src/img/jm.png",
    "../src/img/rat.png",
  ];

  function showGame() {
    menu.style.display = "none";
    gameElements.forEach((el) => (el.style.display = "block"));
  }

  function showMenu() {
    menu.style.display = "flex";
    gameElements.forEach((el) => (el.style.display = "none"));
  }

  function moveTarget() {
    const x = Math.floor(Math.random() * (1150 - 100));
    const y = Math.floor(Math.random() * (375 - 150));
    target.style.left = `${x}px`;
    target.style.top = `${y}px`;

    target.classList.remove("appear");
    setTimeout(() => {
      target.classList.add("appear");
    }, 50);
  }

  function updateTimer() {
    const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
    const seconds = String(timeLeft % 60).padStart(2, "0");
    timerDisplay.textContent = `${minutes}:${seconds}`;

    if (timeLeft === 0) {
      clearTimeout(timerId);
      target.style.display = "none";
      gameElements.forEach((el) => (el.style.display = "none"));
      showMenu();
      return;
    }

    timeLeft--;
    timerId = setTimeout(updateTimer, 1000);
  }

  function changeImage() {
    const nextIndex = score % images.length;
    target.style.backgroundImage = `url(${images[nextIndex]})`;
  }

  target.addEventListener("click", () => {
    score++;
    scoreDisplay.textContent = score;
    moveTarget();
    changeImage();
    if (shotSound) shotSound.play();
  });

  // ✅ Оновлений обробник кнопки "Start"
  startBtn.addEventListener("click", () => {
    clearTimeout(timerId); // запобігає дублюванню таймерів
    score = 0;
    timeLeft = 30;
    scoreDisplay.textContent = score;
    target.style.display = "block";
    changeImage(); // <- Додано виклик зміни картинки одразу при старті
    moveTarget();
    updateTimer();
    showGame();
  });

  // Показує меню при запуску
  showMenu();
});
