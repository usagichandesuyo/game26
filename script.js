const easyWords = [
  "りんご",
  "みかん",
  "ねこ",
  "いぬ",
  "さくら",
  "あいす",
  "ねむい",
  "めぐろ",
  "めじろ",
  "ひよし",
  "やいず",
  "いるか",
  "かかが",
  "たばた",
  "しぶや",
  "えびす",
  "よよぎ",
  "すがも",
  "かんだ",
  "はる",
  "なつ",
  "あき",
  "ふゆ",
  "すいか"
];

const normalWords = [
  "しんかんせん",
  "パソコン",
  "ゲーム",
  "とうきょう",
  "きょうと",
  "しながわ",
  "にしこやま",
  "しんおおさか",
  "まいはま",
  "てんもんがく",
  "かしわぎ",
  "しんしずおか",
  "はままつ",
  "おおさき",
  "ごたんだ",
  "いけぶくろ",
  "にしにっぽり",
  "かわさき",
  "つるみ",
  "おおひと",
  "あかさか"
];

const hardWords = [
  "プログラミング",
  "論理回路論",
  "雑司ヶ谷",
  "新横浜",
  "新綱島",
  "元住吉",
  "武蔵小杉",
  "代官山",
  "海浜幕張",
  "秋葉原",
  "新潟",
  "ソフトウェア",
  "葉緑体",
  "田町",
  "中目黒"
];

const answerInput = document.getElementById("answer");
const gameArea = document.getElementById("gameArea");

let train;

let currentWord = "";

let moveInterval;
let answerTimeout;
let countdownInterval;

let remainingTime = 3;
let answerTimeLimit = 3;

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
  document.getElementById("timer").textContent = remainingTime;

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
    answerTimeLimit = 7;

  }

  if (level === "normal") {

    selectedWords = normalWords;
    speed = 7;
    answerTimeLimit = 6;

  }

  if (level === "hard") {

    selectedWords = hardWords;
    speed = 10;
    answerTimeLimit = 5;

  }

  score = 0;
  combo = 0;
  life = 3;

  remainingTime = answerTimeLimit;

  updateUI();

  gameArea.innerHTML = `
    <div id="train"></div>
  `;

  train = document.getElementById("train");

  answerInput.value = "";

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
  clearInterval(countdownInterval);

  currentWord = getRandomWord();

  train.textContent = currentWord;

  let position = -200;

  remainingTime = answerTimeLimit;

  updateUI();

  let timerStarted = false;

  moveInterval = setInterval(() => {

    position += speed;

    train.style.left = position + "px";

    if (
      position > gameArea.clientWidth &&
      !timerStarted
    ) {

      timerStarted = true;

      countdownInterval = setInterval(() => {

        remainingTime--;

        updateUI();

      }, 1000);

      answerTimeout = setTimeout(() => {

        clearInterval(countdownInterval);

        miss();

      }, answerTimeLimit * 1000);

    }

  }, 20);
}

function correct() {

  clearInterval(moveInterval);
  clearTimeout(answerTimeout);
  clearInterval(countdownInterval);

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

  answerInput.value = "";

  startRound();
}

function miss() {

  if (gameOver) return;

  clearInterval(countdownInterval);

  combo = 0;

  life--;

  updateUI();

  if (life <= 0) {

    gameOver = true;

    gameArea.innerHTML = `
      <div id="gameOverScreen">

        <h1>ゲームオーバー</h1>

        <p>
          スペースキーで再スタート
        </p>

      </div>
    `;

    return;
  }

  answerInput.value = "";

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

}

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
