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

