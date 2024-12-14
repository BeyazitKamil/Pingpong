// script.js
const gameArea = document.querySelector('.game-area');
const fikretOrman = document.getElementById('fikret-orman');
const azizYildirim = document.getElementById('aziz-yildirim');
const ball = document.querySelector('.ball');
const fikretScoreDisplay = document.getElementById('fikret-score');
const azizScoreDisplay = document.getElementById('aziz-score');
const winnerMessage = document.getElementById('winner-message');

let fikretY = 150, azizY = 150;
let ballX = 390, ballY = 190;
let ballSpeedX = 4, ballSpeedY = 4;
let fikretScore = 0, azizScore = 0;

const paddleSpeed = 8;
const paddleHeight = 100;
const gameHeight = 400;

// Bilgisayar hareketi
const computerSpeed = 4;

// Klavye tuşları
const keys = {};

// Oyunu başlatma durumu
let gameRunning = false;

// Tuş basma
window.addEventListener('keydown', (e) => keys[e.key] = true);
window.addEventListener('keyup', (e) => keys[e.key] = false);

// "Başla" tuşuna tıklama
document.getElementById('start-button').addEventListener('click', () => {
  if (!gameRunning) {
    gameRunning = true;
    winnerMessage.style.display = 'none';
    gameLoop();
  }
});

// "Durdur" tuşuna tıklama
document.getElementById('stop-button').addEventListener('click', () => {
  gameRunning = false;
});

// Oyun döngüsü
function gameLoop() {
  // Fikret Orman hareketi (W ve S tuşları)
  if (keys['w'] && fikretY > 0) fikretY -= paddleSpeed;
  if (keys['s'] && fikretY < gameHeight - paddleHeight) fikretY += paddleSpeed;

  // Aziz Yıldırım (Bilgisayar) hareketi
  if (ballY > azizY + paddleHeight / 2) azizY += computerSpeed;
  if (ballY < azizY + paddleHeight / 2) azizY -= computerSpeed;

  // Paddle'ları güncelle
  fikretOrman.style.top = `${fikretY}px`;
  azizYildirim.style.top = `${azizY}px`;

  // Top hareketi
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Top duvarlara çarpınca yön değiştirir
  if (ballY <= 0 || ballY >= gameHeight - 20) {
    ballSpeedY *= -1;
  }

  // Top raketlere çarpınca yön değiştirir
  if (
    (ballX <= 15 && ballY >= fikretY && ballY <= fikretY + paddleHeight) ||
    (ballX >= 765 && ballY >= azizY && ballY <= azizY + paddleHeight)
  ) {
    ballSpeedX *= -1;
  }

  // Skor kontrolü
  if (ballX <= 0) {
    azizScore++;
    updateScore();
    resetBall();
  }

  if (ballX >= 780) {
    fikretScore++;
    updateScore();
    resetBall();
  }

  // Topu güncelle
  ball.style.left = `${ballX}px`;
  ball.style.top = `${ballY}px`;

  if (gameRunning) requestAnimationFrame(gameLoop);
}

// Skor güncelleme
function updateScore() {
  fikretScoreDisplay.textContent = fikretScore;
  azizScoreDisplay.textContent = azizScore;

  if (fikretScore === 8 || azizScore === 8) {
    gameRunning = false;
    const winner = fikretScore === 8 ? 'Beşiktaş' : ' FENERBAHCE ';
    winnerMessage.textContent = `${winner} Beşiktaş' ı Domalttı!!!!!!`;
    winnerMessage.style.display = 'block';
  }
}

// Topu sıfırlama
function resetBall() {
  ballX = 390;
  ballY = 190;
  ballSpeedX *= -1; // Yön değiştir
}