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
  "でぃーぷらーにんぐ",
  "こんぴゅーたー",
  "てくのろじー"
];
let train = document.getElementById("train");
const answerInput = document.getElementById("answer");
const submitBtn = document.getElementById("submitBtn");
const gameArea = document.getElementById("gameArea");

let currentWord = "";
let position = -300;
let speed = 5;
let moveInterval;
let answerTimeout;

let life = 3;
let combo = 0;
let score = 0;
let gameOver = false;

let selectedWords = easyWords;

createStartScreen();

function createStartScreen() {

  gameArea.innerHTML = `
    <div id="startScreen">
      <h2>難易度を選択</h2>
      <button onclick="startGame('easy')">Easy</button>
      <button onclick="startGame('normal')">Normal</button>
      <button onclick="startGame('hard')">Hard</button>
    </div>
  `;
}

function startGame(level) {

  if (level === "easy") {
    selectedWords = easyWords;
    speed = 4;
  }

  if (level === "normal") {
    selectedWords = normalWords;
    speed = 6;

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

answerInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkAnswer();
  }
});

window.addEventListener("keydown", (event) => {

  if (gameOver && event.code === "Space") {
    createStartScreen();
  }

});
}

function miss() {

  combo = 0;
  life--;

  updateUI();

  if (life <= 0) {
    alert("💀 ゲームオーバー");
    clearInterval(moveInterval);
    return;
  }

  startRound();
}

function checkAnswer() {

  const userAnswer = answerInput.value.trim();

  if (userAnswer === currentWord) {
    correct();
  } else {
    miss();
  }

  answerInput.value = "";
}

submitBtn.addEventListener("click", checkAnswer);

answerInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkAnswer();
  }
});

updateUI();
startRound();
