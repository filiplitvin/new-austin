const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const menu = document.getElementById("menu");
const startBtn = document.getElementById("startBtn");
const bossBtn = document.getElementById("bossBtn");
const winsCountElem = document.getElementById("winsCount");

let gameMode = "menu";
let wins = 0;

let player, enemy;

// === Додаємо зображення героя та боса ===
const heroImg = new Image();
heroImg.src = "src/img/hero-p.png";

const bossImg = new Image();
bossImg.src = "src/img/obi-wan.png";

function createPlayer() {
  return {
    x: 100,
    y: 180,
    width: 60,
    height: 80,
    speed: 3,
    attack: false,
    attackTimer: 0,
    health: 10,
  };
}

function createEnemy(isBoss = false) {
  return {
    x: 450,
    y: 180,
    width: 60,
    height: 80,
    color: isBoss ? "purple" : "orange",
    speed: isBoss ? 1.5 : 2,
    attack: false,
    attackTimer: 0,
    health: isBoss ? 25 : 10,
    isBoss: isBoss,
  };
}

const keys = {};

window.addEventListener("keydown", (e) => {
  if (gameMode === "fight" || gameMode === "bossFight") {
    keys[e.key.toLowerCase()] = true;
    if (e.key.toLowerCase() === "f") {
      player.attack = true;
      player.attackTimer = 10;
    }
  }
});
window.addEventListener("keyup", (e) => {
  keys[e.key.toLowerCase()] = false;
});

let enemyDirection = 1;
let enemyAttackCooldown = 0;

function resetFight(isBoss = false) {
  player = createPlayer();
  enemy = createEnemy(isBoss);
  enemyDirection = 1;
  enemyAttackCooldown = 0;
}

function updateFight() {
  if (keys["w"] && player.y > 0) player.y -= player.speed;
  if (keys["s"] && player.y + player.height < canvas.height)
    player.y += player.speed;
  if (keys["a"] && player.x > 0) player.x -= player.speed;
  if (keys["d"] && player.x + player.width < canvas.width)
    player.x += player.speed;

  if (player.attackTimer > 0) player.attackTimer--;
  else player.attack = false;

  enemy.x += enemy.speed * enemyDirection;
  if (enemy.x > 500) enemyDirection = -1;
  if (enemy.x < 400) enemyDirection = 1;

  if (enemyAttackCooldown > 0) enemyAttackCooldown--;
  else {
    if (Math.random() < (enemy.isBoss ? 0.03 : 0.02)) {
      enemy.attack = true;
      enemy.attackTimer = 10;
      enemyAttackCooldown = 80;
    }
  }
  if (enemy.attackTimer > 0) enemy.attackTimer--;
  else enemy.attack = false;

  if (player.attack && rectIntersect(player, enemy)) {
    enemy.health--;
    enemy.color = "red";
  } else {
    enemy.color = enemy.isBoss ? "purple" : "orange";
  }

  if (enemy.attack && rectIntersect(enemy, player)) {
    player.health--;
    player.color = "red";
  } else {
    player.color = "cyan";
  }

  if (enemy.health <= 0) {
    wins++;
    winsCountElem.textContent = wins;
    alert(enemy.isBoss ? "Ти переміг Боса!" : "Ворог переможений!");
    endFight();
  }
  if (player.health <= 0) {
    alert("Ти програв!");
    endFight();
  }
}

function rectIntersect(a, b) {
  return !(
    b.x > a.x + a.width ||
    b.x + b.width < a.x ||
    b.y > a.y + a.height ||
    b.y + b.height < a.y
  );
}

function drawFight() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Герой
  ctx.drawImage(heroImg, player.x, player.y, player.width, player.height);

  // Меч гравця
  if (player.attack) {
    ctx.fillStyle = "lime";
    ctx.fillRect(player.x + player.width, player.y + player.height / 3, 20, 8);
  }

  // Ворог
  if (enemy.isBoss) {
    ctx.drawImage(bossImg, enemy.x, enemy.y, enemy.width, enemy.height);
  } else {
    ctx.fillStyle = enemy.color;
    ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
  }

  // Меч ворога
  if (enemy.attack) {
    ctx.fillStyle = "yellow";
    ctx.fillRect(enemy.x - 20, enemy.y + enemy.height / 3, 20, 8);
  }

  // Здоров'я
  ctx.fillStyle = "white";
  ctx.font = "16px sans-serif";
  ctx.fillText(`Ти: ${player.health} HP`, 10, 20);
  ctx.fillText(
    `${enemy.isBoss ? "Обі-Ван" : "Ворог"}: ${enemy.health} HP`,
    450,
    20
  );
}

function gameLoop() {
  if (gameMode === "fight" || gameMode === "bossFight") {
    updateFight();
    drawFight();
  }
  requestAnimationFrame(gameLoop);
}

function startFight() {
  gameMode = "fight";
  resetFight(false);
  canvas.style.display = "block";
  menu.style.display = "none";
}

function startBossFight() {
  gameMode = "bossFight";
  resetFight(true);
  canvas.style.display = "block";
  menu.style.display = "none";
}

function endFight() {
  gameMode = "menu";
  canvas.style.display = "none";
  menu.style.display = "block";

  if (wins >= 5) {
    bossBtn.style.display = "inline-block";
  }
}

// Кнопки
startBtn.addEventListener("click", startFight);
bossBtn.addEventListener("click", startBossFight);

gameLoop();
