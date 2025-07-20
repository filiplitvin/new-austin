// document.addEventListener("DOMContentLoaded", () => {
//   const target = document.getElementById("target");
//   const scoreDisplay = document.getElementById("score");
//   const timerDisplay = document.getElementById("timer");
//   const shotSound = document.getElementById("shot-sound");
//   let score = 0;
//   let timeLeft = 30;

//   const images = ["", "bohhh.webp", "arthur.webp", "boh.webp"];
//   const character = document.getElementById("character");

//   // Функція для руху мішені
//   function moveTarget() {
//     const x = Math.floor(Math.random() * (1150 - 100));
//     const y = Math.floor(Math.random() * (375 - 150));
//     target.style.left = `${x}px`;
//     target.style.top = `${y}px`;

//     target.classList.remove("appear");
//     setTimeout(() => {
//       target.classList.add("appear");
//     }, 50);
//   }

//   // Форматування часу для таймера
//   function updateTimer() {
//     const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
//     const seconds = String(timeLeft % 60).padStart(2, "0");
//     timerDisplay.textContent = `${minutes}:${seconds}`;

//     if (timeLeft === 0) {
//       target.style.display = "none";
//       alert(`Гра завершена! Очки: ${score}`);
//       return;
//     }

//     timeLeft--;
//     setTimeout(updateTimer, 1000);
//   }

//   // Зміна зображення персонажа
//   function changeImage() {
//     if (character) {
//       const nextIndex = score % images.length;
//       character.src = images[nextIndex];
//     }
//   }

//   // Обробник кліку на мішень
//   target.addEventListener("click", () => {
//     score++;
//     scoreDisplay.textContent = score;
//     moveTarget();
//     changeImage();
//     if (shotSound) shotSound.play();
//   });

//   // Початкова ініціалізація
//   moveTarget();
//   updateTimer();
// });
document.addEventListener("DOMContentLoaded", () => {
  const target = document.getElementById("target");
  const scoreDisplay = document.getElementById("score");
  const timerDisplay = document.getElementById("timer");
  const shotSound = document.getElementById("shot-sound");
  let score = 0;
  let timeLeft = 30;

  // Масив зображень для зміни
  const images = [
    "../src/img/bohhh.webp",
    "../src/img/arthur.webp",
    "../src/img/boh.webp",
    "../src/img/bill.png", // Нове зображення
    "../src/img/dutch.png", // Нове зображення
    "../src/img/jm.png", // Нове зображення
    "../src/img/rat.png", // Нове зображення
  ];

  // Функція для руху мішені
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

  // Форматування часу для таймера
  function updateTimer() {
    const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
    const seconds = String(timeLeft % 60).padStart(2, "0");
    timerDisplay.textContent = `${minutes}:${seconds}`;

    if (timeLeft === 0) {
      target.style.display = "none";
      alert(`Гра завершена! Очки: ${score}`);
      return;
    }

    timeLeft--;
    setTimeout(updateTimer, 1000);
  }

  // Зміна зображення мішені
  function changeImage() {
    const nextIndex = score % images.length;
    target.style.backgroundImage = `url(${images[nextIndex]})`;
  }

  // Обробник кліку на мішень
  target.addEventListener("click", () => {
    score++;
    scoreDisplay.textContent = score;
    moveTarget();
    changeImage();
    if (shotSound) shotSound.play();
  });

  // Початкова ініціалізація
  moveTarget();
  updateTimer();
});
