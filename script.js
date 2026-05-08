const words = [
  "りんご",
  "みかん",
  "さくら",
  "しんかんせん",
  "ゲーム",
  "パソコン",
  "すいか",
  "とうきょう",
  "きょうと",
  "ねこ",
  "吹奏楽",
  "臨海高速鉄道",
  "北陸新幹線",
  "山手線",
  "超特急",
  "トンチキランド",
  "物理学概論",
  "論理回路論",
];

const train = document.getElementById("train");
const answerInput = document.getElementById("answer");
const submitBtn = document.getElementById("submitBtn");

let currentWord = "";
let position = -300;
let speed = 6;
let moveInterval;

let life = 3;
let combo = 0;
let score = 0;

function updateUI() {
  document.getElementById("life").textContent = life;
  document.getElementById("combo").textContent = combo;
  document.getElementById("score").textContent = score;
}

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function startRound() {

  clearInterval(moveInterval);

  currentWord = getRandomWord();
  train.textContent = currentWord;

  position = -300;
  train.style.left = position + "px";

  moveInterval = setInterval(() => {

    position += speed;
    train.style.left = position + "px";

    if (position > window.innerWidth) {
      clearInterval(moveInterval);
      miss();
    }

  }, 20);
}


function correct() {

  clearInterval(moveInterval);

  score++;
  combo++;

  if (combo >= 10) {
    life++;
    combo = 0;
    alert("10コンボ達成！ ライフ回復！");
  }

  if (score >= 20) {
    alert("🎉 ゲームクリア！");
    return;
  }

  updateUI();
  startRound();
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
