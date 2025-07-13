document.addEventListener("DOMContentLoaded", () => {
  const target = document.getElementById("target");
  const scoreDisplay = document.getElementById("score");
  let score = 0;

  function moveTarget() {
    // Генеруємо випадкові координати
    const x = Math.floor(Math.random() * (600 - 50)); // ширина поля мінус ширина мішені
    const y = Math.floor(Math.random() * (400 - 50)); // висота поля мінус висота мішені
    target.style.left = `${x}px`;
    target.style.top = `${y}px`;

    // Додаємо ефект появи
    target.classList.remove("appear");
    setTimeout(() => {
      target.classList.add("appear");
    }, 50);
  }

  target.addEventListener("click", () => {
    score++;
    scoreDisplay.textContent = score;
    moveTarget();
  });

  moveTarget();
});
const shotSound = document.getElementById("shot-sound");

// В обробнику кліку:
target.addEventListener("click", () => {
  score++;
  scoreDisplay.textContent = score;
  shotSound.play(); // 🔊 звук пострілу
  moveTarget();
});
const timerDisplay = document.getElementById("timer");
let timeLeft = 60;

function updateTimer() {
  timerDisplay.textContent = timeLeft;
  if (timeLeft === 0) {
    target.style.display = "none"; // Мішень зникає
    alert(`Гра завершена! Очки: ${score}`);
    return;
  }
  timeLeft--;
  setTimeout(updateTimer, 1000);
}

updateTimer(); // старт таймера
const character = document.getElementById("character");
const target = document.getElementById("target");
const scoreDisplay = document.getElementById("score");
let score = 0;

const images = ["", "bohhh.webp", "arthur.webp", "boh.webp"];

function changeImage() {
  const nextIndex = score % images.length;
  character.src = images[nextIndex];
}

target.addEventListener("click", () => {
  score++;
  scoreDisplay.textContent = score;
  moveTarget(); // рухаємо мішень
  changeImage(); // змінюємо картинку
});
