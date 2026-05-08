const easyWords = [
  "りんご",
  "みかん",
  "ねこ",
  "いぬ",
  "さくら"
];

const normalWords = [
  "しんかんせん",
  "パソコン",
  "ゲーム",
  "とうきょう",
  "きょうと"
];

const hardWords = [
  "ぷろぐらみんぐ",
  "あーてぃふぃしゃる",
  "でぃーぷらーにんぐ"
];

const answerInput = document.getElementById("answer");
const submitBtn = document.getElementById("submitBtn");
const gameArea = document.getElementById("gameArea");

let currentWord = "";
let train;
let moveInterval;
let answerTimeout;

let speed = 5;
let selectedWords = easyWords;

let score = 0;
let combo = 0;
let life = 3;

let gameOver = false;

function updateUI() {
  document.getElementById("score").textContent = score;
  document.getElementById("combo").textContent = combo;
  document.getElementById("life").textContent = life;
}

function createStartScreen() {

  gameArea.innerHTML = `
    <div id="startScreen">
      <h2>難易度を選択</h2>

      <button onclick="startGame('easy')">
        Easy
      </button>

      <button onclick="startGame('normal')">
        Normal
      </button>

      <button onclick="startGame('hard')">
        Hard
      </button>
    </div>
  `;
}

function startGame(level) {

  gameOver = false;

  if (level === "easy") {
    selectedWords = easyWords;
    speed = 4;
  }

  if (level === "normal") {
    selectedWords = normalWords;
    speed = 7;
  }

  if (level === "hard") {
    selectedWords = hardWords;
    speed = 10;
  }

  score = 0;
  combo = 0;
  life = 3;

  updateUI();

  gameArea.innerHTML = `
    <div id="train"></div>
  `;

  train = document.getElementById("train");

  startRound();
}

function getRandomWord() {
  return selectedWords[
    Math.floor(Math.random() * selectedWords.length)
  ];
}

function startRound() {

  clearInterval(moveInterval);
  clearTimeout(answerTimeout);

  currentWord = getRandomWord();

  train.textContent = currentWord;

  let position = -300;

  moveInterval = setInterval(() => {

    position += speed;

    train.style.left = position + "px";

    if (position > window.innerWidth) {

      clearInterval(moveInterval);

      answerTimeout = setTimeout(() => {
        miss();
      }, 3000);
    }

  }, 20);
}

function correct() {

  clearInterval(moveInterval);
  clearTimeout(answerTimeout);

  score++;
  combo++;

  if (combo >= 10) {
    combo = 0;
    life++;
    alert("ライフ回復！");
  }

  updateUI();

  if (score >= 20) {
    alert("ゲームクリア！");
    createStartScreen();
    return;
  }

  startRound();
}

function miss() {

  if (gameOver) return;

  combo = 0;
  life--;

  updateUI();

  if (life <= 0) {

    gameOver = true;

    gameArea.innerHTML = `
      <div id="gameOverScreen">
        <h1>ゲームオーバー</h1>
        <p>スペースキーで再スタート</p>
      </div>
    `;

    return;
  }

  startRound();
}

function checkAnswer() {

  if (gameOver) return;

  const userAnswer = answerInput.value.trim();

  if (userAnswer === currentWord) {
    correct();
  } else {
    miss();
  }

  answerInput.value = "";
}

submitBtn.addEventListener("click", checkAnswer);

answerInput.addEventListener("keydown", (e) => {

  if (e.key === "Enter") {
    checkAnswer();
  }

});

window.addEventListener("keydown", (e) => {

  if (gameOver && e.code === "Space") {
    createStartScreen();
  }

});

createStartScreen();
